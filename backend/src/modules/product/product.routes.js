import express from "express"
import { addProduct, getProducts, editProduct, deleteProduct } from "./product.controller.js"
import { verifyToken }  from "../../middleware/verifyToken.js"
import { isAdmin } from "../../middleware/isAdmin.js"

export const productRoutes = express.Router()

productRoutes.use(express.json())
productRoutes.post("/products", verifyToken, isAdmin, addProduct)
productRoutes.get("/products", getProducts)
productRoutes.put("/products/:id", verifyToken, isAdmin, editProduct)
productRoutes.delete("/products/:id", verifyToken, isAdmin, deleteProduct)
