const  ProductosArchivo = require('../../containers/productos/ContainerProductosArchivo.js')

const path = require('path')
const productosPath = path.join(__dirname, '../../../', 'DB/productos.json')

class ProductosDaoArchivo extends ProductosArchivo {
    constructor(){
        super(productosPath) //productosPath
    }
}

module.exports = ProductosDaoArchivo