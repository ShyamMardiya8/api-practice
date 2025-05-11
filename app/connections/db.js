const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const dbConnections = async() => {
    try{
        const conn =  await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        console.log(`database connected in ${conn.connection.host}`)
    }
    catch(err){
        console.log('database connection error')
    }
}

module.exports = dbConnections