const mongoose = require('mongoose');
const {Schema} = mongoose;


const Order = new Schema({
        productID:String,
        amount:String,
});



module.exports = mongoose.model('orders', Order)