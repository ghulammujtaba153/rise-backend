import Support from "../models/supportSchema.js"

export const createSuppport = async (req, res) => {
    try {
        const support = await Support.create(req.body)
        res.status(200).json(support)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getSupport = async (req, res) => {
    try {
        const support = await Support.find()
        res.status(200).json(support)
    } catch (error) {
        res.status(400).json(error)
    }
}


export const updateSupport = async (req, res) => {
    try {
        const {id} = req.params
        const support = await Support.findByIdAndUpdate(id, req.body)
        res.status(200).json(support)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteSupport = async (req, res) => {
    try {
        const {id} = req.params
        const support = await Support.findByIdAndDelete(id)
        res.status(200).json(support)
    } catch (error) {
        res.status(400).json(error)
    }
}