const server = io().connect()

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

const renderProductos = productos =>{
    let listado = document.getElementById('list')    
    const insertarHtml = (productos) =>{
        const table = `
        <h3 class="text-primary h3">Tabla de productos</h3>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Precio</th>
                    <th scope="col">URL imagen</th>
                </tr>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>
        `

        listado.innerHTML = table
        const tbody = document.getElementById("tbody");    
        let tr = productos.map(prod =>{
            return(
                `
                    <tr>
                        <th scope="row">${prod.id}</th>
                        <td>${prod.title}</td>
                        <td>${prod.price}</td>
                        <td><img src=${prod.thumbnail} class="img-fluid img-thumbnail" alt=""></td>
                    </tr>
                `
            )
        })
        tbody.innerHTML = tr
    }

    const insertarDefault = () => {
        const titleDefault = document.getElementById("listadoProductos")
        title = `<h3 class="alert-danger rounded p-3">No se encontraron productos</h3>`

        titleDefault.innerHTML = title
    }

    productos.length !== 0 ? insertarHtml(productos) : insertarDefault()

}

const renderMensajes =  messages =>{
    let listadoMensajes = document.getElementById('messages')

    const insertarMensajes = messages =>{
        listadoMensajes.style.display = "flex"
        let body = ``
        messages.forEach( ({author, text, fecha}) => {
            return (
                body += `
                    <p class"my-2">
                        <span class="text-info email"> ${author} </span>
                        <span class="date"> (${fecha.day}/${fecha.month}/${fecha.year} - ${fecha.hs}hs:${fecha.min}min:${fecha.sec})seg</span>
                        <span class="text-success">: ${text} </span>
                    </p>`
            )
            
        });
        listadoMensajes.innerHTML = body
    }

    messages.length !== 0 ? insertarMensajes(messages) : listadoMensajes.style.display = "none"
}

server.on('mensaje-servidor', (productos , messages) =>{
    renderProductos (productos)
    renderMensajes (messages)
})

