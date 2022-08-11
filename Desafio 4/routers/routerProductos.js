const express = require("express")
const routerProductos = express.Router()

const Contenedor = require("./contenedor.js")
const contenedor = new Contenedor('./productos.txt')

routerProductos.use(express.urlencoded({ extended: true }));
routerProductos.use(express.json());
//routerProductos.use(express.static('public'))
//mostrar todos los productos
routerProductos.get('/', async (req,res)=>{
    try {
        const productos = await contenedor.getAll()
		res.send(productos);
	} catch (error) {
		throw new Error("Algo salio mal al mostrar todos los productos");
	}
})
//mostrar los productos por id
routerProductos.get('/:id', async (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const producto = await contenedor.getById(id);
		res.send(producto);
	} catch (error) {
		throw new Error("Algo salio mal al mostrar el producto");
	}
})
//Añadir un producto
routerProductos.post('/', async (req,res) =>{
    try{
        const objProducto = req.body
        const producto = await contenedor.save(objProducto)
        res.send({
            msg: 'producto guardado',
            producto
        })
    } catch (error){
        throw new Error("Algo salio mal al añadir el producto");
    }
})
//Actualizar producto
routerProductos.put('/:id', async (req, res)=>{
    try{
        const id  = parseInt(req.params.id)
        const objProducto = req.body
        const productoActualizado = await contenedor.updateById({id, ...objProducto})
        res.send({
            msg: "producto actualizado",
            productoActualizado
        })
    }catch (error){
        throw new Error("Algo salio mal al actualizar el producto");
    }
})
//Eliminar producto
routerProductos.delete('/:id', async (req,res)=>{
    try{
        const id  = parseInt(req.params.id);
        const productoEliminado = await contenedor.deleteById(id)
        res.send({
            msg: "Producto Eliminado",
            productoEliminado})
    }catch(error){
        throw new Error("Algo salio mal al eliminar el producto");
    }
})

module.exports = routerProductos;