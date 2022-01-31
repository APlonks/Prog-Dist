const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require("./models/dbConfig");   //Le fichier pour se connecter à la base de données
const routesIndex = require('./routes/scoreUtilisateurController');
const routesFirst = require('./routes/firstController');

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); //On fait en sorte de rendre lisible le json 

app.use("/index", routesIndex);  // Un middleware, Pour tous les endpoints qui commencent par /index
app.use("/first", routesFirst);  // Un middleware, Pour tous les endpoints qui commencent par /first

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