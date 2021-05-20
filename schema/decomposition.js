const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const decompositionSchema = new Schema({
    titre:String,
    surnom:String,
    code:String,
    niveau:Number,
    elementParent:{ type: Schema.Types.ObjectId, ref: 'Decomposition' },
    indiceFils:Number,
    volumeHeure:{cm:{type:Number},td:{type:Number},tp:{type:Number}},
    modeSaisie:String,
    saisieAutorise:{
        cm:{type:Boolean},
        tp:{type:Boolean},
        tp:{type:Boolean},
        partiel:{type:Boolean}
    },
    forfait:{
        cm:{type:Number},
        tp:{type:Number},
        tp:{type:Number},
        partiel:{type:Number}
    },
    nbGroupeEffectif:{
        cm:{type:Number},
        tp:{type:Number},
        tp:{type:Number},
        partiel:{type:Number}
    }
});

const Decomposition = mongoose.model('Decomposition', decompositionSchema);

const createDecomposition = async decompositionData => {
    const decomposition = await this.create(decompositionData)
    return decomposition
}

module.exports = Decomposition;