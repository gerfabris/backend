const admin = require("firebase-admin");

class CartsFirebase{
    constructor(coleccion){
        this.db = admin.firestore().collection(coleccion)
    }
    async crearCarrito(obj){
        try{
            if(obj){
                const carritoNuevo = await this.db.add(obj)
                console.log(`El carrito fue cargado: ${carritoNuevo}`);
                return (`El carrito fue cargado: ${carritoNuevo}`)
            }else{
                const carritoNuevo = await this.db.add()
                return (`El carrito fue cargado: ${carritoNuevo}`)
            }
        }catch(error){
            console.log(error);
        }
    }
    async updateCart(producto, idCarrito){
        try{
            const carrito = this.db.doc(idCarrito);

            if (carrito){
                const carritoActualizado = await this.db.doc(id).set(producto);

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
            const carritos = this.db.doc(id);

            if(carritos){
                //console.log(cart);
                const doc = await getall.get()
                return doc.data()
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
            const carritos = await this.db.get()
            if(carritos){
                let carrito = carritos.docs.map(obj=>obj.data())
                return carrito
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
            const carrito = this.db.doc(id);

            if(carrito){
                const carritoEliminado = await this.db.doc(id).delete();
                console.log("Carrito Eliminado");
            }else{
                console.log("No se encuentra el carrito");
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteAll(){
        try{
            const carritos = await this.db.get()
            if(carritos){
                await this.db.docs().delete();
                console.log("Carritos eliminados");
            }else{
                console.log("No hay carritos para eliminar");
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = CartsFirebase