//Event ROUTES
// /api/events

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

//TODAS TIENE QUE PASAR POR LA VALIDACION DE JWT
router.use(validarJWT);

//OBTENER EVENTOS
router.get('/', getEventos);

//CREAR EVENTOS
router.post(
    '/',
    [
        check('title', 'El título es Obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio es Obligatoria').custom(isDate),
        check('end', 'Fecha de Finalización es Obligatoria').custom(isDate),
        validarCampos,
    ],
    crearEvento);

//ACTUALIZAR EVENTO
router.put(
    '/:id',
    [
        check('title', 'El título es Obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio es Obligatoria').custom(isDate),
        check('end', 'Fecha de Finalización es Obligatoria').custom(isDate),
        validarCampos,
    ],
    actualizarEvento
);

//ELIMINAR EVENTO
router.delete('/:id', eliminarEvento);

module.exports = router;
