
const Rol = require('../models/Rol');
const User = require('../models/User');

const seed = async (tabla,values, prop = null)=>{
    try{
        console.log(`Seeding ${tabla.collection.collectionName}`)
        await tabla.deleteMany();
        for(let item of values){
            if(prop){
                await tabla.findOneAndUpdate( { [prop]:item[prop] }, item, { upsert: true });
            }else
                await tabla.findOneAndUpdate( item, item, { upsert: true });
        }
        return true;
    }catch(error){
        console.log('error',error);
        return false;
    }
}

const seedUser = async ()=>{
    await User.deleteMany();
    const admin_rol = await Rol.findOne({rol:'Administrador'})
    const users = [
        {
            name:'rycode',
            username:'root',
            password:'123',
            role:admin_rol._id
        }
    ]
    try{
        for (const user of users) {
            await User.create(user);
        }

    }catch(e){
        console.error(e)
    }

    return true;
}

// run all seeders
exports.init = async()=>{
    let status = true; 

    const roles = [
        {rol:'Administrador'},
        {rol:'Cocinero'},
        {rol:'Cajero'},
        {rol:'Bartender'},
        {rol:'Mesero'},
    ]

    await seed(Rol, roles);
    
    await seedUser();

    return status;
}
