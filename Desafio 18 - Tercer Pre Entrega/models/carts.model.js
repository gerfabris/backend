const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const cartsSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    email:{
        type: String,
        required: true,
    },
    productos: {
        type: Array,
        required: true,
    }
})

/* -- otra config para productos -- */
/* [
    {
        type: mongoose.Types.ObjectId,
        ref: 'productos',
    }
] 

{
        type: Array,
        required: true,
    }

*/


module.exports = cartsSchema