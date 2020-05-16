const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const architectureSchema = new Schema({
    architectureName:{
        type:String
    },
    architectureDescription:{
        type:String
    }
});


module.exports = Architecture = mongoose.model("Architecture", architectureSchema);