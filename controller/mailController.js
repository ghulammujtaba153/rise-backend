// import SibApiV3Sdk from "sib-api-v3-sdk";
// import User from "./../models/userSchema.js";
// import Subscribed from "../models/subscribedSchema.js";

// // Helper to chunk an array into smaller parts
// const chunkArray = (array, size) => {
//   return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
//     array.slice(i * size, i * size + size)
//   );
// };

// export const sendEmail = async (req, res) => {
//   const { subject, content, receiver } = req.body;

//   try {
//     // Init Brevo client
//     const defaultClient = SibApiV3Sdk.ApiClient.instance;
//     defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
//     const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//     // Fetch only required fields
//     let recipients = [];
//     if (receiver === "user") {
//       const users = await User.find({ role: "user" }, { email: 1, _id: 0 });
//       recipients = users.map(u => ({ email: u.email }));
//     }
//     if (receiver === "subscriber") {
//       const subscribers = await Subscribed.find({ isDeleted: false }, { email: 1, _id: 0 });
//       recipients = subscribers.map(s => ({ email: s.email }));
//     }

//     if (recipients.length === 0) {
//       return res.status(404).json({ message: "No recipients found" });
//     }

//     console.log(`📨 Sending to ${recipients.length} recipients...`);

//     // Batch into chunks of 100
//     const batches = chunkArray(recipients, 100);

//     for (let i = 0; i < batches.length; i++) {
//       const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//       sendSmtpEmail.to = batches[i];
//       sendSmtpEmail.subject = subject;
//       sendSmtpEmail.htmlContent = content;
//       sendSmtpEmail.sender = {
//         name: "RISE",
//         email: "riseselfesteem@gmail.com"
//       };

//       await apiInstance.sendTransacEmail(sendSmtpEmail);
//       console.log(`✅ Batch ${i + 1}/${batches.length} sent`);
//     }

//     res.status(200).json({ message: `✅ Emails sent in ${batches.length} batch(es)` });

//   } catch (error) {
//     console.error("❌ Email send error:", error.response?.body || error);
//     res.status(500).json({ message: "❌ Internal server error" });
//   }
// };



import SibApiV3Sdk from "sib-api-v3-sdk";
import User from "../models/userSchema.js";
import Subscribed from "../models/subscribedSchema.js";

/**
 * Utility to chunk an array into batches
 */
const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

/**
 * Utility to add a delay between batch sends
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Send emails (optimized with batching + parallel sending)
 */
export const sendEmail = async (req, res) => {
  const { subject, content, receiver } = req.body;

  try {
    // Initialize Brevo API client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // 1️⃣ Fetch recipients
    let recipients = [];
    if (receiver === "user") {
      const users = await User.find({ role: "user" }, { email: 1, _id: 0 });
      recipients = users.map((u) => ({ email: u.email }));
    } else if (receiver === "subscriber") {
      const subscribers = await Subscribed.find({ isDeleted: false }, { email: 1, _id: 0 });
      recipients = subscribers.map((s) => ({ email: s.email }));
    }

    if (!recipients.length) {
      return res.status(404).json({ message: "No recipients found" });
    }

    console.log(`📨 Preparing to send ${recipients.length} emails...`);

    // 2️⃣ Batch sending (e.g., 20 per batch)
    const batchSize = 20;
    const batches = chunkArray(recipients, batchSize);

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];

      console.log(`🚀 Sending batch ${batchIndex + 1}/${batches.length} (${batch.length} recipients)...`);

      // Send in parallel within each batch
      const sendPromises = batch.map(async (recipient) => {
        const emailData = new SibApiV3Sdk.SendSmtpEmail();
        emailData.to = [recipient];
        emailData.subject = subject;
        emailData.htmlContent = content;
        emailData.sender = { name: "RISE", email: "riseselfesteem@gmail.com" };
        emailData.replyTo = { name: "RISE", email: "riseselfesteem@gmail.com" };

        try {
          await apiInstance.sendTransacEmail(emailData);
          console.log(`✅ Sent to: ${recipient.email}`);
        } catch (err) {
          console.error(`❌ Failed for ${recipient.email}:`, err.response?.body || err.message);
        }
      });

      await Promise.all(sendPromises);

      // Optional short delay between batches to avoid rate limits
      if (batchIndex < batches.length - 1) {
        console.log(`⏳ Waiting 2 seconds before next batch...`);
        await delay(2000);
      }
    }

    res.status(200).json({
      message: `✅ Successfully processed ${recipients.length} emails in ${batches.length} batches.`,
    });
  } catch (error) {
    console.error("❌ Email send error:", error.response?.body || error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
