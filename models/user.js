const mongoose = require('mongoose');
const {Schema} = mongoose;


const User = new Schema({
        nachname:String,
        eMail:String,
        password:String,
});



module.exports = mongoose.model('users', User)


