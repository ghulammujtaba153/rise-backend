import Resource from "../models/resourcesSchema.js"


export const createResource = async (req, res)=>{
    try {
        const resource = new Resource(req.body)
        resource.save()
        res.status(201).json(resource)
    } catch (error) {
        res.status(500).json("something went wrong")
    }
}


export const updateResource = async (req, res)=>{
    const {id} = req.params
    console.log(req.body)
    try {
        const resource = await Resource.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(resource)
    } catch (error) {
        res.status(500).json("something went wrong")
    }
}

export const getResources = async(req, res) =>{
    try {
        const resources = await Resource.find({isDeleted: false})
        res.status(200).json(resources)
    } catch (error) {
        res.status(500).json("something went wrong")
    }
}


export const getResource = async (req, res) =>{
    const {id} = req.params

    try {
        const resouce  = await Resource.findById(id, {isDeleted: false})
        res.status(200).json(resouce)
    } catch (error) {
        res.status(500).json("something went wrong")
    }
}


export const deleteResource= async (req, res)=>{
    const {id} = req.params
    try {
        const resource = await Resource.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
        res.status(200).json(resource)
    } catch (error) {
        res.status(500).json("something went wrong")
    }
}