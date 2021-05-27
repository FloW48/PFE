const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statutSchema = new Schema({
    nom:  String,
    surnom: String,
    nbHeures: {min:{type:Number}, max:{type:Number}},
    nbHeuresSup: {min:{type:Number}, max:{type:Number}},
  });

const Statut = mongoose.model('Statut', statutSchema);

module.exports = Statut