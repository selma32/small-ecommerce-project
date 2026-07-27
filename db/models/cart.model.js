import mongoose, { model, Schema } from "mongoose"

const cartItemsSchema = new Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Products",
        required:true
    },
    amount:{
        type:Number,
        required:true,
        min:1,
        default:1
    }
},{ _id: false })


const cartSchema = new Schema({
    owner:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    products:[cartItemsSchema]
},{
    timestamps: true,
    versionKey: false
})

export const cartModel = model("Cart", cartSchema)