const { users } = require('../models/users.model');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const Login = async (req, res) => {
    try {
        const { user, pass } = req.body;
        if (!user || !pass) {
            return res.status(400).json({ message: "Por favor, ingrese el usuario y contraseña" });
        }
        const LoginUser = await users.findOne({
            where: {
                [Op.or]: {
                    email: user,
                    dni_id: user
                },
                password: pass
            }
        });
        if (!LoginUser) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }

        const sesion_active = await users.count({
            where: {
                dni_id: LoginUser.dni_id,
                remember_token: { [Op.not]: null }
            }
        });
        if (sesion_active > 0) {
            return res.status(401).json({ message: "Usuario ya tiene una sesión activa" });
        }
        const token = jwt.sign({
            user_id: LoginUser.dni_id,
            user_name: LoginUser.name,
            user_email: LoginUser.email
        },
            "secret_key_test",
        );
        await users.update({
            remember_token: token,
        }, {
            where: {
                dni_id: LoginUser.dni_id
            }
        });
        res.status(200).json({ user_id: LoginUser.dni_id, token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const Logout = async (req,res) => {
    try{
        const { id } = req.params;
        const user = await users.findOne({
            where: {
                dni_id: id
            }
        });
        if (!user){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        await users.update({
            remember_token: null
        },{
            where: {
                dni_id: id
            }
        });
        res.status(200).json({message: "Sesión cerrada"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = { Login, Logout };