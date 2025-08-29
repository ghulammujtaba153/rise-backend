import Subscription from "../models/subscriptionSchema.js";
import User from './../models/userSchema.js';


export const createSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.create(req.body);
        const user= await User.findById(req.body.userId);
        user.isSubscribed=true;
        await user.save();
        res.status(201).json(subscription);
    } catch (error) {
        res.status(500).json(error);
    }
}


export const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json(error);
    }
}


// export const cancelSubscription = async (req, res) => {
//     try {
//         const event = req.body;

//     console.log("Received webhook:", event);

//     // ✅ Check for cancellation
//     // if (event.type === "CANCELLATION" || event.type === "EXPIRATION") {
//       const userId = event.app_user_id;
//       const productId = event.product_id;

//       const subscription = await Subscription.find({appUserId: userId}, {status: "canceled"}, {new: true});

//     if(!subscription){
//          return res.status(404).json({message: "Subscription not found"})
//     }
//     const user= await User.findById(subscription.userId);
//     user.isSubscribed=false;
//     await user.save();


//     res.status(200).send({ received: true });
//   } catch (err) {
//     console.error("Webhook error:", err);
//     res.status(500).send({ error: "Webhook handler failed" });
//   }
// }


export const cancelSubscription = async (req, res) => {
  try {
    const event = req.body.event; // ✅ RevenueCat sends data inside "event"

    console.log("Received webhook:", event);

    // Only handle cancellation events
    if (event.type === "CANCELLATION" || event.type === "EXPIRATION") {
      const userId = event.app_user_id;
      const productId = event.product_id;

      // Find and update subscription
      const subscription = await Subscription.findOneAndUpdate(
        { appUserId: userId, productId },
        { status: "canceled", canceledAt: new Date(event.event_timestamp_ms) },
        { new: true }
      );

      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      // Update user subscription status
      const user = await User.findById(subscription.userId);
      if (user) {
        user.isSubscribed = false;
        await user.save();
      }

      return res.status(200).send({ message: "Subscription cancelled", subscription });
    }

    // Ignore non-cancellation events
    return res.status(200).send({ message: "Event ignored" });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).send({ error: "Webhook handler failed" });
  }
};
