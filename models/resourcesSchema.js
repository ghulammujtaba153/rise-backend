import mongoose  from "mongoose";

const resourceSchema = mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    link:{
        type:String,
        required:true
    },
    isPremium:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const Resource = mongoose.model("Resource",resourceSchema)

export default Resource;