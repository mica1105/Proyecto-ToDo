var express = require('express');
var router = express.Router();
var categoriasController= require('../controllers/categorias');

/* GET categorias listing. */
router.get('/', categoriasController.listar);

router.get('/insertar', categoriasController.formAgregar);

router.post('/',categoriasController.agregar);

router.get('/:id', categoriasController.formActualizar);

router.put('/:id', categoriasController.modificar);

router.delete('/:id', categoriasController.borrar);

module.exports = router;