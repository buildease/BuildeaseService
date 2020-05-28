const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String
    },
    resetOtp:{
        data:String
    },
    date:{
        type:Date,
        default:Date.now
    }

})

var collectionName = 'user'
const User = mongoose.model('User', UserSchema, collectionName);

module.exports = User;

