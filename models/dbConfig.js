//Fichier de configuraiton pour se connecter à la base de données

const mongoose = require ('mongoose')   //pour récuperer toutes les méthodes du package mongoose dans la constante mongoose

mongoose.connect(   //Connexion à la BDD
    "mongodb://localhost:27017/MoiTestDB",  //Le lien vers la base de données Mongodb
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (!err) console.log("Mongodb connected"); //  Si il n'y pas d'erreur pour la connexion à mongodb
        else console.log("Connection error :" + err);   // Si il y a une erreur pour la connexion à mongodb
    }
)