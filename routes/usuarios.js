var express = require('express');
var router = express.Router();
var usuarioController= require('../controllers/usuarios');
var estaAutenticado= require('../middlewares/autenticacion').verificar;
var esAdmin= require('../middlewares/autenticacion').esAdmin;

/* GET listas listing. */
router.get('/',estaAutenticado, esAdmin ,usuarioController.listar);

router.get('/perfil',estaAutenticado,usuarioController.perfil);

router.get('/insertar', usuarioController.formAgregar);

router.post('/', usuarioController.agregar);

router.get('/:id', estaAutenticado,usuarioController.formActualizar);

router.put('/:id',estaAutenticado, usuarioController.modificar);

router.get('/pass/:id', estaAutenticado,usuarioController.formPassword);

router.put('/pass/:id',estaAutenticado, usuarioController.cambiarPass);

router.delete('/:id',estaAutenticado, usuarioController.borrar);

module.exports = router;