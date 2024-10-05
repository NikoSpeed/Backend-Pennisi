const express = require("express")
const router = express.Router()
const ProductManager = require("../managers/product-manager")
const manager = new ProductManager("./src/data/productos.json")

router.get("/products", async (req,res) => {
    try{
        const productos = await manager.getProducts()
        res.render("home", {productos})
    }catch(error) {
        res.status(500).send("Error interno del servidor")
    }

})

router.get("/realtimeproducts", async (req,res) => {
    try{
        res.render("realtimeproducts")
    }catch(error){
        res.status(500).send("Error interno del servidor")
    }
})



module.exports = router