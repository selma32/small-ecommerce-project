import {model, Schema} from "mongoose"

const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:Number,
    password:String,
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user'
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
    versionKey:false
})

export const userModel = model("User", userSchema) 