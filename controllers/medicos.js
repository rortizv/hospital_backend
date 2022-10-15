const { response } = require('express');

const Medico = require('../models/medico');


const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                                     .populate('usuario','nombre email img')
                                     .populate('hospital', 'nombre img')

    res.json({
        ok: true,
        medicos
    });

}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el Admin'
        })
    }

}

const actualizarMedico = (req, res = response) => {

    res.json({
        ok: true,
        message: 'actualizarMedico'
    });

}

const borrarMedico = (req, res = response) => {

    res.json({
        ok: true,
        message: 'borrarMedico'
    });

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}