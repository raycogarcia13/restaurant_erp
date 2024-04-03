const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    name:{type: String},
});

module.exports =  model('Configuration', dataSchema);