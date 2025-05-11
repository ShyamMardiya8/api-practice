
const company = require("../models/companySchema");
const missingFields = require("../validators/responseValidator");

const GET_HIRE_DETAILS = async (req, res) => {
    try {
        const details = await company.find({})
        if (details.length === 0) {
            return res.status(400).json({ message: "No hire details found" })
        }
        return res.status(200).json(details)
    }
    catch (err) {
        console.log(err.message)
    }
}

const POST_HIRE_DETAILS = async (req, res) => {
    try {
        const { companyName, jobRole, skills, education, jobDetails, shift, benefit, description } = req.body;
        const requiredFields = {
            companyName,
            jobRole,
            skills,
            education,
            jobDetails,
            shift,
            benefit,
            description
        };

        const missing = missingFields(requiredFields);

        if (missingFields(requiredFields).length > 0) {
            return res.status(400).json({ message: `Missing fields: ${missing.join(",")}` });
        }

        const hireDetails = new company({
            companyName,
            jobRole,
            skills,
            education,
            jobDetails,
            shift,
            benefit,
            description
        });

        await hireDetails.save();

        return res.status(200).json({ message: "Hire details saved successfully", hireDetails });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};


const UPDATE_HIRE_DETAILS = async = (req, res) => {
    try {
        const { id } = req.params.id
        const { companyName, jobRole, skills, education, jobDetails, shift, benefit, description } = req.body;
        const requiredFields = {
            companyName,
            jobRole,
            skills,
            education,
            jobDetails,
            shift,
            benefit,
            description
        };
        const missing = missingFields(requiredFields);

        if (missingFields(requiredFields).length > 0) {
            return res.status(400).json({ message: `missing field is ${missing.join(',')}` })
        }
        const updatedDetails = {
            companyName,
            jobRole,
            skills,
            education,
            jobDetails,
            shift,
            benefit,
            description
        }
        
        company.findByIdAndUpdate(id, updatedDetails)
        return res.status(200).json({ message: "updated successfully" })

    }
    catch (err) {
        console.log(err.message)
    }
}


const DELETE_HIRE_DETAILS = async (req, res) => {
    try {
        const { id } = req.params.id
        const del = await company.findByIdAndDelete(id)
        if (!del) {
            return res.status(400).json({ message: "some issue" })
        }
        return res.status(200).json({ message: "successfully delete" })
    }
    catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    GET_HIRE_DETAILS,
    POST_HIRE_DETAILS,
    UPDATE_HIRE_DETAILS,
    DELETE_HIRE_DETAILS
}