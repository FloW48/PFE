const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projetSchema = new Schema({
    nom:String,
    date:Date,
    verrouille:Boolean,
    archive:Boolean
});

const Projet = mongoose.model('Projet', projetSchema);

const createProjet = async projetData => {
    const projet = await this.create(projetData)
    return projet
}

module.exports = Projet;