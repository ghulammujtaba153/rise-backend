import SibApiV3Sdk from "sib-api-v3-sdk";


export const sendEmail = async (req, res) => {
    const { email, subject, content } = req.body;

    try {
        // Initialize Brevo API client
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
        
        // Create API instance
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        
        // Create the SendSmtpEmail object directly with all properties
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        
        // Set the properties directly on the object
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.htmlContent = content;
        sendSmtpEmail.sender = {
          name: "RISE",
          email: "riseselfesteem@gmail.com"
        };
        sendSmtpEmail.to = [
          {
            email: email,
            // name: "Ghulam Mujtaba"
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
        
        res.status(200).json({ message: "Email sent successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
    
}