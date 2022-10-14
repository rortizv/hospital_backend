const { response } = require('express');
const { validationResult } = require('express-validator');


const validarCampos = (req, res = response, next) => {
    
    const errores = validationResult(req);

    // Si no está vacío, significa que SÍ HAY ERRORES, enviamos status 400
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();

}

module.exports = {
    validarCampos
}