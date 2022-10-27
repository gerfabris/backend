const express = require("express");
const logger = require("../utils/logger.js");
const { Router } = express;
const passport = require('./passport.js');

const router = Router();

/* ------------- SIGNUP ------------- */
router.get('/signup',(req,res)=>{
    try {
        logger.log('GET /signup')
        res.render('signup');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});
router.post('/signup', passport.authenticate('signup', {failureRedirect:'/failsignup'}) , (req,res)=>{
    try {
        logger.log('POST /signup')
        res.redirect('/');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});
/* ------ falla el signup --------  */
router.get('/failsignup',(req,res)=>{   
    try {
        logger.info('GET /failsignup');
        res.render('signup-error', {} ); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});
router.post('/failsignup', passport.authenticate('signup', {failureRedirect:'/failsignup'}) , (req,res)=>{
    try {
        logger.info('POST /failsignup');
        res.redirect('/');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});

module.exports = router;