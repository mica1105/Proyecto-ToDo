const bcrypt= require('bcrypt');
const Usuario= require('../models').Usuario;
const Rol= require('../models').Rol;
const Lista= require('../models').Lista;


exports.listar= async function(req,res){
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    const usuarios= await Usuario.findAll({include:Rol});
    res.render('./usuarios/', {
        title: 'Gestion de Usuarios',
        usuarios: usuarios,
        usuario: usuario
    });
}

exports.perfil= async (req,res)=>{
    let email='';
    if(req.session.usuario){
        email=req.session.usuario;
    } else {
        email= req.user[0].email;
    }
    const usuario= await Usuario.findOne({where:{email: email}});
    res.render('./usuarios/perfil', {
        title: 'Perfil de Usuario',
        usuario: usuario
    });
}

exports.formAgregar= async (req,res)=>{
    if(req.user === undefined){
        res.render('./usuarios/registro',{
            titulo: 'Crear Usuario',
        })
    } else {
        let email;
        if(req.session.usuario){
            email=req.session.usuario;
        } else {
            email= req.user[0].email;
        }
        const admin= await Usuario.findOne({where:{email: email}});
        if(admin){
            res.render('./usuarios/registro',{
                titulo: 'Crear Usuario',
                admin: admin,
            })
        }
    }
};

exports.agregar= async (req,res)=>{
    let rol= 0;
    if(req.body.rol == "Admin"){
        rol= 1;
    }else{
        rol= 2;
    }
    const usuario= await Usuario.create({
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        rol: rol
    });
    const salt= await bcrypt.genSalt(10);
    usuario.password= await bcrypt.hash(usuario.password, salt);
    await usuario.save();
    if(req.session.usuario){
        res.redirect(301,'/usuarios/');  
    }else{
        res.render('./',{
            success: 'success',
            mensaje:"El usuario se creo con exito",
        });
    }
};

exports.formActualizar= async (req, res)=>{
    const usuario= await Usuario.findByPk(req.params.id);
    res.render('./usuarios/registro', {
        titulo: 'Modificar Usuario',
        usuario: usuario,
    })
};

exports.modificar= async (req, res)=>{
    await Usuario.update({
        nombre: req.body.nombre,
        email: req.body.email
    },
    {
        where:{id: req.params.id}
    }
    );
    const usuario= await Usuario.findByPk(req.params.id);
    res.render('./usuarios/perfil', {
        title: 'Perfil de Usuario',
        usuario: usuario,
        mensaje:'Se modificaron con exito los datos'
    });
};

exports.borrar= async (req,res)=>{
    const usuario= await Usuario.findByPk(req.params.id);
    if(usuario.countListas()== 0){
        await Usuario.destroy({
            where:{ id: usuario.id}
        });
    }
    if(usuario.countListas()>0){
        await Lista.destroy({
            where:{ usuario: usuario.id}
        });
        await Usuario.destroy({
            where:{ id: usuario.id}
        });
    }  
    res.redirect(301,'/usuarios/'); 
};

exports.formPassword= async (req,res)=>{
    const usuario= await Usuario.findByPk(req.params.id);
    res.render('./usuarios/cambiarPass', {
        titulo: 'Modificar Password',
        usuario: usuario,
    })
};

exports.cambiarPass= async (req,res)=>{
    const salt= await bcrypt.genSalt(10);
    pass= await bcrypt.hash(req.body.password, salt);
    await Usuario.update({
            password: pass,
        },
        {
            where:{id: req.params.id}
        }
    );
    const usuario= await Usuario.findByPk(req.params.id);
    console.log(usuario);
    res.render('./usuarios/perfil', {
        title: 'Perfil de Usuario',
        usuario: usuario,
        mensaje:'El password se modifico con exito',
    });
}