const express = require('express')
const authMiddleware = require('../../middleware/auth.middleware')
const productosTestRouter = express.Router()


productosTestRouter.get('/', (req,res) =>{
    res.sendFile('productos-test.html', { root: __dirname} )
})

module.exports = { productosTestRouter }

