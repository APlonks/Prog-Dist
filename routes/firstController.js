const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId //Méthode qui permet de récuperer l'id de l'objet
var bodyParser = require('body-parser')


const { ScoreUtilisateurModel } = require('../models/scoreUtilisateurModel');