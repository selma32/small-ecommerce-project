import { userModel } from "../../db/Models/user.model.js"

export async function checkEmail(req,res,next) {
    let exists = await userModel.findOne({email:req. body.email})
    if(exists) return res. json({message:"user already registered, please login"})      
        next()
}
