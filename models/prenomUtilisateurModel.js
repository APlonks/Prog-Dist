//Fichier de configuration pour faire le modèle de la collection (table) prenom-utilisateur

const mongoose = require("mongoose");


const PrenomUtilisateurModel = mongoose.model(
    "MoiTestDB", //Le nom de la base de données
    {
        prenom: {
            type: String,
            required : true
        },
    },
    "prenomUtilisateur" //Le nom de la table
);

// Maintenant on doit exporter cette BDD (la colleciton prenom utilisateur de la BDD) pour y avoir accès partout dans l'applications

module.exports = { PrenomUtilisateurModel };