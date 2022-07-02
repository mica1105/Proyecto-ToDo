const jwt= require('jsonwebtoken');
const misecretkey= 'mi clave para todo';
const Usuario= require('../models').Usuario;
const Rol= require('../models').Rol;

exports.verificar= function(req,res,next){
    if(req.user){
        return next();
    }
    const token= req.session.token;
    if(token){
        jwt.verify(token, misecretkey, (err, user)=>{
            if(err){
                res.render("./",{
                    mensaje:"Acceso denegado, token expirado o incorrecto. Vuelva a loguearse",
                });
            } else {
                req.user= user;
                next();
            }
        });
    } else {
        res.render("./",{
            mensaje:"Acceso denegado, vuelva a loguearse",
        });
    }
};

exports.esAdmin= async function(req,res,next){
    console.log('Usuario: '+req.session.usuario);
    console.log('Token: '+ req.session.token);
    if(req.session.usuario && req.session.token){
        const usuario= await Usuario.findOne({ 
            where:{email: req.session.usuario},
            include: Rol,
        });
        if(usuario.Rol.descripcion === 'Admin'){
            next();
        }else{
            res.render("./",{
                mensaje:"Acceso denegado, el usuario no tiene permiso de acceso",
            });
        }
    }else{
        res.render("./",{
            mensaje:"Acceso denegado, vuelva a loguearse",
        });
    }   
};