import { cartModel } from "../../../db/models/cart.model.js"
import { productModel } from "../../../db/models/products.model.js"

async function getCart(req,res){
    try{
        let userCart = await cartModel.findOne({owner:req.decoded._id}).populate("products.product")
        if(!userCart) return res.json({message: "Cart is empty", cart: {owner: req.decoded._id, products: []}})
        res.json({message:"Cart", userCart})
    }catch(err){
        res.json({message: "Failed to get cart", error: err.message})
    }
}

async function addToCart(req, res) {
    try{
        let {productId, amount} = req.body

        let product = await productModel.findById(productId)
        if(!product) return res.json({message: "Product not found"})
        if (product.stock < amount) return res.json({message:"Not enough stock"})

        let cart = await cartModel.findOne({owner:req.decoded._id})
        if (!cart) {
            cart = await cartModel.create({owner:req.decoded._id, products:[{product: productId, amount}]})
            return res.json({message: "Added to cart", cart})
        }

        let existingItem = cartModel.products.find(item => item.product.toString() === productId)
        if (existingItem) existingItem.amount += Number(amount)
            cart.products.push({product:productId, amount})
        
        await cart.save()
        res.json({message: "Added to cart", cart})
    }catch(err){
        res.json({message: "Failed to add to cart", error: err.message})
    }
}




export{
    getCart,
    addToCart
}