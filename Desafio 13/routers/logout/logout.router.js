const express = require('express')
const authMiddleware = require('../../middleware/auth.middleware')
const logoutRouter = express.Router()

logoutRouter.get('/', async (req, res) =>{
    try{
        //req.session.destroy();
        const logout = () => {
            req.session.destroy()
        }
        setTimeout(
            logout, 5000
        )
        res.sendFile('../../logout.html', { root: __dirname} )
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = { logoutRouter }