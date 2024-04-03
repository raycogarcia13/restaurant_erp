const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const Table = require("../models/Table")


const get_all = async () =>{
    const all = await Table.find({},{},{sort:{name:1}})
    .collation({locale: "en_US", numericOrdering: true})
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
    const {count, chair} = req.body

    if(!count || !chair)
        return next(new ErrorHandler('Missing datas',400))

    let last = await Table.countDocuments()+1

    for(let i=0;i<count;i++){
        await Table.create({
            name:last++,
            chairs:chair
        })
    }

    const all = await get_all()
    return res.json({
        status:'success',
        data:all
    })
})
//POST  =>/login
exports.update = catchAsyncErrors(async (req,res,next) =>{
    const {id} = req.params

    let table = await Table.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    });
    if(!table)
        return next(new ErrorHandler('Table not found',404))

    const all = await get_all()
    
    return res.json({
        status:'success',
        table,
        data:all
    })
})

exports.remove = catchAsyncErrors(async (req,res,next) =>{
    const {id} = req.params

    await Table.findByIdAndDelete(id);

    let all = await get_all()
    let i = 1;
    for(let table of all){
        table.name = i++;
        await table.save() 
    }

    return res.json({
        status:'success',
        data:all
    })
})
