const { response } = require('express');

const Usuario = require('../models/usuario');


const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;

    res.json({
        ok: true,
        message: "Todo",
        busqueda
    });

}

module.exports = {
    getTodo
}