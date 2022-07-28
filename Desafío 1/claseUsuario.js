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

	addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
    }

    countMascotas() {
        return `El usuario posee: ${this.mascotas.length}`;
    }

    addLibro(nombre, autor) {
        this.libros.push({nombre: nombre, autor:autor});
    }

    getNombreLibros() {
        this.libros.map(libro => libro.nombre);
    }
	
}

const usuarioDePrueba = new Usuario ("Germán", "Fabris", ["Thor"])

usuarioDePrueba.getNombreCompleto()
usuarioDePrueba.addMascota("Bam Bam")
usuarioDePrueba.addMascota("Tommy")
usuarioDePrueba.countMascotas()
usuarioDePrueba.addLibro("IT", "Stephen King")
usuarioDePrueba.addLibro("El Resplandor", "Stephen King")
usuarioDePrueba.getNombreLibros()

