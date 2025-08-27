import Subscription from "../models/subscriptionSchema.js";
import User from './../models/userSchema.js';


export const createSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.create(req.body);
        const user= await User.findById(req.body.userId);
        user.isSubscribed=true;
        await user.save();
        res.status(201).json(subscription);
    } catch (error) {
        res.status(500).json(error);
    }
}


export const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json(error);
    }
}


export const cancelSubscription = async (req, res) => {
    try {
        
        const {appUserId} = req.body;
        const subscription = await Subscription.find({appUserId: appUserId}, {status: "canceled"}, {new: true});
        if(!subscription){
            return res.status(404).json({message: "Subscription not found"})
        }
        const user= await User.findById(subscription.userId);
        user.isSubscribed=false;
        await user.save();
        res.status(200).json({message: "Subscription cancelled successfully"});
    } catch (error) {
        
    }
}