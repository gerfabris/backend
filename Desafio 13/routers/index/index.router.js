const express = require('express')
const authMiddleware = require('../../middleware/auth.middleware')
const indexRouter = express.Router()

indexRouter.use(express.static('public'))
indexRouter.use(express.json())
indexRouter.use(express.urlencoded({extended: true}))

indexRouter.get('/' , authMiddleware , async (req, res) =>{
    try{
        res.sendFile('../index.html', { root: __dirname} )
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

indexRouter.post('/', authMiddleware , async (req, res) =>{
    const logout = !req.body
    try{
        if(!logout){
            const nameUser = req.session.userName
            console.log(nameUser);
            res.status(200).redirect('/logout' )
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = { indexRouter }