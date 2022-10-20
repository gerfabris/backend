const express = require("express");
const checkAuth = require("../middlewares/auth.middleware.js");
const { Router } = express;
const passport = require('./passport.js');

const router = Router();

router.get('/', checkAuth ,(req,res)=>{
    try {
        if(req.user){
            let username = req.user.userEmail;
            res.render('home',{username:username});
        }else{
            res.redirect('/login');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

router.post('/', checkAuth , async (req, res) =>{
    const logout = !req.body
    try{
        if(!logout){
            res.status(200).redirect('/logout' )
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;