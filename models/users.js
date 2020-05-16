const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    resetOtp:{
        data:String,
        default:''
    },
    accessToken:{
        type:String,
        default:''
    }

})

module.exports = Users = mongoose.model("Users", UserSchema);