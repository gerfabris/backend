const ContenedorProductos = require('./clases/contenedorProductos.js')
const contenedorProductos = new ContenedorProductos('./productos.json')
const ContenedorMensajes = require('./clases/contenedorMensajeArchivo.js')
const contenedorMensajes = new ContenedorMensajes('./mensajes.json')
//require general
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const authMiddleware = require('./middleware/auth.middleware')
const { connectMongoDB } = require('./connections/conexionDB.js')
//config socket
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = process.env.PORT || 8080
//require routers
const { indexRouter } = require('./routers/index/index.router.js')
const { logoutRouter } = require('./routers/logout/logout.router.js')
const { loginRouter } = require('./routers/login/login.router.js')
const { productosTestRouter } = require('./routers/productosTest/productos-test.router.js')
const { signupRouter } = require('./routers/signup/signup.router.js')
//config faker
const { faker } = require('@faker-js/faker');
// config normalizr
const normalizr  = require('normalizr')
const { normalize, schema, denormalize } = normalizr
const util = require('util')
//require para session y cookie
const cookieParser = require('cookie-parser')
const session = require('express-session')
const logger = require('morgan')

//Config Mongo para session
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST} = process.env
const MongoStore = require('connect-mongo')
const mongoConfig = {
    useNewUrlparser: true,
    useUnifiedTopology: true
}
//config session
app.use(logger('dev'))
app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    //store: MongoStore.create({mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig}),
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }, 
}))
//config cookie
app.use(cookieParser(process.env.COOKIES_SECRET || '123456'))
//confir passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt')

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
//Conection Mongo Atlas
const mongoose = require('mongoose')
connectMongoDB()
/* const Users = mongoose.model('usuarios', {
    email: {
        type: String, 
        required: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true,
        trim: true
    },
}) */


/* passport.use('login', new LocalStrategy(
    (req, userEmail, userPassword, done) =>{
        const { userEmail, userPassword } = req.body
        
        console.log(userEmail, 'useremail');
        console.log(userPassword);
        Users.findOne( { userEmail } , (err, user) =>{
            if(err)
            return done(err)

            if(!user){
                console.log('usuario no encontrado');
                return done(null,false, {message: 'User not found'})
            }

        })

        if(!isValidPassword(user, userPassword)){
            console.log('password incorrecto');
            return done(null, false, {message: 'Password incorrect'})
        }

        return done(null, user)
    }
)) */

let Users = [{
    id: 1,
    name: 'John Doe',
    userEmail: 'gger@gmail',
    password: 'ger1234',
    username: 'admin'
}]

passport.use('login' ,new LocalStrategy(
    (userEmail, userPassword, done) => {
        const user = Users.find(usuario => usuario.userEmail === userEmail)

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


passport.use('signup', new LocalStrategy(
    {
        passReqToCallback: true
    }, 
    (req, userEmail, userPassword, done) =>{
            Users.findOne({'email': userEmail}, (err, user) => {
                if(err){
                    return done(err)
                }
                if(user){
                    console.log('El usuario ya existe');
                    return done(null, false)
                }
                const newUser = {
                    email: userEmail,
                    password: createHash(userPassword)
                }
                Users.create(newUser, (err, userWithId) =>{
                    if(err){
                        return done(err)
                    }
                    return done(null, userWithId)
                })
            }
        )   
    }
))

/* passport.serializeUser((user, done) =>{
    done(null, user._id)
}) 
passport.deserializeUser((id, done) =>{
    Users.findById(id, done)
}) */


passport.serializeUser((user, done) => {
    done(null, user.id)
})


passport.deserializeUser((id, done) => {
    let user = Users.find( user => user.id === id )

    done(null, user)
})

app.use(passport.initialize())
app.use(passport.session())

const checkAuth = (req,res,next) =>{
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}

///////////////////////
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* app.use('/', indexRouter)
app.use('/logout', logoutRouter)
app.use('/login', loginRouter)
app.use('/productos-test', productosTestRouter)
app.use('/signup', signupRouter) */

/* app.get('/', (req, res) =>{
    res.sendFile('index.html', { root: __dirname} )
}) */

//use faker para productos
faker.locale = 'es'
faker.random = 'true'
let getProductoTest = async () =>{
    const productos = []
    for (let i=0; i < 10 ; i++){
        const id = productos.length + 1
        const title = faker.commerce.productName()
        const price = faker.commerce.price()
        const thumbnail = faker.image.imageUrl()
        const producto = {id,title,price,thumbnail}
        productos.push(producto)
    }  
    return productos
}
// Routes
app.get('/login', async (req, res) =>{
    try{
        const { userEmail , userPassword} = req.body   
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
//
app.post('/login', passport.authenticate('login', {failureRedirect: '/logout'}) , async (req, res) =>{
    try{
        res.status(200).redirect('/')
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})
//checkAuth , 
app.get('/' ,  async (req, res) =>{
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
app.post('/', checkAuth , async (req, res) =>{
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
app.get('/signup', checkAuth , async (req, res) =>{
    try{
        /* connectMongoDB() */
        res.status(200).sendFile('signup.html', { root: __dirname} )
        
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})
app.post('/signup', async (req, res) =>{

    try{
        res.status(200).redirect('/login')
/*         connectMongoDB()
        const Users = mongoose.model('usuarios', {
            email: {
                type: String, 
                required: true,
                trim: true
            },
            passport: { 
                type: String, 
                required: true,
                trim: true
            },
        })
        const registrarUsuario = async (coleccion, obj) =>{
            await coleccion.create(obj)
        }
        const email = req.body.userEmail
        const password = req.body.userPassword
        const usuarioMongo = coleccion.findById({email: email})
        //const usuarioMongo = coleccion.findOne({email})
        const usuarioParaRegistrar = {
            'email': email,
            'password': password
        }
        if(usuarioMongo){
            return res.status(300).json({
                success: true,
                message: 'el usuario ya existe'
            })
        }else{
            registrarUsuario(coleccion, usuarioParaRegistrar)
        } */
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})
app.get('/productos-test', (req,res) =>{
    res.sendFile('productos-test.html', { root: __dirname} )
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
//función para leer más bonito
const print = (obj) =>{
    console.log(util.inspect(obj, false, 12, true));
}
// config session middleware para socket
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig})
})
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
////////////////////////
//----------------------------------------------
io.on('connection', async (socket) =>{
    console.log('A user connected');

    let nameUser = socket.request.session.userName

    let getProductos = await contenedorProductos.getAll()
    const productos =  getProductos 
    const productosTest = await getProductoTest()

    let getMensajes = await contenedorMensajes.getAll()
    const messages = getMensajes
    let pesoOriginal = JSON.stringify(messages).length;
    
    console.log(`El tamaño original del archivo era de: `, pesoOriginal);
    
    const idSchema = new schema.Entity('id' );
    const authorSchema = new schema.Entity('author');
    const textSchema = new schema.Entity('text')
    const mensajeSchema = new schema.Entity('messages', {
        id: idSchema,
        author: authorSchema,
        text: textSchema
    })

    const normalizedMensajes = normalize(messages, [mensajeSchema])
    //print(normalizedMensajes)
    console.log( `Luego el tamaño del archivo quedó en: `, JSON.stringify(normalizedMensajes).length);    
    //const getNormalize = messages.map( msg => normalize(msg, mensajeSchema))
    const denormalizedMensajes = denormalize(normalizedMensajes, mensajeSchema, normalizedMensajes.entities)
    //print(denormalizedMensajes)
    //console.log(denormalizedMensajes);
    console.log(JSON.stringify(denormalizedMensajes).length);
    let pesoComprimido = JSON.stringify(normalizedMensajes).length;
    const compresion = ((pesoComprimido * 100) / pesoOriginal).toFixed(2)
    console.log(`El porcentaje de compresión ha sido del: ${compresion} %`);
    
    socket.emit('mensaje-servidor', productos, messages, compresion, nameUser)

    socket.on('producto-nuevo', async (producto, cb) =>{
        await contenedorProductos.save(producto)
        const productos = await contenedorProductos.getAll()
        const id = new Date().getTime()
        io.sockets.emit('mensaje-servidor', productos, messages, compresion, nameUser)
        cb(id)
    })
    socket.on('message-nuevo', async (message, cb) =>{        
        await contenedorMensajes.save(message)
        const messages = await contenedorMensajes.getAll()

        io.sockets.emit('mensaje-servidor', productos, messages, compresion, nameUser)
    })
    socket.on('productos-test', () =>{        
        io.sockets.emit('mensaje-servidor-productosTest', productosTest)
    })

})

httpServer.listen(PORT, (err) =>{
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is listenning en el puerto: ${PORT}`);
})

