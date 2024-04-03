const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    created:{type:Date, default:Date.now()},
    menu_id: {type: Types.ObjectId, ref:"Menu", required: true},
    tables:[{type:Types.ObjectId, ref:"Table", required: true}],
    items:[
        {
            item_id: {type:Types.ObjectId, ref:"Item", required: true},
            unit_price: {type:Number, required: true},
            count:{type:Types.Number, default:1},
            observation:{type:String},
            extra_price: {type:Number, default:0},
            total_price: {type:Number, required: true},
            delivered:{type:Boolean, default:false}
        }
    ],
    total_price:{type:Types.Number},
    pay_type:{type:String, required:true, enum:['card','transaction','cash'], default:'cash'},
    payed:{type:Boolean, default:false},
    closed_time:{type:Date},
    closed:{type:Boolean, default:false},
    attended_by:{type:Types.ObjectId, required:true, ref:"User"}
});


dataSchema.pre('save', async function(next){
   this.items = this.items.map(it=>{
    it.total_price = (it.unit_price*it.count) + it.extra_price;
   })
   this.total_price = this.items.reduce( (sum,it)=>{return sum+=it.total_price},0 ) 
 });

module.exports =  model('Order', dataSchema);