import Subscribed from "../models/subscribedSchema.js"


export const craeteSubscribed = async (req, res) => {
    try {
        const subscribed = await Subscribed.create(req.body)
        res.status(200).json(subscribed)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getSubscribedUsers = async (req, res) => {
    try {
        const subscribed = await Subscribed.find()
        res.status(200).json(subscribed)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}