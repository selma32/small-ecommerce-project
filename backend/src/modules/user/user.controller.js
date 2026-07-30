import { userModel } from "../../../db/Models/user.model.js"
import { mailConfirmation } from "../../middleware/mailConfirmaton.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function signUp(req, res){
    mailConfirmation(req.body.email).catch(err => console.error("Email failed:", err))
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    userModel.insertMany(req.body)

    res.json({message:"User registered successfully"})
}

export async function verifyAccount(req, res){
    jwt.verify(req.params.email, "ourMail", async (err, decoded)=>{
        if (err) return res.json({message: "Invalid or expired verification link"})

        let confirmUser = await userModel.findOneAndUpdate({email:decoded.email}, {isVerified:true})
        if (!confirmUser) return res.json({message: "User not found"})

        res.json({message:"User verified"})
    })
}

export async function login(req,res){
    let foundUser = await userModel.findOne({email:req.body.email})
    if(foundUser){
        if (!foundUser.isVerified) return res.json({message:"please verify your account"})
        let matchedPass = bcrypt.compareSync(req.body.password, foundUser.password)
        let token = jwt.sign({_id:foundUser._id, role: foundUser.role}, "nti")
        if (matchedPass) return res.json({message:"login successful", token})
        res.json({message:"Email or password is incorrect"})
    }else{
        res.json({message:"User not found, please sign up"})
    }
}


export async function getUsers(req, res) {
    let users = await userModel.find()
    res.json({message:"users", users})
}
