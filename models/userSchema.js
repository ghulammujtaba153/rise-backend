import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type:{
        type: String,
        default: "free"
    },
    role: {
        type: String,
        default: "user"
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
export default User;