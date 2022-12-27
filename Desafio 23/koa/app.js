const puerto = require('./config/puerto');
const httpServer = require('./server')
const modoServer = require('./config/modoServer');

//const dotenv = require('dotenv').config()
//const PORT = process.env.PORT || 8085

const PORT = puerto
const modo = modoServer

const os = require('os')
const CPUs = os.cpus()
const numCPUs = CPUs.length
const cluster = require('cluster');

if(cluster.isPrimary && modo === 'cluster'){
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('online', (worker, code, signal) =>{
        console.log(` Worker: ${worker.process.pid} start. Date: ${new Date().toLocaleDateString()}`);
    })
    cluster.on('exit', (worker, code, signal) =>{
        console.log(` Worker: ${worker.process.pid} died. Date: ${new Date().toLocaleDateString()}`);
    })
}else {
    httpServer.listen(PORT, (err) =>{
        if(err) throw new Error(`Error on server: ${err}`)
        console.log(`Server is listenning en el puerto ${PORT} - Process ID: ${process.pid}. Date: ${new Date().toLocaleDateString()}`)
    })
}

/* httpServer.listen(PORT, (err) =>{
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is listenning en el puerto: ${PORT}`);
}) */