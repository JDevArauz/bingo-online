const jwt = require('jsonwebtoken');
const { users } = require('../models/users.model');

async function authenticateToken(req, res, next) {
    try {
        const authorization = req.headers['authorization'];
        let token;
        if (authorization) {
            token = authorization.split(' ')[1];
        } else {
            token = req.cookies.token;
        }
        if(!token){
            return res.status(401).json({ message: 'No autorizado' });
        }
        const data = jwt.verify(token, process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).json({ message: 'Token invalido' });
            }
            req.user_id = decode;
            next();
        });
    } catch (err) {
        return res.status(401).send('No autorizado');
    }
}

module.exports = authenticateToken;
