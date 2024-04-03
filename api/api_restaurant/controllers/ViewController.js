const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const Category = require("../models/Category")
const Item = require("../models/Item")


//store  =>[POST]/api/v1/project
exports.home = catchAsyncErrors(async (req,res,next) =>{
    const categories = await Category.find({},{},{sort:{bar:1,name:1}}).lean()
    const all = await Item.find()
    const menu = await Item.find({enabled:true})

    return res.render("../pages/home.ejs",{
        categories: categories,
        products:all,
        menu
    })
})


//store  =>[POST]/api/v1/project
exports.menu = catchAsyncErrors(async (req,res,next) =>{
    const categories = await Category.find({},{},{sort:{bar:1,name:1}}).lean()
    const menu = await Item.find({enabled:true})

    return res.render("../pages/menu.ejs",{
        menu,
        categories
    })
})

