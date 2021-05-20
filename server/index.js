const Statut = require('../schema/Statut')
const Enseignant = require('../schema/Enseignant')
const Formation = require('../schema/formation')


const express = require('express')
const app = express()
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
    nom:"Professeur des Universités",
    surnom: "PU",
    nbHeures:{min: 192, max:192},
    nbHeuresSup:{min:0, max:100},
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})