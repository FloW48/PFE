const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bilanSchema = new Schema({
    projet:{ type: Schema.Types.ObjectId, ref: 'Projet' },
    sousTotaux:[
        {
            nom:{type:String},
            listeElementsConsitutifs:[{ type: Schema.Types.ObjectId, ref: 'Decomposition' }],
            listeLimites:[
                {
                    cm:{type:Number},
                    td:{type:Number},
                    tp:{type:Number},
                    partiel:{type:Number},
                    HeTD:{type:Number}
                }
            ]
        }
    ]
});

const Bilan = mongoose.model('Bilan', bilanSchema);

const createBilan = async bilanData => {
    const bilan = await this.create(bilanData)
    return bilan
}

module.exports = Bilan;