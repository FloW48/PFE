const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volumeGlobauxSchema = new Schema({
    elementConstitutif:{ type: Schema.Types.ObjectId, ref: 'Decomposition' },
    intervenant:{ type: Schema.Types.ObjectId, ref: 'Intervenant' },
    volumeHeures:{
        cm:{type:Number},
        td:{type:Number},
        tp:{type:Number},
        partiel:{type:Number},
    }
});

const VolumeGlobaux = mongoose.model('VolumeGlobaux', volumeGlobauxSchema);

const createVolumeGlobaux = async volumeGlobauxData => {
    const volumeGlobaux = await this.create(volumeGlobauxData)
    return volumeGlobaux
}

module.exports = VolumeGlobaux;