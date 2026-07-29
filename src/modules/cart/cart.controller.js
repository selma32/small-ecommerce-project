import { assert } from "node:console"
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

        let existingItem = cart.products.find(item => item.product.toString() === productId)
        if (existingItem) existingItem.amount += Number(amount)
            cart.products.push({product:productId, amount})
        
        await cart.save()
        res.json({message: "Added to cart", cart})
    }catch(err){
        res.json({message: "Failed to add to cart", error: err.message})
    }
}

async function updateCartItem(req, res) {
    try{
        let {productId} = req.params
        let {amount} = req.body

        if (!amount || amount < 1) return res.json({message:"amount must be at least 1"})

        let cart = await cartModel.findOne({owner:req.decoded._id})
        if(!cart) return res.json({message: "Cart not found"})

        let item = cart.products.find(item => item.product.toString() === productId)
        if(!item) return res.json({message: "Item is not found in cart"})

        item.amount = amount
        await cart.save()
        
        res.json({message: "Cart updated", cart})
    }catch(err){
        res.json({message: "Failed to update cart", error: err.message})
    }
}

async function removeFromCart(req, res) {
    try{
        let {productId} = req.params

        let cart = await cartModel.findOne({owner:req.decoded._id})
        if(!cart) return res.json({message: "Cart not found"})

        cart.products = cart.products.filter(item => item.product.toString() !== productId)
        await cart.save()
        res.json({message: "Item removed", cart})
    }catch(err){
        res.json({message: "Failed to remove item", error: err.message})
    }
}

async function checkout(req, res) {
    try{
        let userCart = await cartModel.findOne({owner:req.decoded._id}).populate("products.product")
        if(!userCart || cart.products.length === 0) return res.json({message: "Cart is empty"})

        for (const item of cart.products) {
            let product = await productModel.findById(item.product)

            if(!product) return req.json({message:"A product in your cart no longer exists"})
            if(product.stock < item.amount) return res.json({message: `Not enough stock for ${product.name}`})
        }

        for (const item of cart.products) {
            await productModel.findByIdAndUpdate(item.product,{$inc:{stock:-item.amount}})
        }
            
        cart.products = []
        await cart.save()

        res.json({message: "Checkout successful"})
    }catch(err){
        res.json({message: "Checkout failed", error: err.message})
    }
}

export{
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    checkout
}