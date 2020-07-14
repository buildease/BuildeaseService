const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const constructionAppointmentSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    number: {
        type: String
    },
    planning: {
        type: String
    },
    area: {
        type: String
    },
    length: {
        type: String
    },
    breadth: {
        type: String
    },
    requirements: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var collectionName = 'constructionappointment'
module.exports = ConstructionAppointment = mongoose.model("ConstructionAppointment", constructionAppointmentSchema, collectionName);