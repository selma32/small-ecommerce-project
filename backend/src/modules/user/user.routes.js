import express from "express"
import { getUsers, signUp, login, verifyAccount } from "./user.controller.js"
import { checkEmail } from "../../middleware/checkEmail.js"

export const userRoutes = express.Router()

userRoutes.use(express.json())

userRoutes.get("/users", getUsers)
userRoutes.post("/users/signup", checkEmail, signUp)
userRoutes.post("/users/login", login)
userRoutes.get("/users/verify/:email",verifyAccount)
