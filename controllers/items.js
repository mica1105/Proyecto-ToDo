const Item= require("../models").Item;
const Estado= require("../models").Estado;
const Prioridad= require("../models").Prioridad;
const Lista= require("../models").Lista;
const Usuario= require("../models").Usuario;

exports.listar= async function(req, res, next) {
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const items= await Item.findAll({ 
        where: {
            usuario: usuario.id
        },  
        include: [
        Prioridad,
        Estado
        ]
    });
    res.render('./items/', {
        title:'Mis Items',
        listado: items,
        usuario:usuario
    });
};

exports.formAgregar= async (req,res)=>{
    const estados= await Estado.findAll();
    const prioridades= await Prioridad.findAll();
    let hoy= new Date();
    let fecha=hoy.toISOString().split('T')[0];
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const listas= await Lista.findAll({where: {usuario: usuario.id}});
    res.render('./items/form', {
        title: 'Crear Item',
        estados: estados,
        prioridades: prioridades,
        listas: listas,
        hoy: fecha,
    });
};

exports.agregar= async (req, res)=>{
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    let resolucion= null;
    let lista= null;
    if(req.body.estado == 3){
        resolucion= Date.now();
    }
    if(req.body.lista != ""){
        lista=req.body.lista;
    }
    await Item.create({
        titulo: req.body.titulo,
        fechaResolucion: resolucion,
        descripcion: req.body.descripcion,
        fechaLimite: req.body.limite,
        prioridad: req.body.prioridad,
        estado: req.body.estado,
        lista: lista,
        usuario: usuario.id
    });
    res.redirect(301, "/items/");
};

exports.formActualizar= async (req,res)=>{
    const item = await Item.findByPk(req.params.id);
    if(item.estado == 3){
        res.redirect(301,'/items/');
    }
    let hoy= new Date();
    let fecha=hoy.toISOString().split('T')[0];
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const estados= await Estado.findAll();
    const prioridades= await Prioridad.findAll();
    const listas= await Lista.findAll({where: {usuario: usuario.id}});
    
    res.render("./items/form", { 
        title:'Modificar Item', 
        estados: estados,
        prioridades: prioridades,
        listas: listas,
        item: item,
        hoy: fecha, 
    });
};

exports.modificar= async (req, res)=>{
    let resolucion= null;
    if(req.body.estado == 3){
        resolucion= Date.now();
    }
    await Item.update(
        {
            titulo: req.body.titulo,
            fechaResolucion: resolucion,
            descripcion: req.body.descripcion,
            fechaLimite: req.body.limite,
            prioridad: req.body.prioridad,
            estado: req.body.estado,
            lista: req.body.lista
        },
        {
            where:{id: req.params.id}
        }
    );
    const lista= await Lista.findByPk(req.body.listaId);
    let cantItems= await lista.countItems();
    let resueltos= await lista.countItems({where:{estado:3}});
    let fecha= new Date();

    if(cantItems == resueltos){
        await Lista.update(
            {
                fechaResolucion: fecha,
                estado: 3
            },
            {
                where:{id: lista.id}
            }
        );
    }
    res.redirect(301, "/items/");
};

exports.eliminar= async(req, res)=>{
    await Item.destroy({
        where: {id: req.params.id},
    });
    res.redirect(301,"/items/");
};

exports.ordenarPor= async (req, res)=>{
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const items= await Item.findAll({
        where: {
            usuario: usuario.id
        }, 
        include: [
            Prioridad,
            Estado
        ],
        order: [
            [req.body.atributo]
        ]
    });
    res.render('./items/', {
        title:'Mis Items',
        listado: items,
        usuario: usuario,
    });
};