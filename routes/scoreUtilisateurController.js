const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId //Méthode qui permet de récuperer l'id de l'objet
var bodyParser = require('body-parser')


// "ScoreUtilisateurModel" est le constructeur présent dans scoreUtilisateurModel.js
const { ScoreUtilisateurModel } = require('../models/scoreUtilisateurModel');

//Méthode POST pour envoyer les données
router.post('/', (req, res, next)=>{
    console.log("Le body" + req.body)
    const newScore =  new ScoreUtilisateurModel({
        score: req.body.score,
    });
    newScore.save((err,docs) => {
        if(err) console.log(err);
        else res.send();
    })
    res.redirect('/about')  //Redirection vers une autre page pour éviter de recevoir la requête sur la page, voir comment régler le problème
    // newScore.save((err,docs) => {
    //     console.log("Le res :"+ res)
    //     console.log("Le docs :"+ docs)
    //     if(err) console.log(err);
    // })
})



// res.send pour afficher les données
// res.render pour envoyer les données dans un fichier ejs
router.get('/',bodyParser.urlencoded({ extended: false }), (req, res)=>{
    ScoreUtilisateurModel.find({ObjectID : "61e86edc708efa8cf9df2bdf"},(err, docs) => { //La recherche d'id ne sert à rien
        if(!err){
            //res.send(docs.body)
            res.render('index',{contenu: docs});
            console.log("Les données : "+ docs.body);
        }
        else console.log("Pas d'accès aux données : " + err);
    });
});

module.exports = router //Le router est accessible de partout dans le projet