const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId //Méthode qui permet de récuperer l'id de l'objet
var bodyParser = require('body-parser')


// "ScoreUtilisateurModel" est le constructeur présent dans scoreUtilisateurModel.js
const { ScoreUtilisateurModel } = require('../models/scoreUtilisateurModel');

//Vérifie l'utilisateur Unknown existe, si il n'existe pas on le créen sinon on affiche son score sur la page de jeu
router.get('/', (req, res)=>{
    ScoreUtilisateurModel.findOne({pseudo : "Unknown"}, (err, docs) => {
        if(docs == null){
            ScoreUtilisateurModel.create({pseudo : "Unknown", score : 0})
        }else{
            //console.log(docs)
            res.render('index', {contenu : docs.score})  //Docs retourne l'élement choisi grâce à findOne check https://www.youtube.com/watch?v=OJ0YqgipiG0
        }
    })
});

//Méthode POST pour envoyer les données
router.post('/', (req, res, next)=>{
    console.log("Le body" + req.body)
    const newScore =  new ScoreUtilisateurModel({
        pseudo : "Unknown",
        score: req.body.score,
    });
    newScore.save((err,docs) => {
        if(err) console.log(err);
        else res.send();
    })
    //Compare les deux scores dans la BDD
    ScoreUtilisateurModel.find({pseudo : "Unknown"}, (err, docs) => {
        console.log(docs[0].score)
        console.log(docs[1].score)
        if(err){
            console.log(err)
        }else{
            //console.log(typeof(docs[1].score))
            if(docs[0].score < docs[1].score){  //Docs retourne l'élement choisi grâce à findOne check https://www.youtube.com/watch?v=OJ0YqgipiG0
                console.log("On delete la première valeure")
                scoreAdelete = docs[0].score
                ScoreUtilisateurModel.findOne({ score:scoreAdelete }).remove().exec();
                //ScoreUtilisateurModel.delete(docs[0])
            }else{
                console.log("On delete la deuxième valeure")
                scoreAdelete = docs[1].score
                ScoreUtilisateurModel.findOne({ score:scoreAdelete }).remove().exec();
                //ScoreUtilisateurModel.delete(docs[1])
            }
        }
    })
    res.redirect('/about')  //Redirection vers une autre page pour éviter de recevoir la requête sur la page, voir comment régler le problème
})

// //Méthode POST pour envoyer les données
// router.post('/', (req, res, next)=>{
//     console.log("Le body" + req.body)
//     const newScore =  new ScoreUtilisateurModel({
//         pseudo : "Unknown",
//         score: req.body.score,
//     });
//     newScore.save((err,docs) => {
//         if(err) console.log(err);
//         else res.send();
//     })
//     res.redirect('/about')  //Redirection vers une autre page pour éviter de recevoir la requête sur la page, voir comment régler le problème
// })

// //Méthode Get pour récuperer le résultat dans la base de données
// router.get('/', (req, res)=>{
//         ScoreUtilisateurModel.findOne({pseudo : "Unknown"}, (err, docs) => {
//             if(err){
//                 console.log(err)
//             }else{
//                 console.log(docs)
//                 res.render('index', {contenu : docs.score})  //Docs retourne l'élement choisi grâce à findOne check https://www.youtube.com/watch?v=OJ0YqgipiG0
//             }
//         })
// });

// router.get('/', (req, res)=>{
//     ScoreUtilisateurModel.find({ObjectID : "61e86edc708efa8cf9df2bdf"}, (err, docs) => {
//         if(err){
//             console.log(err)
//         }else{
//             console.log(docs)
//             res.render('index', {contenu : docs[0].score})  //Docs retourne une array des résultats check https://www.youtube.com/watch?v=-NBNF2yURm8, Il faut findOne pour une valeure
//         }
//     })
// });

module.exports = router //Le router est accessible de partout dans le projet