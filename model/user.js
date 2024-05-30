const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    surname:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required:true,
        min:18,
        max:45
    },
    email:{
        type: String,
        required: true,
        unique: true 
    }

});

const User = mongoose.model('User',userSchema);
module.exports = User;