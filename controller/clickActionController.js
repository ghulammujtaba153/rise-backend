import ClickAction from "../models/clickActionSchema.js"

export const createClickAction = async (req, res) => {
  try {
    const { userId, action } = req.body
    const date = new Date().toISOString().split('T')[0] // today's date as "YYYY-MM-DD"

    const clickAction = await ClickAction.findOneAndUpdate(
      { userId, action, date },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    )

    res.status(200).json(clickAction)
  } catch (error) {
    console.error("Click tracking error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}


export const getUserClickActions = async (req, res) => {
  try {
    const { userId } = req.params
    const clickActions = await ClickAction.find({ userId })
    res.status(200).json(clickActions)
  } catch (error) {
    console.error("Click tracking error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}




export const getClickActionByLastTenDays = async (req, res) => {
  const { userId } = req.params

  const today = new Date()
  const tenDaysAgo = new Date(today)
  tenDaysAgo.setDate(today.getDate() - 9) 

  const fromDate = tenDaysAgo.toISOString().split("T")[0] 
  try {
    const clickActions = await ClickAction.find({
      userId,
      date: { $gte: fromDate },
    }).sort({ date: 1 }) // ascending by date

    res.status(200).json(clickActions)
  } catch (error) {
    console.error("Click tracking error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
