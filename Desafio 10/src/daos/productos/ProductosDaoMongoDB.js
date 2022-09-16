const  ProductosMongoDB = require('../../containers/productos/ContainerProductosMongoDB.js')

class ProductosDaoMongoDB extends ProductosMongoDB {
    constructor(){
        super('productos', {
            timestamp: { type: Date, default: Date.now },
            title: {
                type: String, 
                required: true,
                trim: true
            },
            price: { 
                type: Number, 
                required: true,
                trim: true
            },
            thumbnail: {
                type: String, 
                required: true,
                trim: true
            },
            code: {
                type: Number, 
                required: true,
                trim: true
            },
            stock: {
                type: Number, 
                required: true,
                trim: true
            },
            description: {
                type: String,
                required: [true, 'Description is required'],
                trim: true
            }
        })
    }
}

module.exports = ProductosDaoMongoDB