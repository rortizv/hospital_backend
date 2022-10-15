/*
    Medicos
    ruta: '/api/medico
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');


const router = Router();


router.get( '/' , getMedicos );

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital no es válido').isMongoId(),
        validarCampos
    ], 
    crearMedico
);

router.put( '/:id',
    [],
    actualizarMedico
);

router.delete( '/:id',
    borrarMedico
);


module.exports = router;