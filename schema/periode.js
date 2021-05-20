const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const periodeSchema = new Schema({
    elementConstitutif:{ type: Schema.Types.ObjectId, ref: 'Decomposition' },
    nbSemaines:Number,
    nbGroupe:{
        cm:{type:Number},
        td:{type:Number},
        tp:{type:Number},
        partiel:{type:Number}
    }
});

const Periode = mongoose.model('Periode', periodeSchema);

const createPeriode = async periodeData => {
    const periode = await this.create(periodeData)
    return periode
}

module.exports = Periode;