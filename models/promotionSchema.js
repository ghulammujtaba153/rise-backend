// promotionSchema.js
import mongoose from "mongoose"

const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

const Promotion = mongoose.model("Promotion", promotionSchema)

export default Promotion
