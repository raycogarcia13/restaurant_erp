const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    name:{type: String},
    short_name: {type: String},
    bar:{type: Boolean, default: false}
});

module.exports =  model('Category', dataSchema);