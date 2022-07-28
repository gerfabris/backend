const Contenedor = require("./contenedor");
const express = require('express')

//Creación de clase y generar archivo txt
const contenedor = new Contenedor('./productos.txt')
//contenedor.save({nombre: "Termo Belleza Térmica", stock: 15, categoria: "Termo"})
//contenedor.getById(); 
//contenedor.deleteById(3)
//contenedor.getAll()
//contenedor.deleteAll()

const app = express()
const PORT = 8080

app.get('/', (req,res)=>{
    res.send('<h1>Bienvenidos al server Express</h1>')
})
app.get('/productos', async (req,res)=>{
    const productos = await contenedor.getAll()
    res.send(productos)
})
app.get('/productosRandom', async (req,res)=>{
    const productos = await contenedor.getAll()
    let productoRandom = productos[Math.ceil((Math.random() * (productos.length)))];
    res.send(productoRandom)
})

const server = app.listen(PORT, ()=>{
    console.log(server.address().port);
    console.log(server.address());
})
server.on('error', (error)=>{
    console.log(error);
})