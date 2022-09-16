const dotenv = require('dotenv').config()
const conexion = require('../config')

let productosDao
let carritosDao

const DAO = process.env.DAO

switch (DAO) {
    case 'json':
        const  ProductosDaoArchivo  = require('./productos/ProductosDaoArchivo.js')
        const CartsDaoArchivo = require('./carritos/CartsDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CartsDaoArchivo()

        break;

    case 'mongoDB':
        
        conexion()
        
        const ProductosDaoMongoDB  = require('./productos/ProductosDaoMongoDB.js')
        const CartsDaoMongoDB = require('./carritos/CartsDaoMongoDB.js')

        productosDao = new ProductosDaoMongoDB()
        carritosDao = new CartsDaoMongoDB()

        break;

    case 'firebase':
        conexion()
        
        const ProductosDaoFirebase  = require('./productos/ProductosDaoFirebase')
        const CartsDaoFirebase = require('./carritos/CartsDaoFirebase')

        productosDao = new ProductosDaoFirebase()
        carritosDao = new CartsDaoFirebase()

        break;

    default:
        break;
}


module.exports = { productosDao, carritosDao }
