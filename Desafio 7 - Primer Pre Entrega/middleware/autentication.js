const autenticacion = (req, res, next) => {
	req.user = {
		fullName: "Cosme Fulanito",
		isAdmin: true,
	}
	next()
}

const autorizacion = (req, res, next) => {
	if (req.user.isAdmin) next();
	else res.status(403).send("No tienes permisos de Administrador");
};

module.exports = {autenticacion, autorizacion}