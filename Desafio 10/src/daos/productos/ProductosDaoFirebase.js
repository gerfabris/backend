const ProductosFirebase = require('../../containers/productos/ContainerProductosFirebase.js')

class ProductosDaoFirebase extends ProductosFirebase {
    constructor(){
        super('productos')
    }
}

module.exports = ProductosDaoFirebase