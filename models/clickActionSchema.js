import mongoose from "mongoose"

const clickSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  action: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0], // e.g., "2025-06-21"
  },
  count: {
    type: Number,
    default: 1,
  },
})

// Ensure unique combination per day
clickSchema.index({ userId: 1, action: 1, date: 1 }, { unique: true })

const ClickAction = mongoose.model("ClickAction", clickSchema)

export default ClickAction
