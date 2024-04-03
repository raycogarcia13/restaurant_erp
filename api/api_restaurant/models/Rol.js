const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    rol:{
        type: String,
    }
});

module.exports =  model('Rol', dataSchema);