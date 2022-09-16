const CartsFirebase = require('../../containers/carts/ContainerCartsFirebase')

class CartsDaoFirebase extends CartsFirebase {
    constructor(){
        super('carritos')
    }
}

module.exports = CartsDaoFirebase