const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const User = require("../models/User")
const Rol = require("../models/Rol")

//POST  =>/login
exports.all = catchAsyncErrors(async (req,res,next) =>{
   
    const all = await User.find().populate('role')
    const roles = await Rol.find();

    return res.json({
        status:'success',
        data:{
            users:all,
            roles
        }
    })
})

exports.create = catchAsyncErrors(async (req,res,next) =>{
    
    const data = await User.create(req.body);
    const all = await User.find().populate('role')
    return res.json({
        status:'success',
        data:all
    })
})

exports.update = catchAsyncErrors(async (req,res,next) =>{
    const {password} = req.body
    if(!password || password == ""){
        delete req.body.password
    }

    await User.findByIdAndUpdate(req.params.id,req.body);
    const all = await User.find().populate('role')
    return res.json({
        status:'success',
        data:all
    })
})

exports.remove = catchAsyncErrors(async (req,res,next) =>{

    const {id} = req.params

    const exist = await User.findById(id);
    if(!exist)
        return next(new ErrorHandler('User not found',404))


    await User.findByIdAndDelete(req.params.id);
    const all = await User.find().populate('role')
    return res.json({
        status:'success',
        data:all
    })
})
