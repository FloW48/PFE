const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupeParEnseignantSchema = new Schema({
    elementConstitutif:{ type: Schema.Types.ObjectId, ref: 'Decomposition' },
    numeroSemaine:Number,
    intervenant:{ type: Schema.Types.ObjectId, ref: 'Intervenant' },
    nbGroupes:{
        cm:{type:Number},
        td:{type:Number},
        tp:{type:Number},
        partiel:{type:Number},
    }
});

const GroupeParEnseignant = mongoose.model('GroupeParEnseignant', groupeParEnseignantSchema);

const createGroupeParEnseignant = async groupeParEnseignantData => {
    const groupeParEnseignant = await this.create(groupeParEnseignantData)
    return groupeParEnseignant
}

module.exports = GroupeParEnseignant;