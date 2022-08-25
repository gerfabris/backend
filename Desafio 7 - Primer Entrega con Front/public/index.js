const server = io().connect()
//const handlebars = require('../express-handlebars');

const addProduct = (evt) => {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    
    const producto = {title, price, thumbnail}
    server.emit('producto-nuevo', producto, (id) =>{
        console.log(id);
    })
    return false
}

const addMessage = (evt) =>{
    const author = document.getElementById('author').value
    const text = document.getElementById('text').value
    const date = new Date()
    const fecha = {
		day: date.getDate(),
		month: date.getMonth()+1,
		year: date.getFullYear(),
		hs: date.getHours(),
		min: date.getMinutes(),
		sec: date.getSeconds()
    }

    const message = {author, text, fecha}
    
    server.emit('message-nuevo', message, (id) =>{
        console.log(id);
    })

    return false
}

const renderProductos = productos => {
    let listado = document.getElementById('list')        
    fetch('/partials/listaProductos.hbs')
        .then((res) => res.text())
        .then((data) =>{
            const template = Handlebars.compile(data)
            const html = template({
                productos: productos,
                title: title,
                price: price,
                thumbnail: thumbnail
            })
            listado.innerHTML = html 
    })
}

const renderMensajes =  messages =>{
    let listadoMensajes = document.getElementById('messages')
    fetch('/partials/mensajes.hbs')
    .then((res) => res.text())
    .then((data) =>{
        const template = Handlebars.compile(data)
        const html = template({ 
            messages: messages 
        })       
        listadoMensajes.innerHTML = html 
    })
}

server.on('mensaje-servidor', (productos , messages) =>{
    renderProductos (productos)
    renderMensajes (messages)
})

