const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName : {
        type : "string",
        required : true,
        trim : true
    },
    password : {
        type : "string",
        required : true,
        trim : true
    }
})

const user = mongoose.model('userInformation', userSchema)

module.exports = user