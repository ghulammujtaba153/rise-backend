import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600, // 10 minutes
    },
  });
  


const OTP = mongoose.model("OTP", otpSchema);

export default OTP;