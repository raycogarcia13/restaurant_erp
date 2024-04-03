const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    enabled:{type: Boolean, default: true},
    name:{type: String, required: true},
    picture: {type: String},
    price: {type: Number, required: true},
    manufactured:{type: Boolean, default: true},
    description:{type: String},
    category_id: {type: Types.ObjectId, ref:"Category", required: true}
});

module.exports =  model('Item', dataSchema);