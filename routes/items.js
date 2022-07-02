var express = require('express');
var router = express.Router();
var itemsController= require('../controllers/items');

/* GET items listing. */
router.get('/', itemsController.listar);

router.get('/insertar', itemsController.formAgregar);

router.post('/',itemsController.agregar);

router.get('/:id', itemsController.formActualizar);

router.put('/:id', itemsController.modificar);

router.delete('/:id', itemsController.eliminar);

router.post('/ordenarPor', itemsController.ordenarPor);

module.exports = router;