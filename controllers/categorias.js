const Categoria= require('../models').Categoria;
const Usuario= require('../models').Usuario;

exports.listar= async (req,res)=>{
    const usuario= await Usuario.findOne({where:{email:req.session.usuario}});
    const categorias= await Categoria.findAll();
    res.render('./categorias/index', {
        titulo: 'Gestion de Categorias',
        categorias: categorias,
        usuario: usuario,
    });
};

exports.formAgregar= async (req,res)=>{
    res.render('./categorias/form',{
        titulo: 'Crear Categoria'
    })
};

exports.agregar= async (req, res)=>{
    await Categoria.create({
        nombre: req.body.nombre
    });
    res.redirect(301,'/categorias/');
};

exports.formActualizar= async (req, res)=>{
    const categoria= await Categoria.findByPk(req.params.id);
    console.log(categoria);
    res.render('./categorias/form', {
        titulo: 'Modificar Categoria',
        categoria: categoria
    })
};

exports.modificar= async (req, res)=>{
    await Categoria.update({
        nombre: req.body.nombre,
    },{
        where: {id: req.params.id}
    });
    res.redirect(301,'/categorias/');
};

exports.borrar= async (req, res)=>{
    const categoria= await Categoria.findByPk(req.params.id);
    if(await categoria.countLista() == 0){
        await Categoria.destroy({where: { id: categoria.id}});
    }
    res.redirect(301,'/categorias/');
};