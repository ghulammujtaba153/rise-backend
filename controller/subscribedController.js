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
    console.log("getSubscribedUsers")
    try {
        const subscribed = await Subscribed.find({isDeleted: false})
        res.status(200).json(subscribed)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


export const deleteSubscribed = async (req, res) => {
    const {id} = req.params
    try {
        const subscribed = await Subscribed.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
        res.status(200).json(subscribed)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}