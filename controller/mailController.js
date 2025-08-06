import SibApiV3Sdk from "sib-api-v3-sdk";
import User from './../models/userSchema.js';
import Subscribed from "../models/subscribedSchema.js";

export const sendEmail = async (req, res) => {
  const { subject, content, receiver } = req.body;

  try {
    // Initialize Brevo API client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

    // Create API instance
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Initialize recipients list
    let recipients = [];

    if (receiver === "user") {
      const users = await User.find({ role: "user" });
      recipients = users.map(user => ({ email: user.email }));
    }

    if (receiver === "subscriber") {
      const subscribers = await Subscribed.find({ isDeleted: false });
      recipients = subscribers.map(sub => ({ email: sub.email }));
    }

    if (recipients.length === 0) {
      return res.status(404).json({ message: "No recipients found" });
    }

    // Debug log for recipient emails
    console.log("Recipients:", recipients);

    // Construct the email
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.to = recipients;
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = content;
    sendSmtpEmail.sender = {
      name: "RISE",
      email: "riseselfesteem@gmail.com"
    };

    // Send the email
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.status(200).json({ message: "✅ Email sent successfully" });

  } catch (error) {
    console.error("❌ Email send error:", error.response?.body || error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};
