const { productosDao }  = require('../daos/index')
const { carritosDao }  = require('../daos/index')

// Obtener los carritos
const getCarts = async (req, res) => {
	try {
		const carrito = await carritosDao.getAll()
		//res.send(carrito);
		return carrito
	}
	catch (error) {
		throw new Error("Hubo un error al mostrar los carritos");
	}
}
// Obtener carrito por ID
const getCartByID = async (req, res) => {
	try {
		const id = req.params.id
		const carrito = await carritosDao.getById(id)
		res.send(carrito);
		return carrito
	}
	catch (error) {
		throw new Error("Hubo un error al mostrar los carritos");
	}
}
// Obtiene los productos de un carrito
const getProductsByIdCart = async (req, res) => {
	try {
		const id = req.params.id
		console.log(`Carrito buscado: ${id}`);
		const carrito = await carritosDao.getById(id);
		console.log(carrito);
		const productosCarrito = carrito.productos
		if(carrito){
			res.send(carrito)
			return productosCarrito
		}else{
			console.log("No existe el carrito seleccionado");
		}
	}
	catch (error) {
		throw new Error("Hubo un error al listar los productos del carrito seleccionado");
	};
}
//Crear carritos con o sin producto
const createCart = async (req, res) => {
	try {
		const idProducto = req.body.idProducto

		const crearCarritoConProducto =  async (idProducto) =>{
			const producto = await productosDao.getById(idProducto)
			console.log(producto);
			const carrito = await carritosDao.crearCarrito(producto);

			return carrito
		}

		const crearCarritoSinProducto = async () =>{
			const carrito = await carritosDao.crearCarrito();
			const respuesta = carrito
			
			return respuesta
		}

		idProducto ? crearCarritoConProducto(idProducto) : crearCarritoSinProducto()

	}
	catch (error) {
		throw new Error(`Hubo un error al agregar el producto`);
	};
}
// Enviar productos a un carrito
const postProductInToCart = async (req, res) => {
	try {
		const idProducto = req.body.idProducto
		const producto = await productosDao.getById(idProducto)
		const idCarrito = req.params.id
		const carrito = await carritosDao.getById(idCarrito);
		const carritoActualizado = await carritosDao.updateCart(producto, idCarrito)
		res.send({
			msg: `Se cargó el producto ${producto.id} en el carrito ${carrito.id}`,
			carritoActualizado
		})
	}
	catch (error) {
		throw new Error(`Hubo un error al agregar el producto al carrito`);
	};
}
//Eliminar carrito
const deleteCart = async (req, res) => {
	try {
		const id = req.params.id;
		const obj = await carritosDao.deleteById(id);
		res.send(obj);
	}
	catch (error) {
		throw new Error(`Hubo un error al eliminar el carrito`);
	}
}
//Eliminar productos del carrito
const deleteProductInToCart = async (req, res) => {
	try {
		const idProducto = req.params.id_prod
		const idCarrito = req.params.id
		const producto = await productosDao.getById(idProducto)
		const carrito = await carritosDao.getById(idCarrito);
		
		const productoEliminado = await carritosDao.productos.deleteOne(idProducto)
		res.send({
			msg: `Se eliminó el producto ${producto.id} en el carrito ${carrito.id}`,
			productoEliminado
		}) 
	}
	catch (error) {
		throw new Error(`Hubo un error al borrar el producto`);
	}
}

module.exports = {
    getCarts,
	getCartByID,
    getProductsByIdCart,
    createCart,
    postProductInToCart,
    deleteCart,
    deleteProductInToCart
}