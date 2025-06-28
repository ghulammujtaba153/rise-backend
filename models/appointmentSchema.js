import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Unread", "Read", "Completed", "Ignored"],
        default: "Unread",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;