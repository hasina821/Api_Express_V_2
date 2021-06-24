const express = require('express');
const bodyParser = require('body-parser');
//Mongoose est un package qui facilite les interactions avec notre base de données MongoDB
const mongoose = require('mongoose');
const Thing = require('./models/thing');
//On crée l'application express
const app = express();
mongoose.connect('mongodb+srv://root:ntsoa2112@cluster0.scaml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

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

//On crée un middleware qui reçoit la request, envoie la réponse et next pour passer à d'autre middleware
app.post('/api/stuff', (req, res, next) => {
	delete req.body._id;
	const thing = new Thing({
		...req.body
	});
	console.log(thing);
	thing.save()
		.then(() => res.status(201).json({ message: 'Objet enregistré !'}))
		.catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
	Thing.findOne({ _id: req.params.id })
	.then(thing => res.status(200).json(thing))
	.catch(error => res.status(404).json({ error }));
});

app.get('/api/stuff', (req, res, next) => {
	Thing.find()
	.then(things => res.status(200).json(things))
	.catch(error => res.status(400).json({ error }));
});

app.put('/api/stuff/:id', (req, res, next) => {
	Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
	.then(() => res.status(200).json({ message: 'Objet modifié !'}))
	.catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
	Thing.deleteOne({ _id: req.params.id })
	.then(() => res.status(200).json({ message: 'Objet supprimé !'}))
	.catch(error => res.status(400).json({ error }));
});
//On exporte l'application pour qu'on puisse l'utiliser dans d'autre fichier
module.exports = app;
