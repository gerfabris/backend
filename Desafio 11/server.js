const ContenedorProductos = require('./clases/contenedorProductos.js')
const contenedorProductos = new ContenedorProductos('./productos.json')

const ContenedorMensajes = require('./clases/contenedorMensajeArchivo.js')
const contenedorMensajes = new ContenedorMensajes('./mensajes.json')

const dotenv = require('dotenv').config()

const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = process.env.PORT || 8080

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) =>{
    res.sendFile('index.html', { root: __dirname} )
})

app.get('/productos-test', (req,res) =>{
    res.sendFile('productos-test.html', { root: __dirname} )
})

///////

const { faker } = require('@faker-js/faker');
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

//////

const normalizr  = require('normalizr')
const { normalize, schema, denormalize } = normalizr

const util = require('util')
const print = (obj) =>{
    console.log(util.inspect(obj, false, 12, true));
}

//////

io.on('connection', async (socket) =>{
    console.log('A user connected');

    let getProductos = await contenedorProductos.getAll()
    const productos =  getProductos 
    const productosTest = await getProductoTest()

    let getMensajes = await contenedorMensajes.getAll()
    const messages = getMensajes
    let pesoOriginal = JSON.stringify(messages).length;
console.log(pesoOriginal);
    const authorSchema = new schema.Entity('author' , {}, {idAttribute: 'email'});
    const textSchema = new schema.Entity('text')
    const mensajeSchema = new schema.Entity('messages', {
        author: authorSchema,
        text: textSchema
    })

    const normalizedMensajes = normalize(messages, mensajeSchema)

    //const getNormalize = messages.map( msg => normalize(msg, mensajeSchema))

    const denormalizedMensajes = denormalize(normalizedMensajes, mensajeSchema, normalizedMensajes)

    let desnormalizado = JSON.stringify(denormalizedMensajes).length;
    const compresion = (desnormalizado / pesoOriginal).toFixed(2)

    console.log(`El porcentaje de compresión ha sido del: ${compresion} %`);

    socket.emit('mensaje-servidor', productos, messages, compresion)

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

    socket.on('productos-test', () =>{        
        io.sockets.emit('mensaje-servidor-productosTest', productosTest)
    })

})

httpServer.listen(PORT, (err) =>{
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is listenning en el puerto: ${PORT}`);
})


