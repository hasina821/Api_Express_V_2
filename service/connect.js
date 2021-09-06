require('dotenv').config()
//const mongoose = require('mongoose');
const mysql = require('mysql');
/*
//Mongoose est un package qui facilite les interactions avec notre base de données MongoDB
mongoose.connect('mongodb://localhost:27017/bdd',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports.mongoose;
*/

// MYSQL connexion au base de donnée
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  console.log(process.env.DB_HOST, process.env.DB_USER)
  db.connect((err) => {
    if(err){
      console.log('Impossible de connecter à la base de donnée');
      return;
    }
    console.log('Connexion à la base de donnée reussie');
  });
  
  module.exports = db;