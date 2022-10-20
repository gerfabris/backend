const express = require("express");
const puerto = require("../config/puerto.js");
const { Router } = express;
const passport = require('./passport.js');

const router = Router();

/* -------------- LOGIN ------------- */

router.get('/login',(req,res)=>{
    console.log('get /login', `process: ${process.pid}, puerto: ${puerto}`);
    if(req.isAuthenticated()){
        console.log('user logeado');
        res.redirect('/');
    }else{
        console.log('usuario NO logeado');
        res.render('login');
    }
});

router.post('/login',passport.authenticate('login', {failureRedirect:'/faillogin'}) ,(req,res)=>{
    console.log('post /login');
    res.redirect('/');
});

/*  ---- falla login ---- */

router.get('/faillogin',(req,res)=>{
    console.log('get /faillogin');
    res.render('login-error',{});
});

router.post('/faillogin',passport.authenticate('login', {failureRedirect:'/faillogin'}) ,(req,res)=>{
    console.log('post /login');
    res.redirect('/');
});

module.exports = router;
