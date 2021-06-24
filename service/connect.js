//Mongoose est un package qui facilite les interactions avec notre base de données MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bdd',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports.mongoose;