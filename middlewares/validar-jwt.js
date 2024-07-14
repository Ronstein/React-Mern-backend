const { response, request } = require('express')
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    //Recibir JWT x-token headers
    const token = req.header('x-token');
    //console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        // const payload = jwt.verify(
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        //console.log(payload);
        //req.uid = payload.uid
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token No Válido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}