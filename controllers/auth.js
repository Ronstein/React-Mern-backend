const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    //console.log(req.body);
    //const { name, email, password } = req.body;
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email })
        //console.log(usuario);
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            })
        }
        usuario = new Usuario(req.body);
        //Encryptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            // name,
            // email,
            // password,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor Hable con el administrador'
        });
    }
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email })
        //console.log(usuario);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }
        //confirmar claves
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password Incorrecto'
            })
        }
        //Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor Hable con el administrador'
        });
    }
}

const revalidarToken = async (req, res = response) => {
    const { uid, name } = req
    // const uid = req.uid;
    //generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name);
    res.json({
        ok: true,
        token,
        uid,
        name,
        //msg: 'renew'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}