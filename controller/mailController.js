import SibApiV3Sdk from "sib-api-v3-sdk";
import User from "./../models/userSchema.js";
import Subscribed from "../models/subscribedSchema.js";

// Helper to chunk an array into smaller parts
const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const sendEmail = async (req, res) => {
  const { subject, content, receiver } = req.body;

  try {
    // Init Brevo client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Fetch only required fields
    let recipients = [];
    if (receiver === "user") {
      const users = await User.find({ role: "user" }, { email: 1, _id: 0 });
      recipients = users.map(u => ({ email: u.email }));
    }
    if (receiver === "subscriber") {
      const subscribers = await Subscribed.find({ isDeleted: false }, { email: 1, _id: 0 });
      recipients = subscribers.map(s => ({ email: s.email }));
    }

    if (recipients.length === 0) {
      return res.status(404).json({ message: "No recipients found" });
    }

    console.log(`📨 Sending to ${recipients.length} recipients...`);

    // Batch into chunks of 100
    const batches = chunkArray(recipients, 100);

    for (let i = 0; i < batches.length; i++) {
      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      sendSmtpEmail.to = batches[i];
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = content;
      sendSmtpEmail.sender = {
        name: "RISE",
        email: "riseselfesteem@gmail.com"
      };

      await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log(`✅ Batch ${i + 1}/${batches.length} sent`);
    }

    res.status(200).json({ message: `✅ Emails sent in ${batches.length} batch(es)` });

  } catch (error) {
    console.error("❌ Email send error:", error.response?.body || error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};
