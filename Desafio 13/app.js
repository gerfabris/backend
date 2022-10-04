const ContenedorProductos = require('./clases/contenedorProductos.js')
const contenedorProductos = new ContenedorProductos('./productos.json')
const ContenedorMensajes = require('./clases/contenedorMensajeArchivo.js')
const contenedorMensajes = new ContenedorMensajes('./mensajes.json')
//require general
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const { connectMongoDB } = require('./connections/conexionDB.js')
//config socket
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
//const httpServer = new HttpServer(app)
//const io = new IOServer(httpServer)
const PORT = process.env.PORT || 8080
// config normalizr
const normalizr  = require('normalizr')
const { normalize, schema, denormalize } = normalizr
const util = require('util')
//require para session y cookie
const cookieParser = require('cookie-parser')
const session = require('express-session')
const logger = require('morgan')
//Config Mongo para session
const MongoStore = require('connect-mongo')
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST} = process.env
const mongoConfig = {
    useNewUrlparser: true,
    useUnifiedTopology: true
}
//Conection Mongo Atlas
const mongoose = require('mongoose')
connectMongoDB()
//confir passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt')
//config general
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//config session
app.use(logger('dev'))
app.use(session({
    secret: 'secret',
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7

    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
}))
//config cookie
//app.use(cookieParser(process.env.COOKIES_SECRET || '123456'))
//funciones passport
const isValidPassword = (user,password) =>{
    return bCrypt.compareSync(password, user.password)
}
const createHash = (password) => {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    )
}
const checkAuth = (req,res,next) =>{
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}
//Users
let Users = [{
    id: 1,
    name: 'John Doe',
    email: 'gger@gmail',
    password: 'ger1234',
    username: 'admin'
}]
//Middleware passport
passport.use('login' , new LocalStrategy(
    (userEmail, userPassword, done) => {

        console.log('Aquí el console');

        const user = Users.find(usuario => usuario.email === userEmail)

        if(!user) {
            console.log(`Usuario ${username} no encontrado`)
            return done(null, false, {message: 'Usuario no encontrado'})
        }
        // Validación de contraseña
/*         if(user.password !== password) {
            console.log(`Contraseña incorrecta`)
            return done(null, false, {message: 'Contraseña incorrecta'})
        } */
        return done(null, user)
    })
)

//Config passport
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    let user = Users.find( user => user.id === id )

    done(null, user)
})

// Routes
app.get('/login', async (req, res) =>{
    try{
        
        if (req.isAuthenticated()) {
            let user = req.user
            console.log('usuario logueado');
            res.status(200).redirect('/', {user})
        } else {
            return res.status(200).sendFile( 'login.html', { root: __dirname } )
        }
        
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/logout'}) , async (req, res) =>{
    console.log(req.body.userEmail);
    console.log(req.body.userPassoword);
    try{
        res.status(200).redirect('/')
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.get('/' , checkAuth ,  async (req, res) =>{
    console.log(req.user);
    try{
        res.sendFile('index.html', { root: __dirname} )
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.get('/logout', async (req, res) =>{
    try{
        //req.session.destroy();
        const logout = () => {
            req.session.destroy()
        }
        setTimeout(
            logout, 5000
        )
        res.sendFile('logout.html', { root: __dirname} )
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
})