const express = require('express')
const session = require('express-session')
const mongoSessions = require('./config/mongoSessions.js');
const dotenv = require('dotenv').config()
const logger = require('morgan')
/* ----- require routes ------- */
const login = require('./routes/login.js');
const signup = require('./routes/signup.js');
const home = require('./routes/home.js');
const logout = require('./routes/logout.js');
const productosTest = require('./routes/productos-test.js');
const info = require('./routes/info.js');
const randoms = require('./routes/randoms.js');
/* ----- socket ------- */
const productosTestSocket = require('./sockets/productos-test.js');
const mensajes = require('./sockets/mensajes.js');
const productos = require('./sockets/productos.js');
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
app.use(logger('dev'))
/* ------------ passport ------------ */
const passport = require('./routes/passport.js');

app.use(passport.initialize());
app.use(passport.session());
/* ------------ routes -------------- */
app.use(login);
app.use(signup);
app.use(home);
app.use(logout);
app.use(productosTest);
app.use(info);
app.use(randoms);

/* ----- httpServer escuchando para fork */
/* httpServer.on( 'request', (req, res) =>{
    let { url } = req
    if( url === '/api/randoms'){

    }
}) */


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