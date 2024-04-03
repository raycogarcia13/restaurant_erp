const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const Category = require("../models/Category")
const Item = require("../models/Item")
const fs = require("fs")
const path = require("path")


const get_all = async (id) =>{
    let data = await Item.find({ category_id:id },{},{sort:{name:1}})
    .populate('category_id')
    .lean()

    return data;
}

//POST  =>/login
exports.all = catchAsyncErrors(async (req,res,next) =>{
    let data = await Item.find({ },{},{sort:{name:1}})
    .populate('category_id')
    .lean()
    return res.json({
        status:'success',
        data
    })
})

//POST  =>/login
exports.menu = catchAsyncErrors(async (req,res,next) =>{
    let data = await Item.find({enabled:true },{},{sort:{name:1}})
    .populate('category_id')
    .lean()
    const categories = await Category.find({},{},{sort:{bar:1,name:1}}).lean()
    
    let menu = [];
    for(const cat of categories){
        c = {
            cat_id:cat._id,
            cat_name:cat.name,
            products:data.filter(it=>it.category_id._id+"" == cat._id+"")
        }
        menu.push(c)
    }

    return res.json({
        status:'success',
        menu
    })
})

//POST  =>/login
exports.all_category = catchAsyncErrors(async (req,res,next) =>{
    const {id} = req.params;
    let all = await Item.find({
        category_id:id
    },{},{sort:{name:1}})
    .populate('category_id')
    return res.json({
        status:'success',
        data:all
    })
})

//POST  =>/login
exports.store = catchAsyncErrors(async (req,res,next) =>{
    const {name, price, description, category_id, manufactured} = req.body

    if(!name || !price){
        fs.unlinkSync(req.file.path)        
        return next(new ErrorHandler("Missing datas",401))
    }

    if(!req.file){
        return next(new ErrorHandler("Missing datas",401))
    }

    const p = await Item.create({
        name,
        price,
        picture:`public/products/${req.file.filename}`,
        manufactured:manufactured||true,
        description,
        category_id    
    })
    
    const all = await get_all(category_id)
    return res.json({
        status:'success',
        data:all
    })
})
//POST  =>/login
exports.update = catchAsyncErrors(async (req,res,next) =>{
    const {id} = req.params

    const exist = await Item.findById(id);
    if(!exist)
        return next(new ErrorHandler("Product not found", 404))

    if(req.file){
        try{
            fs.unlinkSync(path.join(__dirname,'../',exist.picture))
        }catch(e){

        }
        req.body.picture = `public/products/${req.file.filename}`
    }else{
        delete req.body.picture;
    }

    let data = await Item.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    });

    const all = await get_all(data.category_id)
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
