//Fichier de configuration pour faire le modèle de la collection (table) prenom-utilisateur

const mongoose = require("mongoose");


const ScoreUtilisateurModel = mongoose.model(
    "Prog-Dist-DB", //Le nom de la base de données
    {
        pseudo : {
            type : String,
            default : 'Unknown'
        },

        score: {
            type: Number,
            //required : true   //Ca faisait tourner en boucle l'envoi https://stackoverflow.com/questions/31663665/mongoose-validation-error-path-is-required
            default: 0
        },
    },
    "scoreUtilisateur" //Le nom de la table
);

// Maintenant on doit exporter cette BDD (la collecion ScoreUtilisateurModel) pour y avoir accès partout dans l'applications
module.exports = { ScoreUtilisateurModel };