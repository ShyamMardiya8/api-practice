const mongoose = require("mongoose")

const companyHireDetails = new mongoose.Schema(
    {
        companyName: {
            type: String,
            require: true,
            trim: true
        },
        jobRole: {
            type: String,
            require: true,
            trim: true
        },
        skills: {
            type: Array,
            require: true
        },
        education: {
            type: Array,
            require: true
        },
        jobDetails: {
            type: String,
            require: true,
            trim: true
        },
        jobDetails: {
            type: String,
            require: true,
            trim: true
        },
        shift: {
            type: String,
            require: true,
            trim: true
        },
        benefit : {
            type : String,
            require : true,
            trim : true
        },
        description : {
            type : String,
            require : true,
            trim : true
        }
    }
)

const company = mongoose.model("companyHireDetails", companyHireDetails)

module.exports = company