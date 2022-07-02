var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session= require('express-session');
var logger = require('morgan');
var methodOverride = require("method-override");

var passport = require("passport");
var GitHubStrategy = require("passport-github2").Strategy;
var GoogleStrategy= require("passport-google-oauth").OAuth2Strategy;
const Usuario= require("./models").Usuario;

var authRouter = require('./routes/auth');
var estaAutenticado= require('./middlewares/autenticacion').verificar;
var esAdmin= require('./middlewares/autenticacion').esAdmin;
var indexRouter = require('./routes/index');
var todoRouter = require('./routes/todo');
var itemsRouter= require('./routes/items');
var listasRouter= require('./routes/listas');
var usuariosRouter= require('./routes/usuarios');
var categoriasRouter= require('./routes/categorias');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(methodOverride("_method"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'mi clave super secreta',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: "90ad27cbd26f741154eb",
      clientSecret: "b52a4d1702c3db4d36bf072b6b2b76213130e631",
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log('ID:'+profile.id);
      Usuario.findOrCreate({
        where: { email:profile.emails[0].value, nombre:profile.displayName, rol: 2 },
      }).then((usuario, creado) => {
        return cb(null, usuario);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

/* passport.use(
  new GoogleStrategy(
    {
      clientID:"685001949779-okp5v1tsfg70ku8d546nm86iqqfqs9tf.apps.googleusercontent.com",
      clientSecret:"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",
      callbackURL:"http://localhost:3000/auth/google/callback"
    },
     function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        //console.log('Email : '+profile.emails[0].value);
        Usuario.findOrCreate({
          where: { email:profile.emails[0].value, nombre:profile.displayName, rol: 2 },
        }).then((usuario, creado) => {
          return cb(null, usuario);
        });
    } 
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      Usuario.findOrCreate({
          where: { email:profile.emails[0].value, nombre:profile.displayName, rol: 2 },
      }, function (err, user) {
        return cb(err, user);
      });
    }
  )
); */

app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/todo', todoRouter);
app.use ('/items',estaAutenticado, itemsRouter);
app.use('/listas', estaAutenticado, listasRouter);
app.use('/usuarios',usuariosRouter);
app.use('/categorias', estaAutenticado, esAdmin, categoriasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
