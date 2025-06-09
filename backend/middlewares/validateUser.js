const validatorUser = {
    isAdmin: (req, res, next) => {
        // Verifica si el usuario está autenticado
        if (!req.user) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Verifica si el usuario tiene el rol de administrador
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: Solo administradores' });
        }

        // Si pasa las validaciones, continúa con la siguiente función middleware
        next();
    }
}

module.exports = validatorUser;