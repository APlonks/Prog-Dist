const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId //Méthode qui permet de récuperer l'id de l'objet
var bodyParser = require('body-parser')


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