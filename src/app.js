const express = require("express")
const productRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/carts.router.js")
const viewsRouter = require("./routes/views.router.js")
const exphbs = require("express-handlebars")
const socket = require("socket.io")
const app = express()
const PUERTO = 8080
import mongoose from "mongoose"

mongoose.connect("mongodb+srv://CoderNiko:battle@cluster0.czuqe.mongodb.net/Test?retryWrites=true&w=majority&appName=Cluster0")
    

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("./src/public"))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/", viewsRouter)

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`)
})


const io = socket(httpServer)

const ProductManager = require("./managers/product-manager.js")
const manager = new ProductManager("./src/data/productos.json")

io.on("connection", async(socket) => {
    console.log("Cliente conectado")
    socket.emit("productos", await manager.getProducts())
})

io.emit('products', manager.getProducts())

io.on('new-product', (data)=>{
    addProduct(data)
    io.sockets.emit('products', products)
})