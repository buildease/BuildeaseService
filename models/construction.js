const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const constructionSchema = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    ImgUrl:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

var collectionName = 'construction'
module.exports = Construction = mongoose.model("Construction", constructionSchema, collectionName);