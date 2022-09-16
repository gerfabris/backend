/* const ProductosDaoArchivo = require('../daos/ProductosDaoArchivo.js')
const productosArchivo = new ProductosDaoArchivo() */
const {productosDao} = require('../daos/index')

let isAdmin = true

const getProducts = async (req, res) => {
    try{
        res.send(await productosDao.getAll())
    }catch(error){
        throw new Error('Error al mostrar todos los productos')
    }
}

const getProductById = async (req, res) => {
    try{
        const id = req.params.id
        const producto = await productosDao.getById(id)
        res.send(producto)
    }catch(error){
        throw new Error(`Error al mostrar el producto`)
    }
}

const postProduct = async (req, res) =>{
    try {
        if(isAdmin){
            let producto = {}
            producto.title = req.body.title
            producto.description = req.body.description
            producto.code = req.body.code
            producto.price = req.body.price
            producto.thumbnail = req.body.thumbnail
            producto.stock = req.body.stock
            //producto.timestamp = Date.now()
            const productoGuardado = await productosDao.save(producto)
            res.send( productoGuardado )
            console.log(`Nuevo producto: ${ productoGuardado }`);
        }else {
			res.json({
				error: "-1",
				description: `ruta ${req.originalUrl} metodo ${req.method} no implementado`,
			});
		}
    } catch (error) {
        throw new Error("Algo salio mal al añadir un nuevo producto");
    }
}

const putProduct = async (req,res) =>{
    try {
        if(isAdmin){
            let producto = {}
            producto.id = req.params.id //  parseInt(req.params.id) 
            producto.title = req.body.title
            producto.description = req.body.description
            producto.code = req.body.code
            producto.price = req.body.price
            producto.thumbnail = req.body.thumbnail
            producto.stock = req.body.stock
            //producto.timestamp = Date.now()
            const productoActualizado = await productosDao.updateById(producto)
            res.send( productoActualizado )
            console.log(`Producto actualizado : ${ productoActualizado }`);
        }else {
			res.json({
				error: "-1",
				description: `ruta ${req.originalUrl} metodo ${req.method} no implementado`,
			});
		}
    } catch (error) {
        throw new Error("Algo salio mal al añadir actualizar el producto");
    }
}

const deleteProduct = async (req,res) =>{
    try {
        if(isAdmin){
            const id = parseInt(req.params.id)
            const productoEliminado = await productosDao.deleteById(id)
            console.log(`Producto eliminado ID: ${ id }`);
            res.send({ 
                msg: `Se eliminó el producto con ID: ${id}`,
            })
        }else {
			res.json({
				error: "-1",
				description: `ruta ${req.originalUrl} metodo ${req.method} no implementado`,
			});
		}
    } catch (error) {
        throw new Error("Algo salió mal al eliminar el producto");
    }
}

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
}