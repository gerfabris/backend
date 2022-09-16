const CartsMongoDB = require('../../containers/carts/ContainerCartsMongoDB')
const mongoose = require('mongoose')

class CartsDaoMongoDB extends CartsMongoDB {
    constructor(){
        super('carritos', {
            timestamp: { type: Date, default: Date.now },
            productos: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: 'productos',
                }
            ]
        })
    }
}

module.exports = CartsDaoMongoDB