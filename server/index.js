const Statut = require('../schema/Statut')
const Enseignant = require('../schema/Enseignant')
const Formation = require('../schema/formation')


const express = require('express')
const cors = require('cors');
const app = express()

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 3000

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecté à Mongoose")
});

const statut = 
{
    nom:"Professeur Agrégé",
    surnom: "PRAG",
    nbHeures:{min: 384, max:384},
    nbHeuresSup:{min:0, max:200},
}

const enseignant = 
{
    nom:"Ambert",
    prenom:"Fabrice",
    surnom:"FAM",
    email:"fablebro@bro.fr",
    statut:statut,
}

app.get('/', async (req, res) => {
  // await Statut.create(statut)
  // await Enseignant.create(enseignant)
  res.send("cc")
})

app.post('/addEnseignant', async (req, res) => {
  const enseignant = await new Enseignant({
    _id: new mongoose.Types.ObjectId(),
    nom:req.body.nom,
    prenom:req.body.prenom,
    surnom:req.body.surnom,
    email:req.body.email,
    statut:req.body.statut
  }).save()
})

app.post('/addStatut', async (req, res) => {
  const statut = await new Statut({
    _id: new mongoose.Types.ObjectId(),
    nom: req.body.nom,
    surnom: req.body.surnom,
    nbHeures : {min : req.body.nbHeures.min, max : req.body.nbHeures.max},
    nbHeuresSup : {min : req.body.nbHeuresSup.min, max : req.body.nbHeuresSup.max}
  }).save()
})

app.post('/deleteEnseignant', async (req, res) => {
  console.log("delete")
  Enseignant.remove({_id:req.body.id}, function(err, result) {
    if(err){
      console.log(err)
    }
    else{
      console.log(result)
    }
  })
})

app.get('/getStatuts', async (req, res) => {
  res.send(await Statut.find({}))
})

app.get('/getEnseignants', async (req, res) => {
  res.send(await Enseignant.find().populate('statut'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})