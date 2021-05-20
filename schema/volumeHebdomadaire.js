const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volumeHebdomadaireSchema = new Schema({
    elementConstitutif:{ type: Schema.Types.ObjectId, ref: 'Decomposition' },
    numeroSemaine:Number,
    volumeHeures:{
        cm:{type:Number},
        td:{type:Number},
        tp:{type:Number},
        partiel:{type:Number}
    }
});

const VolumeHebdomadaire = mongoose.model('VolumeHebdomadaire', volumeHebdomadaireSchema);

const createVolumeHebdomadaire = async volumeHebdomadaireData => {
    const volumeHebdomadaire = await this.create(volumeHebdomadaireData)
    return volumeHebdomadaire
}

module.exports = VolumeHebdomadaire;