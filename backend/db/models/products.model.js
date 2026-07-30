import {model, Schema} from "mongoose"

const productsSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    category:String,
    price:{
        type:Number,
        required:true,
        min:0,
    },
    stock:{
        type:Number,
        required:true,
        min:0,
    },
    img:String,
    description:String,
},{
    timestamps:true,
    versionKey:false
})

export const productModel = model("Products", productsSchema)