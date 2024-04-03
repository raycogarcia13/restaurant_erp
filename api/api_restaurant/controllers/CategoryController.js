const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const Category = require("../models/Category")
const Item = require("../models/Item")


const get_all = async () =>{
    let data = await Category.find({},{},{sort:{bar:1,name:1}}).lean()

    let all = []
    for(let item of data){
        const items = await Item.find({
            category_id:item._id
        })
        all.push({
            ...item,
            items
        })
    }

    return all;
}

//POST  =>/login
exports.all = catchAsyncErrors(async (req,res,next) =>{
    const all = await get_all()
    return res.json({
        status:'success',
        data:all
    })
})

//POST  =>/login
exports.store = catchAsyncErrors(async (req,res,next) =>{
    await Category.create(req.body)
    const all = await get_all()
    return res.json({
        status:'success',
        data:all
    })
})
//POST  =>/login
exports.update = catchAsyncErrors(async (req,res,next) =>{
    const {id} = req.params

    let data = await Category.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    });
    if(!data)
        return next(new ErrorHandler('Category not found',404))

    const all = await get_all()
    return res.json({
        status:'success',
        item:data,
        data:all
    })
})

exports.remove = catchAsyncErrors(async (req,res,next) =>{
    const {id} = req.params
    await Category.findByIdAndDelete(id);
    let all = await get_all()

    return res.json({
        status:'success',
        data:all
    })
})
