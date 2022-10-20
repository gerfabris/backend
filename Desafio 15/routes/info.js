const express = require("express");
const { Router } = express;
const router = Router();

const modoServer = require("../config/modoServer");
const os = require('os');
const CPUs = os.cpus()

const cantidad = () =>{
    let cantidad = Number
    if(modoServer === 'fork'){
        cantidad = 1
    }else{
        cantidad = CPUs.length
    }
    return cantidad
}   

router.get('/info', async (req,res) =>{    
    try{
        proceso = process.memoryUsage()
        respuesta = {
            argumentos: process.argv.slice(2),
            plataforma: process.platform,
            version: process.version,
            rss: JSON.stringify(proceso),
            path: process.argv[1],
            id: process.pid,
            carpeta: process.cwd(),
            procesos: cantidad(),
        }
        res.status(200).render('info', {respuesta})
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


module.exports = router;