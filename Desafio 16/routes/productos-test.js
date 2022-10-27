const express = require("express");
const checkAuth = require("../middlewares/auth.middleware.js");
const logger = require("../utils/logger.js");
const { Router } = express;
const passport = require('./passport.js');

const router = Router();

router.get('/productos-test', checkAuth ,(req,res) =>{
    try {
        logger.info('GET /productos-test')
        res.render('productos-test')
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
})

module.exports = router