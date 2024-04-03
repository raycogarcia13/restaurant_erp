const { MongoClient } = require("mongodb");
const moment = require("moment");

const storeLog = async (user,route,req, method)=>{ 
    
    // DATABASE_URI_LOGGER_DEV
    const uri = process.env.DATABASE_URI_LOGGER_BASE || 'mongodb://localhost:27017';
    const client = new MongoClient(uri, {
    });
    await client.connect();
    const dbName = (process.env.NODE_ENV=='DEVELOPMENT')? process.env.DATABASE_URI_LOGGER_NAME_DEV || 'aiswo_dev_logs': process.env.DATABASE_URI_LOGGER_NAME || 'aiswo_logs';
    const db = client.db(dbName);
    const collection = db.collection('logs');

    let exist = false
    if(method == 'GET'){

        exist = await collection.findOne({
            user:user,
            method:method,
            time:{$gt:new Date(moment().subtract(5, 'minutes').toISOString())}
        });
    } 
    if(method!='GET' || !exist){
        const log = await collection.insertOne({
            user,req,route,method,time:new Date()
        })
        // return log;
    }
    await client.close();
    return false
}

module.exports = (req,res,next) => {
    
    if ( req.user==null || req.user==undefined) 
    next();
    
    const user = req.user.dataValues

    let l = {
        user:{
            id:user.id,
            email:user.email,
            username:user.username,
            name:user.fullname
        },
        req:{
            body:req.body,
            params:req.params,
            type:req.method,
            full_uri:req.protocol + '://' + req.get('host') + req.originalUrl
        },
        method:req.method,
        route:req.path
    }
    storeLog(l.user,l.req, l.route, l.method).then((p)=>{
        
    })
    next()
}