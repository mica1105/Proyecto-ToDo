const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const Usuario= require("../models").Usuario;
const misecretkey= 'mi clave para todo';

exports.login= async function(req, res){
    const usuario= await Usuario.findOne({
        where: {email: req.body.email}
    });
    if(usuario){
        const validar = await bcrypt.compare(req.body.password, usuario.password);
        const user= usuario.email;
        if(validar){
            const token= jwt.sign({user: user}, misecretkey);
            req.session.token= token;
            req.session.usuario= user;
            res.redirect(301, "/listas/");
        } else{
            res.render("./",{
                codigo: 'error',
                mensaje:"El password es incorrecto",
              });
        }
    } else {
        res.render("./",{
            codigo: 'error',
            mensaje:"El usuario no existe",
          });
    }
};

exports.logout= async (req,res)=>{
    if(req.session.usuario==''){
        req.session.destroy();
        req.logout();
        res.render("./",{
            codigo:'success',
            mensaje:"Sesion terminada",
        });
    }
    req.session.destroy();
    res.render("./",{
        codigo:'success',
        mensaje:"Sesion terminada",
    });
  }
