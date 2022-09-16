const express = require('express')
const { postProduct, getProductById, getProducts, deleteProduct, putProduct } = require('../controllers/productos.controller')

//const { autorizacion, autenticacion } = require('../middleware/autentication.js')

const productosRouter = express.Router()
productosRouter.use(express.json())
productosRouter.use(express.urlencoded({extended: true}))

//Devuelve todos los productos
productosRouter.get('/', getProducts)
// Buscar y mostrar un producto
productosRouter.get('/:id', getProductById )
// Añadir un producto
productosRouter.post('/', postProduct )
// Actualizar un producto
productosRouter.put('/:id', putProduct)
// Eliminar un producto
productosRouter.delete('/:id', deleteProduct)

module.exports = { productosRouter }

