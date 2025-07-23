import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["general", "personal"], default: "general" },
    userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // For personal notifications
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who read it
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
