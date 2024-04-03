const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const User = require("../models/User")

//POST  =>/login
exports.login = catchAsyncErrors(async (req,res,next) =>{
    let {username, password} = req.body;

    if(!username || !password)
        return next(new ErrorHandler('auth.empty',400))

    username = username.toLowerCase()

    const user = await User.findOne({
        username
    }).select('+password').populate({path:'role'});
    if(!user)
        return next(new ErrorHandler('auth.error',401))
    
    const pasv = await user.comparePassword(password);
    if(!pasv)
        return next(new ErrorHandler('Error de autenticación',401))

    const token = user.getJwtToken();
    return res.json({
        status:'success',
        user,
        token
    })
})
