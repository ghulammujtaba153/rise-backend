import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appUserId: {
      type: String,
      required: true,
    },
    productIdentifier: {
      type: String,
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    status: { type: String, enum: ["active", "expired", "canceled"] },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
