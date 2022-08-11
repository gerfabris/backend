const express = require("express");
const app = express()
const PORT = process.env.PORT || 8080

const Contenedor = require('./contenedor.js')
const contenedor = new Contenedor('./productos.txt')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, (err)=>{
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is running en el puerto: ${PORT}`);
})
server.on("error", (error) => console.log(`Error en el servidor ${error}`));

app.set("views", "./views/pug");
app.set("view engine", "pug");

//Get para index
app.get('/', async (req,res)=>{
    try {
        const productos = await contenedor.getAll()
		res.render('index' , productos);
	} catch (error) {
        if(error) throw new Error(`Algo salio mal al mostrar el index. Error: ${error}`)
	}
})
//Añadir un producto
app.post('/productos', async (req,res) =>{
    try{
        let verificacion = Boolean
        const objProducto = req.body;
        const producto = await contenedor.save(objProducto);
        producto.length !== 0 ? verificacion = true : verificacion = false;
        res.render('index' , {
            verificacion : verificacion,
            producto,
            msg: `producto guardado ${producto}`
        })
    } catch (error){
        if(error) throw new Error(`Algo salio mal al añadir el producto. Error: ${error}`)
    }
})
//Obtener productos
app.get('/productos', async (req,res)=>{
    try {
        let verificacion = Boolean
        const productos = await contenedor.getAll()
        productos.length !== 0 ? verificacion = true : verificacion = false;
		res.render('pages/productos' , {
            verificacion: verificacion,
            productos
        });
	} catch (error) {
        if(error) throw new Error(`Algo salio mal al mostrar todos los productos. Error: ${error}`)   
	}
})

