const express = require("express");

const app = express();

const port = process.env.PORT || 8081;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')

var path = require('path');
app.set('views', path.join(__dirname, '/view/'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

const passport = require('passport');
const session = require('express-session');
require('./model/components/autenticacao')(passport);

app.use(session({
    secret: '12345678', // configure um segredo seu aqui
    resave: false, //salvar cada requisição
    saveUninitialized: false, /// sessoês anônimas
    cookie: { maxAge: 30 * 60 * 1000} //30 min
}))

app.use(passport.initialize());
app.use(passport.session());

app.post('/login/executar', passport.authenticate('local', {
    successRedirect: '/usuario',
    failureRedirect: '/login?fail=true'
}));

var consign = require('consign');
consign().include('controller/routes',).into(app);

app.use(express.static('view'));

app.use(function(req, res, next){
    res.status(404).redirect('/not-found')
});

app.listen(port, function(){
    console.log("Servidor funcionando na url http://localhost:8081");
});

