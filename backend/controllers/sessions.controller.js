const sessionService = require('../services/sessions.service');
const service = new sessionService();
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    try {
        const { user, pass } = req.body;
        if (!user || !pass) {
            return res.status(400).json({ message: "Por favor, ingrese el usuario y contraseña" });
        }
        const userLogged = await service.findUser(user, pass);
        if (!userLogged) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }
        const session_active = await service.activatedSessions(userLogged);
        if (session_active > 0) {
            return res.status(402).json({ message: "Usuario ya tiene una sesión activa" });
        }
        const token = jwt.sign({
            user_id: userLogged.dni_id,
            user_name: userLogged.name,
            user_email: userLogged.email
        },
            process.env.JWT_SECRET
        );
        service.activateSession(userLogged, token);
        res.cookie('token', token, { maxAge: 2147483647000 });
        res.cookie('user_id', userLogged.dni_id, { maxAge: 2147483647000 });
        return res.status(200).json({ message: "Sesión iniciada", rol: userLogged.role_id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const Logout = async (req, res) => {
    try {
        const id = req.cookies.user_id;
        if (!id) {
            return res.status(401).json({ message: "Se requiere de un usuario" });
        }
        const user = await service.findUser({user: id});
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.clearCookie('token');
        res.clearCookie('user_id');
        service.updateSession(id);
        res.status(200).json({ message: "Sesión cerrada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { Login, Logout };