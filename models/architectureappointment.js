const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const architectureAppointmentSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    number: {
        type: Number
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

var collectionName = 'architectureappointment'
module.exports = ArchitectureAppointment = mongoose.model("ArchitectureAppointment", architectureAppointmentSchema, collectionName);