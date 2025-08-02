require("dotenv").config();
const SibApiV3Sdk = require("sib-api-v3-sdk");

// Initialize Brevo API client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

// Create API instance
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Create the SendSmtpEmail object directly with all properties
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

// Set the properties directly on the object
sendSmtpEmail.subject = "Hello from Brevo";
sendSmtpEmail.htmlContent = "<html><body><h1>Hello Ghulam!</h1><p>This is a test email sent via Brevo.</p></body></html>";
sendSmtpEmail.sender = {
  name: "RISE",
  email: "riseselfesteem@gmail.com"
};
sendSmtpEmail.to = [
  {
    email: "ghulammujtaba.dro@gmail.com",
    name: "Ghulam Mujtaba"
  }
];

// Send the email
apiInstance.sendTransacEmail(sendSmtpEmail).then(
  function (data) {
    console.log("✅ Email sent successfully:", data);
  },
  function (error) {
    console.error("❌ Error sending email:", error.response?.body || error);
  }
);