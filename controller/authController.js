import User from "../models/userSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const createUser = async (req, res) => {
    const {name, email, password, role} = req.body

    try{
        const data={
            name,
            email,
        }
        
        const encryptPassword = await bcrypt.hash(password, 10)

        data.password = encryptPassword
        
        if(role){
            data.role = role
        }

         const user = await User.create(data)

        
        res.status(201).json({user})
    }catch(error){
        console.log(error)
    }
}


export const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(401).json({message: "Invalid password"})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
        res.status(200).json({token, user})
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}


export const getUser = async (req, res) => {
    const {id} = req.params
    try{
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({user})
    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}


export const updateUser = async (req, res) => {
    const {id} = req.params
    const {avatar,name,email, password, role} = req.body

    try {
        const data={
            name,
            email,
        }

        if(avatar){
            data.avatar = avatar
        }

        if(password){
            const encryptPassword = await bcrypt.hash(password, 10)
            data.password = encryptPassword
        }

        if(role){
            data.role = role
        }

        const user = await User.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json({user})

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}


export const getAllUsers = async (req, res) => {
    
    try {
        const users = await User.find()
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}