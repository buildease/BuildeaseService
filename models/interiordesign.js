const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interiordesignSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    imgUrl: {
        type: String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

var collectionName = 'interiordesign'
module.exports = Interiordesign = mongoose.model("Interiordesign", interiordesignSchema, collectionName);