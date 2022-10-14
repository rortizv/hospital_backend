const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role');
    
    // De esta manera nos trae toda la data de cada usuario
    // const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios
    });

}

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    // Validamos si existe el usuario, de ser así, enviamos mensaje que ya está registrado
    try {
        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                message: 'El correo ya está registrado'
            });
        }
        
        const usuario = new Usuario(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Grabar usuario en BD
        await usuario.save();
    
        res.json({
            ok: true,
            usuario
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Server error'
        });
    }

}

const actualizarUsuario = async (req, res = response) => {

    // Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    
    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                message: 'No existe un usuario con ese id'
            });
        }

        // Actualizar
        const {pasword, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    message: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        })
    }
}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                message: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            message: 'Usuario eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Hable con el Admin'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}