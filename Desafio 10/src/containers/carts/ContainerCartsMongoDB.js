const mongoose = require('mongoose')

class CartsMongoDB{
    constructor(nombreColeccion, esquema){
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }
    async crearCarrito(obj){
        try{
            if(obj){
                console.log(obj);
                const carritoNuevo = await this.coleccion.create({productos: obj})
                console.log(`El carrito fue cargado: ${carritoNuevo}`);
                return (`El carrito fue cargado: ${carritoNuevo}`)
            }else{
                const carritoNuevo = await this.coleccion.create()
                return (`El carrito fue cargado: ${carritoNuevo}`)
            }
        }catch(error){
            console.log(error);
        }
    }
    async updateCart(producto, idCarrito){
        try{
            const carrito = await this.coleccion.findById(idCarrito)

            if (carrito){
                const carritoActualizado = await this.coleccion.findByIdAndUpdate(id, producto, {
                    new: true,
                    runValidators: true
                })

                return carritoActualizado
            } else{
                return {error: "No existe el carrito"}
            } 
        }catch(error){
            console.log(error);
        }
    }
    async getById(id){

        try{
            const carrito = await this.coleccion.findById({_id: id})

            if(carrito){
                //console.log(cart);
                return carrito
            }else{
                console.log("No se encontró un carrito con ese ID");
                return null
            }
        }catch(error){
            console.log(error);
        }
    }
    async getAll(){
        try{
            const carritos = await this.coleccion.find({})
            if(carritos.length){
                return carritos
            }else{
                console.log("No hay carrito en el contenedor");
                //return null
                return carritos
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteById(id){
        try{
            const carrito = await this.coleccion.findById({_id: id})

            if(carrito){
                const carritoEliminado = await this.coleccion.deleteOne({_id: id})
                console.log("Carrito Eliminado");
            }else{
                console.log("No se encuentra el carrito");
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteProductById(idProducto, idCarrito){
        try{

            const carrito = await this.coleccion.findById({_id: idCarrito}) 
            const producto = await carrito.productos.findById({_id: idProducto}) 
            
            if(carrito){
                const productoEliminado = await carrito.productos.deleteOne({_id: idProducto})
                //console.log("Producto eliminado del carrito");
                return carrito
            }else{
                console.log("No se encuentra el carrito");
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteAll(){
        try{
            const carritos = await this.coleccion.find({})
            if(carritos.length){
                await this.coleccion.deleteMany({})
                console.log("Carritos eliminados");
            }else{
                console.log("No hay carritos para eliminar");
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = CartsMongoDB