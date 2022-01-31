const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId //Méthode qui permet de récuperer l'id de l'objet
var bodyParser = require('body-parser')

// Le controller qui permet de gérer les requêtes sur la page du jeu et à la fin du jeu

// "ScoreUtilisateurModel" est le constructeur présent dans scoreUtilisateurModel.js
const { ScoreUtilisateurModel } = require('../models/scoreUtilisateurModel');

// Vérifie l'utilisateur Unknown existe, si il n'existe pas on le créen sinon on affiche son score sur la page de jeu
router.get('/', (req, res)=>{
    ScoreUtilisateurModel.findOne({pseudo : "Unknown"}, (err, docs) => {
        if(docs == null){
            ScoreUtilisateurModel.create({pseudo : "Unknown", score : 0})
            res.render('index', {contenu : "0"})
        }else{
            //console.log(docs)
           res.render('index', {contenu : docs.score})  //Docs retourne l'élement choisi grâce à findOne check https://www.youtube.com/watch?v=OJ0YqgipiG0
        }
    })
});

//Méthode POST pour récuperer le formulaire qui contient les données utilisateurs
//Attention le app.use("/index", routes); dans app.js signifie qu'ici on commence l'url à partir de http://localhost:8084/index, on aurait pu laisser app.use("/index", routes); 
//et mettre en dessous router.post('/index', (req, res)=>{ 

router.post('/', (req, res)=>{
    console.log("Le body " + req.body.score)
    const newScore =  new ScoreUtilisateurModel({
        pseudo : "Unknown",
        score: req.body.score,
    });
    ScoreUtilisateurModel.findOne({pseudo : "Unknown"}, (err, docs) => {
        console.log(docs.score)
        // console.log(docs[1].score)
        if(err){
            console.log(err)
        }else{
            if(docs.score < req.body.score){  
                console.log("On remplace la valeure par le score du joueur")
                ScoreUtilisateurModel.findOneAndUpdate({ score : docs.score},{ score : req.body.score }, (err, docs)=>{ //Update du score du joueur
                    if (err) { throw err; }
                    else { console.log("Updated"); }
                });
                //ScoreUtilisateurModel.delete(docs[0])
            }else{
                console.log("On update pas la nouvelle valeure")
            }
        }
    })
    res.redirect('resultat')  //Redirection vers une autre page pour éviter de recevoir la requête sur la page, voir comment régler le problème
})

module.exports = router //Le router est accessible de partout dans le projet