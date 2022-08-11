const express = require("express");
const routerProductos = require("./routers/routerProductos.js");
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/productos", routerProductos);

const server = app.listen(PORT, (err)=>{
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is running en el puerto: ${PORT}`);
})
server.on("error", (error) => console.log(`Error en el servidor ${error}`));
