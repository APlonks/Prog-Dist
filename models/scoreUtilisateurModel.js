//Fichier de configuration pour faire le modèle de la collection (table) prenom-utilisateur

const mongoose = require("mongoose");


const ScoreUtilisateurModel = mongoose.model(
    "MoiTestDB", //Le nom de la base de données
    {
        score: {
            type: Number,
            //required : true   //Ca faisait tourner en boucle l'envoi https://stackoverflow.com/questions/31663665/mongoose-validation-error-path-is-required
            //default: 0
        },
    },
    "scoreUtilisateur" //Le nom de la table
);

// Maintenant on doit exporter cette BDD (la colleciton prenom utilisateur de la BDD) pour y avoir accès partout dans l'applications

module.exports = { ScoreUtilisateurModel };