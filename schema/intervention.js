const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interventionSchema = new Schema({
    elementConstitutif:{ type: Schema.Types.ObjectId, ref: 'Decomposition' },
    intervenant:{ type: Schema.Types.ObjectId, ref: 'Intervenant' }
});

const Intervention = mongoose.model('Intervention', interventionSchema);

const createIntervention = async interventionData => {
    const intervention = await this.create(interventionData)
    return intervention
}

module.exports = Intervention;