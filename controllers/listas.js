const Lista = require("../models").Lista;
const Estado = require("../models").Estado;
const Categoria= require('../models').Categoria;
const Item = require("../models").Item;
const Usuario= require("../models").Usuario;
const Prioridad= require("../models").Prioridad;

exports.listar= async function(req, res){
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const listas= await Lista.findAll({
        where:{usuario:usuario.id},
        include: Estado
    });
    res.render('./listas/index', {
        title:'Mis Listas',
        listas: listas,
        usuario: usuario
    });
};

exports.formAgregar= async function(req, res){
    const estados= await Estado.findAll();
    const categorias= await Categoria.findAll();
    res.render('./listas/form', {
        title: 'Crear Lista',
        estados: estados,
        categorias:categorias,
    });
};

exports.agregar= async function(req, res){
    let resolucion= null;
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    await Lista.create({
        titulo: req.body.titulo,
        fechaResolucion: resolucion,
        estado: 1,
        categoria: req.body.categoria,
        usuario: usuario.id
    });
    res.redirect(301, "/listas/");
};

exports.formActualizar= async function(req, res){
    const categorias= await Categoria.findAll();
    const lista = await Lista.findByPk(req.params.id);
    if(lista.estado== 1){
        res.render("./listas/form", { 
            title:'Modificar Lista', 
            categorias: categorias,
            lista: lista 
        });
    } else {
        res.redirect(301, "/listas/");
    }
};

exports.modificar= async function(req, res){
    let resolucion= null;
    if(req.body.estado == 3){
        resolucion= new Date();
    }
    await Lista.update(
        {
            titulo: req.body.titulo,
            fechaResolucion: resolucion,
            categoria: req.body.categoria
        },
        {
            where:{id: req.params.id}
        }
    );
    res.redirect(301, "/listas/");
};

exports.eliminar= async function(req, res){
    const lista= await Lista.findByPk(req.params.id);
    if(await lista.countItems() == 0){
        await Lista.destroy({
            where: {
                id: lista.id
            }, 
        });
    }
    if(lista.estado == 3){
        await Item.destroy({
            where: {lista: lista.id},
        });
        await Lista.destroy({
            where: {
                id: lista.id
            }, 
        });
    }      
    res.redirect(301,"/listas/");
};

exports.listarItems= async (req,res)=>{
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const lista= await Lista.findByPk(req.params.id);
    const items= await Item.findAll({
        where:{lista: lista.id},
        include:[Prioridad,Estado]
    });
    res.render('./listas/listarItems', {
        lista:lista,
        listado: items,
        usuario:usuario
    });
};
