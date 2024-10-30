import mongoose from "mongoose";

const productosSchema = new mongoose.Schema({
    nombre: String,
    precio: String,
    stock: Number
})

const ProductosModel = mongoose.model("productos", productosSchema)

export default ProductosModel