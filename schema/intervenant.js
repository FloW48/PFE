const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const intervenantSchema = new Schema({
    projet:{ type: Schema.Types.ObjectId, ref: 'Projet' },
    enseignant:{ type: Schema.Types.ObjectId, ref: 'Enseignant' },
    nbHeures:{min:Number, max:Number},
    nbHeuresSupp:{min:Number, max:Number}
});

const Intervenant = mongoose.model('Intervenant', intervenantSchema);

const createIntervenant = async intervenantData => {
    const intervenant = await this.create(intervenantData)
    return intervenant
}

module.exports = Intervenant;