const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projetSchema = new Schema({
    nom:String,
    date:String,
    verrouille:Boolean,
    archive:Boolean
});

const Projet = mongoose.model('Projet', projetSchema);

module.exports = Projet;