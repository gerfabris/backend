const express = require('express');
const { getCarts, getProductsByIdCart, createCart, postProductInToCart, deleteCart, deleteProductInToCart, getCartByID } = require('../controllers/carts.controller');

const cartRouter = express.Router()
cartRouter.use(express.json())
cartRouter.use(express.urlencoded({extended: true}))

// Obtener los carritos
cartRouter.get('/', getCarts );
//Obtener carrito por id
cartRouter.get('/:id', getCartByID );
// Obtiene los productos de un carrito
cartRouter.get('/:id/productos', getProductsByIdCart);
//Crear carritos con o sin producto
cartRouter.post('/', createCart);
// Enviar productos a un carrito
cartRouter.post('/:id/productos', postProductInToCart);
//Eliminar carrito
cartRouter.delete('/:id', deleteCart);
//Eliminar productos del carrito
cartRouter.delete('/:id/productos/:id_prod', deleteProductInToCart);

module.exports = { cartRouter }