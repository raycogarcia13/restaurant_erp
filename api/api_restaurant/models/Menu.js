const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    created:{type:Date, default:Date.now()},
    items:[
        {type:Types.ObjectId, ref:"Item", required:true},
    ]
});

module.exports =  model('Menu', dataSchema);