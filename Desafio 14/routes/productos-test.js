const express = require("express");
const checkAuth = require("../middlewares/auth.middleware.js");
const { Router } = express;
const passport = require('./passport.js');

const router = Router();

router.get('/productos-test', checkAuth ,(req,res) =>{
    res.render('productos-test')
})

module.exports = router