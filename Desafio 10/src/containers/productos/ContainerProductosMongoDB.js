const mongoose = require('mongoose')

class ProductosMongoDB{
    constructor(nombreColeccion, esquema){
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }
    async save(obj){
        try{
            const nuevoProducto = await this.coleccion.create(obj)

            if(nuevoProducto){
                console.log(`Producto cargado correctamente ${nuevoProducto}`);
                return `Producto cargado correctamente ${nuevoProducto}`
            }
        }catch(error){
            console.log(error);
        }
    }
    async updateById(obj){
        try{
            const id = obj.id
            const producto = await this.coleccion.findById({_id: id})

            if (producto){
            const productoActualizado = await this.coleccion.findByIdAndUpdate({_id: id}, obj, {
                    new: true,
                    runValidators: true
                })
                return {
                    msg: `Se ha actualizado el producto ${obj.id}`,
                    productoActualizado
                }
            } else{
                return {error: "No existe el producto"}
            } 
        }catch(error){
            console.log(error);
        }
    }
    async getById(id){
        try{
            const producto = await this.coleccion.findById({_id: id})

            if(producto){
                return producto
            }else{
                console.log("No se encontró un producto con ese ID");
                return null
            }
        }catch(error){
            console.log(error);
        }
    }
    async getAll(){
        try{

            const productos = await this.coleccion.find({})

            if(productos.length){
                console.log( `Se han encontrado ${this.coleccion.length} productos`);
                return productos
            }else{
                console.log("No hay productos en el contenedor");
                //return null
                return productos
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteById(id){
        

        try{
            const producto = await this.coleccion.findById({_id: id})

            if(producto){
                await this.coleccion.findByIdAndDelete(id)
                return {
                    msg: `Se ha eliminado el producto `
                }
            }else{
                console.log("No se encuentra el producto");
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteAll(){
        try{
            const productos = await this.coleccion.find()
            if(productos.length){
                await this.coleccion.deleteMany({})
                console.log("Productos eliminados");
            }else{
                console.log("No hay productos para eliminar");
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = ProductosMongoDB