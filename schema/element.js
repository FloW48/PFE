const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MpathPlugin = require('mongoose-mpath');

const elementSchema = new Schema({
    titre:String,
    name:String,
    id:String,
    surnom:String,
    idFormation:String,
    code:String,
    niveau:Number,
    modeSaisie:String,
    volumeHeureProgPedag :{
        cm:{type:Number},
        td:{type:Number},
        tp:{type:Number}
    },
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
    volumeHeureGlobaux:[{
        intervenant:{ type: Schema.Types.ObjectId, ref: 'Intervenant' },
        volumeHeures:{
            cm:{type:Number},
            td:{type:Number},
            tp:{type:Number},
            partiel:{type:Number},
        }
    }],

    //Volume
    volumeHeureHebdo:[{
        nSemaine: {type: Number, default: 1, min: 1},
        cm: {type: Number, default: 0, min: 0},
        td: {type: Number, default: 0, min: 0},
        tp: {type: Number, default: 0, min: 0},
        partiel: {type: Number, default: 0, min: 0}
    }],
    groupeParEnseignant:[{
        intervenant:{ type: Schema.Types.ObjectId, ref: 'Intervenant' },
        info:[{
            nSemaine:{type:Number},
            nbGroupes:{
                cm:{type:Number},
                td:{type:Number},
                tp:{type:Number},
                partiel:{type:Number},
            }
        }]
    }],


    //Période
    nbSemaines:Number,
    nbGroupes:{
        cm:{type:Number},
        td:{type:Number},
        tp:{type:Number},
        partiel:{type:Number}
    }
});

elementSchema.plugin(MpathPlugin);

const Element = mongoose.model('Element', elementSchema);

const createElement = async elementData => {
    const element = await this.create(elementData)
    return element
}

module.exports = Element;