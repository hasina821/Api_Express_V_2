const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Thing = require('./models/thing');
//On crée l'application express
const app = express();
const mongoose = require('./service/connect');

app.use((req, res, next) => {
  //d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader('Access-Control-Allow-Origin', '*');
  //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//body-parser analyse le corps de la demande
app.use(bodyParser.json());
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

const stuffRoutes = require('./routes/stuff');
app.use('/api/stuff', stuffRoutes);

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

module.exports = app;
