const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formationSchema = new Schema({
    projet:{ type: Schema.Types.ObjectId, ref: 'Projet' },
    verrouille:Boolean,
    decomposition:{ type: Schema.Types.ObjectId, ref: 'Decomposition' }
});

const Formation = mongoose.model('Formation', formationSchema);

const createFormation = async formationData => {
    const formation = await this.create(formationData)
    return formation
}

module.exports = Formation;