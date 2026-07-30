import express from "express"
import { dbConnection } from "./db/dbConnections.js"
import { userRoutes } from "./src/modules/user/user.routes.js"
import { cartRoutes } from "./src/modules/cart/cart.routes.js"
import { productRoutes } from "./src/modules/product/product.routes.js"
import cors from "cors"

const app = express()

dbConnection

app.use(cors()) 

app.use(userRoutes)
app.use(productRoutes)
app.use(cartRoutes)

app.listen(3000, ()=>{
    console.log("server loading");    
})