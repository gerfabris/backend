const express = require('express')
const path = require('path')
const authMiddleware = require('../../middleware/auth.middleware')
const { connectMongoDB } = require('../../connections/conexionDB')

const loginRouter = express.Router()

const p = path.join(__dirname, '../../public')

loginRouter.use(express.static('public'))
loginRouter.use(express.json())
loginRouter.use(express.urlencoded({extended: true}))

loginRouter.get('/', async (req, res) =>{
    try{
        connectMongoDB()
        const userName = req.session.userName
        const userPassword = req.session.userPassword
        if (userName && userPassword){
            req.session.userName = userName;
            req.session.userPassword = userPassword;
            return res.status(400).redirect('/')
        }else{
            console.log('por aca', p);
            return res.status(200).sendFile( '../../login.html', { root: p } )
        }
        
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


loginRouter.post('/', async (req, res) =>{
    try{
        const userName = req.body.userName
        const userPassword = req.body.userPassword
        if (userName && userPassword){
            req.session.userName = userName;
            req.session.userPassword = userPassword;
            return res.status(200).redirect('/')
        }else{
            return res.status(400).redirect('/login')
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = { loginRouter }