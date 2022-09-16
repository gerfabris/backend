const admin = require("firebase-admin");

class ProductosFirebase{
    constructor(coleccion){
        this.db = admin.firestore().collection(coleccion)
    }
    async save(obj){
        try{
            const producto = await this.db.add(obj)
            if(producto){
                console.log(`El ID del producto fue cargado es ${producto}`);
                return producto
            }
        }catch(error){
            console.log(error);
        }
    }
    async updateById(obj){
        try{
            const producto = await this.db.doc(obj.id)
            if (producto){
                const productoActualizado = await this.db.doc(obj.id).set(obj)
                return {
                    msg: `Se ha actualizado el producto`,
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
            const producto = await this.db.doc(id)
            if(producto){
                const doc = await producto.get()
                return doc.data()
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
            const productos = await this.db.get()
            if(productos){
                const producto = productos.docs.map(obj=>obj.data())
                return producto
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
            const producto = await this.db.doc(id)
            if(producto){
                let productoEliminado =  await this.db.doc(id).delete();
                return "Producto Eliminado"
            }else{
                console.log("No se encuentra el producto");
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteAll(){
        try{
            const productos = await this.db.get()
            if(productos){
                await this.db.docs().delete();
                console.log("Productos eliminados");
            }else{
                console.log("No hay productos para eliminar");
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = ProductosFirebase