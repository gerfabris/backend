const Contenedor = require('./contenedor.js')
const contenedor = new Contenedor('./productos.txt')

const ContenedorMensaje = require('./contenedorMensaje.js')
const contenedorMensaje = new ContenedorMensaje('./mensajes.txt')

const express = require('express')
const handlebars = require('express-handlebars');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = process.eventNames.PORT || 8080

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) =>{
    res.sendFile('index.html', { root: __dirname} )
})

///////

io.on('connection', async (socket) =>{
    console.log('A user connected');

    let getProductos = await contenedor.getAll()
    const productos =  getProductos 

    let getMensajes = await contenedorMensaje.getAll()
    const messages = getMensajes

    socket.emit('mensaje-servidor', productos, messages)

    socket.on('producto-nuevo', async (producto, cb) =>{
        await contenedor.save(producto)
        const productos = await contenedor.getAll()

        const id = new Date().getTime()
        io.sockets.emit('mensaje-servidor', productos, messages)
        cb(id)
    })

    socket.on('message-nuevo', async (message, cb) =>{        
        await contenedorMensaje.save(message)
        const messages = await contenedorMensaje.getAll()

        io.sockets.emit('mensaje-servidor', productos, messages)
    })

})

httpServer.listen(PORT, (err) =>{
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is listenning en el puerto: ${PORT}`);
})

