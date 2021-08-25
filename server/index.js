const Statut = require('../schema/Statut')
const Enseignant = require('../schema/Enseignant')
const Formation = require('../schema/formation')
const Projet = require('../schema/projet')
const Intervenant = require('../schema/intervenant')
const Element = require('../schema/element')


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

app.get('/', async (req, res) => {
  // await Statut.create(statut)
  // await Enseignant.create(enseignant)
  res.send("cc")
})

app.post('/addEnseignant', async (req, res) => {
  new Enseignant({
    _id: new mongoose.Types.ObjectId(),
    nom:req.body.nom,
    prenom:req.body.prenom,
    surnom:req.body.surnom,
    email:req.body.email,
    statut:req.body.statut
  }).save()
})

app.post('/editEnseignant', async (req, res) => {
  Enseignant.updateOne({_id:req.body.id}, {
    nom:req.body.nom,
    prenom:req.body.prenom,
    surnom:req.body.surnom,
    email:req.body.email,
    statut:req.body.statut
  })
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

app.post('/editStatut', async (req, res) => {
  await Enseignant.updateOne({_id:req.body.id}, {
    nom: req.body.nom,
    surnom: req.body.surnom,
    nbHeures : {min : req.body.nbHeures.min, max : req.body.nbHeures.max},
    nbHeuresSup : {min : req.body.nbHeuresSup.min, max : req.body.nbHeuresSup.max}
  })
})

app.post('/deleteEnseignant', async (req, res) => {
  console.log("delete")
  Enseignant.deleteOne({_id:req.body.id}, function(err, result) {
    if(err){
      console.log(err)
    }
    else{
      console.log(result)
    }
  })
})


app.post('/deleteStatut', async (req, res) => {
  console.log("delete")
  Statut.deleteOne({_id:req.body.id}, function(err, result) {
    if(err){
      console.log(err)
    }
    else{
      console.log(result)
    }
  })
})

app.post('/addProjet', async (req, res) => {
  await new Projet({
    _id: new mongoose.Types.ObjectId(),
    nom:req.body.nom,
    date: req.body.date,
    archive: req.body.archive,
    verrouille: req.body.verrouille
  }).save()
})

app.post('/addEnseignantsToProjet', async (req,res) => {
  console.log(req.body.projectID)
  console.log(req.body.teachersIDs)
  for(let teacherID of req.body.teachersIDs){
    await new Intervenant({
      _id: new mongoose.Types.ObjectId(),
      projet: req.body.projectID,
      enseignant:teacherID,
      nbHeures:{min:22, max:22},
      nbHeuresSupp:{min:0, max:0}
    }).save()
  }
})

app.post('/createFormation', async (req, res) => {
  const id = new mongoose.Types.ObjectId()
  await new Formation({
    _id: id,
    projet: req.body.projet,
    verrouille: req.body.verrouille
  }).save()
  res.send(id)
})

app.post('/createElement', async (req, res) => {
  const id = new mongoose.Types.ObjectId()
  await new Element({
    _id: id,
    id: id,
    titre: req.body.titre,
    idFormation : req.body.idFormation,
    name: req.body.titre,
    parent: req.body.elementPere,
    surnom: req.body.surnom,
    code : req.body.code,
    volumeHeureProgPedag: req.body.volumeHeureProgPedag,
    modeSaisie: req.body.modeSaisie,
    nbSemaines: req.body.nbSemaines,
    nbGroupes: req.body.nbGroupes,
    volumeHeureHebdo: req.body.volumeHeureHebdo
  }).save()
})

app.post('/modifyElement/:id', async (req,res) => {
  console.log(req.body)
  await Element.updateOne({_id:req.params.id}, {
    titre: req.body.titre,
    name: req.body.titre,
    surnom: req.body.surnom,
    code : req.body.code,
    volumeHeureProgPedag: req.body.volumeHeureProgPedag,
    modeSaisie: req.body.modeSaisie,
    nbSemaines: req.body.nbSemaines,
    nbGroupes: req.body.nbGroupes
  })
})

app.post('/modifyVolumeHebdo', async (req, res) => {
  await Element.updateOne({_id:req.body.id}, {
    volumeHeureHebdo: req.body.volumeHeureHebdo,
    groupeParEnseignant: req.body.groupeParEnseignant
  })
})

app.post('/addIntervenantToElement', async (req, res) => {
  console.log(req.body)
  let element = await Element.findOne({_id:req.body.idElement})
  element.groupeParEnseignant.push(req.body.groupeParEnseignant)
  element.save()
})



app.get('/getStatuts', async (req, res) => {
  res.send(await Statut.find({}))
})

app.get('/getIntervenants/:projectId', async (req, res) => {
  res.send(await Intervenant.findOne({projet:req.params.projectId}).populate('enseignant').populate('projet').exec() )
})

app.get('/getEnseignants', async (req, res) => {
  res.send(await Enseignant.find({}).populate('statut'))
})

app.get('/getProjets', async (req, res) => {
  res.send(await Projet.find({}))
})

app.get('/getElements/:idFormation', async (req, res) => {
  const data = await Element.getChildrenTree({filters: {idFormation : req.params.idFormation}})
  res.send(data)
})

app.get('/getFormation/:idFormation', async (req, res) => {
  const data = await Formation.findOne({_id:req.params.idFormation})
  res.send(data)
})


app.get('/getElement/:id', async (req, res) => {
  res.send(await Element.findOne({_id: req.params.id}).populate({
    path:'groupeParEnseignant.intervenant',
    populate:{path:'enseignant', model:'Enseignant'}
  }).exec())
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})