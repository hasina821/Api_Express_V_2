const Thing = require('../models/thing');
const eleve = require('../models/eleve');
const fs = require('fs');
const db = require('../service/connect');

module.exports = {
  createThing : (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({
      ...thingObject,
      imageUrl: `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  },

  getOneThing : (req, res, next) => {
    Thing.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  },

  getAllStuff : (req, res, next) => {
    Thing.find().then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  },

  deleteThing : (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`public/images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  },

  modifyThing : (req, res, next) => {
    const thingObject = req.file ?
      {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`
      } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  },

  test: (req, res) => {
    console.log("==> TEST");
    /*
    let list_eleve = async () => {
      let resultats;
      try {
        resultats = await donnees_eleve();
      } catch (error) {
        resultats = error.message;
      }
      return resultats
    }
    list_eleve().then(resultats => {
      console.log(resultats);
      res.send(resultats);
    })
    */
    (async ()=>{
      let donnees_eleve = () => {
        return new Promise((resolve, reject) => {
          db.query("SELECT id FROM eleve", function(err, resultats){
            if(err) reject(new Error("Erreur données élèves"));
            resolve(resultats);
          })
        })
      }

      let resultats;
      try {
        resultats = await donnees_eleve();
      } catch (error) {
        resultats = error.message;
      }
      console.log(resultats);
      res.send(resultats)
    })()
  
    
    const emails = [
      "ntsoa@gmail.com",
      "koto@gmail.com",
      "soa@gmail.com"
    ];
    emails.forEach((email) => {
      console.log(email)
    })
    
  },

  getListEleve: async (req, res) => {
    let listEleve = await eleve.getListEleve();
    res.send(listEleve);
  } 

}