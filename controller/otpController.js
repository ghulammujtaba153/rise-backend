import OTP from "../models/otpSchema.js";
import SibApiV3Sdk from "sib-api-v3-sdk";
import User from "../models/userSchema.js";

const generateOTP = async (email) => {
    try {
        // Generate a 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        const newOTP = new OTP({ email, otp });
        await newOTP.save();
        return otp;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const sendMail = async (email, otp) => {
    try {

        
        

        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

        // Create API instance
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        // Create the SendSmtpEmail object directly with all properties
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        // Set the properties directly on the object
        sendSmtpEmail.subject = "RISE Self Esteem OTP";
        sendSmtpEmail.htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>RISE Self Esteem - OTP</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f7f9fc; color: #333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background-color: #0052cc; color: white; padding: 24px; text-align: center;">
              <h1 style="margin: 0;">RISE Self Esteem</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; text-align: center;">
              <h2 style="color: #0052cc;">Your One-Time Password (OTP)</h2>
              <p style="font-size: 16px; margin: 16px 0;">Use the OTP below to complete your verification:</p>
              <div style="display: inline-block; padding: 15px 30px; background-color: #f0f4ff; border-radius: 6px; font-size: 24px; font-weight: bold; color: #0052cc; letter-spacing: 3px;">
                ${otp}
              </div>
              <p style="margin-top: 24px; font-size: 14px; color: #777;">This OTP is valid for the next 10 minutes. Do not share it with anyone.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f1f1f1; text-align: center; padding: 16px; font-size: 13px; color: #888;">
              &copy; 2025 RISE Self Esteem. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
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

    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const sendOTP = async (req, res) => {
    try {
        const { email, existingUser } = req.body;

        if (existingUser) {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
          }   
        }
        const otp = await generateOTP(email);
        await sendMail(email, otp);
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending OTP" });
    }
}


export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log(email, otp);
        const otpDoc = await OTP.findOne({ email, otp });
        console.log(otpDoc);

        if (!otpDoc) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
        res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error verifying OTP" });
    }
}