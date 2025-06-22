import mongoose from 'mongoose'

const subscribedSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Subscribed = mongoose.model("Subscribed", subscribedSchema)

export default Subscribed