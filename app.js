const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require("./models/dbConfig");   //Le fichier pour se connecter à la base de données
const routesIndex = require('./routes/scoreUtilisateurController');
const routesFirst = require('./routes/firstController');
//const scoreUtilisateurRoutes = require('./routes/scoreUtilisateurController');
const mongoose = require('mongoose');
const req = require('express/lib/request');
//const { counter } = require('./public/js/game.js')


//ATTENTION IL FAUT METTRE LE BODY PARSER AU PLUS HAUT DE L'APPLICATION pour pouvoir interpréter du JSON


app.use(bodyParser.urlencoded({ extended: false })); //JE NE SAIS PAS POURQUOI C'EST NECESSAIRE, On veut que notre requete passe par ce body parser
app.use(bodyParser.json()); //On fait en sorte de rendre lisible le json 

app.use("/index", routesIndex);  // Un middleware, Pour tous les endpoints qui commencent par / la fonction nous envoie à scoreUtilisateurController
app.use("/first", routesFirst);

//Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

//set Views
app.set('views', './views')
app.set('view engine', 'ejs')   //On définit le moteur qui va être utilisé pour les vues

//Première page
app.get('/', (req, res) => {
    res.render('first')
})

// Page de jeu
app.get('/index', (req, res) => {
    res.render('index')  //Attention pour accéder à la page index render va automatiquement chercher dans un nommé views donc il ne fat pas oublié de le créer sinon on puet le changer
})

//Page about
app.get('/resultat', (req, res) => {
    res.render('resultat', {text: 'Fin de jeu'})
})
 

app.listen(8084, () => console.log('Server started : 8084'));