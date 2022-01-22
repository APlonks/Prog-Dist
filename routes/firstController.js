const express = require('express');
const router = express.Router();

const { ScoreUtilisateurModel } = require('../models/scoreUtilisateurModel');

router.post('/', (req, res)=>{  //On effectue catch la requête post sur l'url http://localhost:8084/first  , voir app.js
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
            console.log("On réinitialise le score à 0.")
            ScoreUtilisateurModel.findOneAndUpdate({ score : docs.score},{ score : 0 }, (err, docs)=>{ //Update du score du joueur
                if (err) { throw err; }
                else { console.log("Updated"); }
            });
            //ScoreUtilisateurModel.delete(docs[0])
        }
    })
    res.redirect('/')  //On se redirige vers la première page qui l'url http://localhost:8084/
    //Redirection vers une autre page pour éviter de recevoir la requête sur la page, voir comment régler le problème
})

module.exports = router