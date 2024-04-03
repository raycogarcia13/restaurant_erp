const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    name:{type: String},
    chairs:{type: Number, default:2}
});

module.exports =  model('Table', dataSchema);