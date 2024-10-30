const express = require("express")
const router = express.Router()
const ProductManager = require("../managers/product-manager")
const manager = new ProductManager("./src/data/productos.json")
import ProductosModel from "../models/products.model"

router.get("/products", async (req,res) => {
    let page = req.query.page || 1
    let limit = 2
    try{
        const productos = await manager.getProducts()
        const productosListado = await ProductosModel.paginate({}, {limit, page})
        const productosFinal = productosListado.docs.map(productos => {
            const {_id, ...rest} = productos.toObject()
            return rest
        })
        res.render("home", {
            productos: productosFinal,
            hasPrevPage: productosFinal.hasPrevPage,
            hasNextPage: productosFinal.hasNextPage,
            prevPage: productosFinal.prevPage,
            nextPage: productosFinal.nextPage,
            currentPage: productosFinal.page,
            totalPages: productosFinal.totalPages
        })
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