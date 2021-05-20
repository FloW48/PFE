const mongoose = require('mongoose');
const Statut = mongoose.model('Statut')
const Schema = mongoose.Schema;

const enseignantSchema = new Schema({
    nom:  String,
    prenom: String,
    surnom: String,
    email: String,
    statut: { type: Schema.Types.ObjectId, ref: 'Statut' },
  });

const Enseignant = mongoose.model('Enseignant', enseignantSchema);

const createEnseignant = async enseignantData => {
    const enseignant = await this.create(enseignantData)
    return enseignant
}

module.exports = Enseignant;