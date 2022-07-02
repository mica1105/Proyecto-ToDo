var express = require('express');
var router = express.Router();
var listaController= require('../controllers/listas');

/* GET listas listing. */
router.get('/', listaController.listar);

router.get('/listarItems/:id', listaController.listarItems);

router.get('/insertar', listaController.formAgregar);

router.post('/', listaController.agregar);

router.get('/:id', listaController.formActualizar);

router.put('/:id', listaController.modificar);

router.delete('/:id', listaController.eliminar);

module.exports = router;
