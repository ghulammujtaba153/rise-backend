import Promotion from "../models/promotionSchema.js"


export const createPromotion = async (req, res) => {
    console.log(req.body)
  try {
    const promotion = new Promotion(req.body)
    await promotion.save()

    res.status(201).json(promotion) 
  } catch (error) {
    console.error("Error creating promotion:", error)
    res.status(500).json({ error: error.message || "Internal server error" })
  }
}



export const getPromotion = async (req, res) => {
  const today = new Date().toISOString().split("T")[0] // "YYYY-MM-DD"

  try {
    const promotions = await Promotion.find({
      startDate: { $lte: today },
      endDate: { $gte: today },
      status: "active",
      isDeleted: false,
    }).sort({ startDate: 1 }) // Optional: earliest first

    res.status(200).json(promotions)
  } catch (error) {
    console.error("Error fetching promotions:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}


export const getAllPromotion = async (req, res) => {
    try {
        const promotion = await Promotion.find({isDeleted: false}).sort({ createdAt: -1 })
        res.status(200).json(promotion)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const updatePromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(promotion)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deletePromotion = async (req, res) => {
    const id = req.params.id
    try {
        const promotion = await Promotion.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
        res.status(200).json(promotion)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const updateStatusPromotion = async (req, res) => {
    const id = req.params.id
    try {
        const promotion = await Promotion.findByIdAndUpdate(id, { status: req.body.status }, { new: true })
        res.status(200).json(promotion)
    } catch (error) {
        res.status(500).json(error)
    }
}