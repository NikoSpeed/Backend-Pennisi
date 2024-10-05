const socket = io()

socket.on("productos", (data) => {
    renderProductos(data)
})

socket.on('newProduct', (product) => {
    console.log('Nuevo producto agregado:', product)
    const productList = document.getElementById('productList')
    const productItem = createProductItem(product)
    console.log(productList)
    console.log(productItem)
    productList.appendChild(productItem)
})


socket.on('deleteProduct', (pid) => {
    console.log('Producto eliminado:', pid)
    const productList = document.getElementById('productList')
    const productItem = document.getElementById(`product-${pid}`)
    if (productItem) {
        productList.removeChild(productItem)
    }
});


const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos")
    productos.forEach(item => {
        const card = document.createElement("div");

        card.innerHTML =
            `
            <p>-----------------------------------------</p>
            <p> ID de Producto: ${item.id} </p>
            <p> Descripción: ${item.title} </p>
            <p> Precio: ${item.price}$ </p>
            <button> Eliminar </button>
        `
        contenedorProductos.appendChild(card)
    })
}

