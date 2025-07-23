import Notification from "../models/NotificationSchema.js"


export const createNotification = async (req, res) => {
    console.log(req.body)
    try {
        const notification = await Notification.create(req.body)
        res.status(200).json(notification)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


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