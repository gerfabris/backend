const CartsArchivo = require('../../containers/carts/ContainerCartsArchivo')

const path = require('path')
const cartsPath = path.join(__dirname, '../../../', 'DB/carts.json')

class CartsDaoArchivo extends CartsArchivo {
    constructor(){
        super(cartsPath)
    }
}

module.exports = CartsDaoArchivo