const json_wt = require('jsonwebtoken');

function authenticateToken(req,res){
    const autorization = req.headers['authorization'];

    if (!autorization || !autorization.startWith('Bearer')){
        return res.status(403).send('Token no valido');
    }

    const token = autorization.split(' ')[1];
    json_wt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).send('Acceso denegado');
        }
        req.user = decoded;
        next();
    });
}

module.exports = authenticateToken;