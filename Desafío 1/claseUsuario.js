class Usuario { 
	constructor(nombre, apellido, mascotas = [], libros = []) {
		this.nombre = nombre
		this.apellido = apellido
		this.libros = libros
		this.mascotas = mascotas
	}

	getNombreCompleto() {
		return `El nombre completo del usuario es: ${this.nombre} ${this.apellido}`;
	}

	addMascota(string) {
        this.mascotas.push(string);
    }

    countMascotas() {
        return `El usuario posee: ${this.mascotas.length}`;
    }

    addLibro(nombre, autor) {
        this.libros.push({nombre: nombre, autor:autor});
    }

    getNombreLibros() {
        this.libros.map(x => x.nombre);
    }
	
}

const usuarioDePrueba = new Usuario ("Juan", "Sepulveda", ["Luki"])

usuarioDePrueba.getNombreCompleto()
usuarioDePrueba.addMascota("Lila")
usuarioDePrueba.addMascota("Zanello")
usuarioDePrueba.countMascotas()
usuarioDePrueba.addLibro("IT", "Stephen King")
usuarioDePrueba.addLibro("El Resplandor", "Stephen King")
usuarioDePrueba.getNombreLibros()

