const puerto = require('./config/puerto');
const httpServer = require('./server')
//const dotenv = require('dotenv').config()
//const PORT = process.env.PORT || 8085

const PORT = puerto

httpServer.listen(PORT, (err) =>{
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is listenning en el puerto: ${PORT}`);
})