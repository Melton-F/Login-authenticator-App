import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    userName: {
        type:String
    },
    fullName: {
        type:String
    },
    passport_number: {
        type:String
    },
    Gender: {
        type:String
    },
    Date_Of_birth: {
        type:String
    },
    upload_passport_file: {
        type: String
    },
    admin_accept:{
        type:Boolean
    },
    no_Of_rejection:[{
        type:String
    }],
    logginReject:{
        type:String,
        default:"reject"
        // virtual:false
    },
    passportSubmition:{
        type:Boolean
    },
    permanent_Ban : {
        type:Boolean
    },
    password:{ 
        type: String
    },

}, {versionKey:false})

const AuthModel = mongoose.model("AuthUser", AuthSchema)


module.exports = AuthModel