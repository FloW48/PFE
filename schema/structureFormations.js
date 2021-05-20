const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const structureFormationSchema = new Schema({
    titre:String,
    surnom:String,
    code:String,
    niveau:Number,
    elementParent:{ type: Schema.Types.ObjectId, ref: 'StructureFormation' },
    indiceFils:Number,
    volumeHeure:{cm:{type:Number},td:{type:Number},tp:{type:Number}},
    date:Date
});

const StructureFormation = mongoose.model('StructureFormation', structureFormationSchema);

const createStructureFormation = async structureFormationData => {
    const structureFormation = await this.create(structureFormationData)
    return structureFormation
}

module.exports = StructureFormation;