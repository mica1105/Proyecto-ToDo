var express = require('express');
var router = express.Router();

let lista= [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.session.lista= lista;
  res.render('todo', { 
    title: 'Mi lista To Do',
    lista:req.session.lista
   });
});

router.post('/add',(req, res)=>{
  const { item } = req.body;
  lista.push({
    id:lista.length + 1,
    item: item
  });
  res.render('todo', { 
    title: 'Mi lista To Do',
    lista: req.session.lista
  });
});

router.get('/delete/:id',(req, res)=>{
  const { id } = req.params;
  lista.forEach((item, i)=>{
    if(item.id == id){
      lista.splice(i,1);
    }
  });
  res.render('todo', { 
    title: 'Mi lista To Do',
    lista: req.session.lista
  });
});

module.exports = router;
