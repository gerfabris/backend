const express = require('express')
const { connectMongoDB } = require('../../connections/conexionDB')
const authMiddleware = require('../../middleware/auth.middleware')
const signupRouter = express.Router()


signupRouter.get('/', async (req, res) =>{
    try{
        connectMongoDB()
        res.status(200).sendFile('../signup.html', { root: __dirname} )
        
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = { signupRouter }