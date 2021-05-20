const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statutSchema = new Schema({
    nom:  String,
    surnom: String,
    nbHeures: {min:Number, max:Number},
    nbHeuresSup: {min:Number, max:Number},
  });

async function createStatut(statutData){
    const statut = await this.create(statutData);
    return statut
}

const Statut = mongoose.model('Statut', statutSchema);



module.exports = Statut