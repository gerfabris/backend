const ContenedorProductos = require('./controladores/contenedorProductos.js')
const contenedorProductos = new ContenedorProductos('./productos.json')

const ContenedorMensajes = require('./controladores/contenedorMensajes.js')
const contenedorMensajes = new ContenedorMensajes('./mensajes.txt')

const express = require('express')

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

    let getProductos = await contenedorProductos.getAll()
    const productos =  getProductos 

    let getMensajes = await contenedorMensajes.getAll()
    const messages = getMensajes

    socket.emit('mensaje-servidor', productos, messages)

    socket.on('producto-nuevo', async (producto, cb) =>{
        await contenedorProductos.save(producto)
        const productos = await contenedorProductos.getAll()

        const id = new Date().getTime()
        io.sockets.emit('mensaje-servidor', productos, messages)
        cb(id)
    })

    socket.on('message-nuevo', async (message, cb) =>{        
        await contenedorMensajes.save(message)
        const messages = await contenedorMensajes.getAll()

        io.sockets.emit('mensaje-servidor', productos, messages)
    })

})

httpServer.listen(PORT, (err) =>{
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is listenning en el puerto: ${PORT}`);
})

