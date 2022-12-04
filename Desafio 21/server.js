const express = require('express')
const session = require('express-session')
const mongoSessions = require('./config/mongoSessions.js');
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
/* ----- require routes ------- */
const routes = require('./routes/index.routes.js');
/* ----- socket ------- */
const productosTestSocket = require('./sockets/productos-test.sockets.js');
const mensajes = require('./sockets/mensajes.sockets.js');
const productos = require('./sockets/productos.sockets.js');
/* --------- middlewares -------- */
const pageNotFound = require('./middlewares/pageNotFound.middleware.js');
/* --------- app -------- */
const app = express();
/* ------ config socket ------ */
const { Server: HttpServer } = require('http')
const { Server: IOSocket } = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOSocket(httpServer)
/* --------- fork  ------------ */
const { fork } = require('child_process')

/* --------- sets ------------ */
app.set('view engine', 'hbs');
app.set('views', (__dirname + '/public/views'));
/* ------ uses ---- */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public')) // ---> NGINX
app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: false,
    saveUninitialized: false,
    rolling: true,                  
    cookie: {
        maxAge: 1000 * 60 * 10                     
    },
    store: mongoSessions
}))
app.use(morgan('dev'))
/* ------------ passport ------------ */
const passport = require('./services/passport.js');
app.use(passport.initialize());
app.use(passport.session());
/* ------------ routes -------------- */
app.use(routes);
/* ----- socket escuchando las conecciones */
io.on('connection', async (socket) =>{
    console.log('A user connected');

    productosTestSocket(socket, io)
    productos(socket, io)
    mensajes(socket, io)

    socket.emit ('mensaje-servidor')
    
});
/* ----- exportamos el hhtpServer y ejecutamos la app en app.js */
module.exports = httpServer