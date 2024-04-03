const { Schema, model, Types } = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Rol = require('./Rol')

const dataSchema = new Schema({
    name:{
        type: String,
    },
    username:{
        type: String,
    },
    password:{
        type: String,
        select: false
    },
    role:{ type: Types.ObjectId, ref: Rol },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    deletedAt: Date
});

dataSchema.pre('save', async function(next){
    if(!this.isModified('password'))
        next()
    
    this.password = await bcrypt.hash(this.password, 10)
 });


//  compare password
dataSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
};

//  return JWT
dataSchema.methods.getJwtToken = function (){
    return jwt.sign({
        id:this._id
    },process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESTIME
    });
};

module.exports =  model('User',dataSchema);