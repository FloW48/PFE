const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const elementSchema = new Schema({
    titre:String,
    surnom:String,
    code:String,
    niveau:Number,
    elementParent:{ type: Schema.Types.ObjectId, ref: 'Element' },
    indiceFils:Number,
    volumeHeureProgPedag :{
        cm:{type:Number},
        td:{type:Number},
        tp:{type:Number}
    },
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
        cm: {type: Number, default: 1, min: 0},
        td: {type: Number, default: 1, min: 0},
        tp: {type: Number, default: 1, min: 0},
        partiel: {type: Number, default: 1, min: 0}
    },
    volumeHeureHebdo:[{
        nSemaine: {type: Number, default: 1, min: 1},
        cm: {type: Number, default: 0, min: 0},
        td: {type: Number, default: 0, min: 0},
        tp: {type: Number, default: 0, min: 0},
        partiel: {type: Number, default: 0, min: 0}
    }],
    volumeHeureGlobaux:[{
        intervenant:{ type: Schema.Types.ObjectId, ref: 'Intervenant' },
        volumeHeures:{
            cm:{type:Number},
            td:{type:Number},
            tp:{type:Number},
            partiel:{type:Number},
        }
    }],
    groupeParEnseignant:[{
        numeroSemaine:Number,
        intervenant:{ type: Schema.Types.ObjectId, ref: 'Intervenant' },
        nbGroupes:{
            cm:{type:Number},
            td:{type:Number},
            tp:{type:Number},
            partiel:{type:Number},
        }
    }]
});

const Element = mongoose.model('Element', elementSchema);

const createElement = async elementData => {
    const element = await this.create(elementData)
    return element
}

module.exports = Element;