import Notification from "../models/NotificationSchema.js"
import admin from "../firebase.js";
import User from "../models/userSchema.js";

export const createNotification = async (req, res) => {
  try {
    const { title, message, type, userIds, role } = req.body;

    // Create notification in DB
    const notification = await Notification.create({
      title,
      message,
      type,
      userIds: type === "personal" ? userIds : [],
    });

    let tokens = [];

    if (type === "general") {
      // Send to all users of a specific role
      const users = await User.find({ role, FCMToken: { $exists: true, $ne: null } });
      tokens = users.map(user => user.FCMToken);
    } else if (type === "personal") {
      // Send to specific users
      const users = await User.find({ _id: { $in: userIds }, FCMToken: { $exists: true, $ne: null } });
      tokens = users.map(user => user.FCMToken);
    }

    if (tokens.length > 0) {
      const payload = {
        notification: {
          title,
          body: message,
        },
      };

      await admin.messaging().sendEachForMulticast({
        tokens,
        notification: payload.notification,
      });
    }

    res.status(200).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getNotifications = async (req, res) => {
    
    try {
        const notifications = await Notification.find()
        res.status(200).json(notifications)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getNotification = async (req, res) => {
    try {
        const userId = req.params.id;  // or from req.user._id if using auth middleware

        const notifications = await Notification.find({
            $or: [
                { type: "general" },
                { userIds: userId }
            ]
        }).sort({ createdAt: -1 }); // latest first

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const readNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { readBy: req.body.readBy }, { new: true })
        res.status(200).json(notification)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id)
        res.status(200).json(notification)
    } catch (error) {
        res.status(500).json(error)
    }
}