var express= require('express');
var router= express.Router();
var passport = require("passport");
var authController= require('../controllers/auth');

router.get("/github", passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get("/github/callback", passport.authenticate("github",  { failureRedirect: "/auth/github/error" }),
    function (req, res) {
        res.redirect(301, "/listas/");
    }
);

router.post("/github/error", (req,res)=>{
    res.send("Ocurrio un error al validar en github");
});

/* app.get('/auth/google',
    passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
        ],
    session: false,
}));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect(301, "/listas/");
}); */


router.post('/login', authController.login);

router.get('/logout',authController.logout);

module.exports = router;
