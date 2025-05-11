const employeeDetails = require("../models/employeeSchema")
const missingFields = require("../validators/responseValidator")

const EMPLOYEE_DETAILS = async (req, res) => {
    try {
        const getDetails = await employeeDetails.find({})
        if (getDetails.length === 0) {
            return res.status(200).json({ message: "employee details is not found" })
        }
    }
    catch (err) {
        console.log(err.message)
    }
}

const EMPLOYEE_DETAILS_BY_ID = async = (req, res) => {
    try {
        const { id } = req.params.body
        const details = employeeDetails.findById(id)
        if (!details) {
            return res.status(200).json({ message: "not found employee" })
        }
        return res.status(200).json(details)
    }
    catch (err) {
        console.log(err.message)
    }
}

const CREATE_EMPLOYEE_DETAILS = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            email,
            country,
            streetAddress,
            city,
            pincode,
            education,
            skills,
            languages } = req.body

        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        const resume = req.file.originalname;
        console.log(resume, "path")

        const requiredFields = {
            firstName,
            lastName,
            phone,
            email,
            country,
            streetAddress,
            city,
            pincode,
            education,
            skills,
            languages
        }
        const missing = missingFields(requiredFields)
        console.log(missing, "miss")
        if (!missing.length == []) {
            return res.status(200).json({ message: `missing field is  ${missing.join(', ')}` })
        }

        const employee = new employeeDetails(
            {
                firstName,
                lastName,
                phone,
                email,
                country,
                streetAddress,
                city,
                pincode,
                education,
                skills,
                resume,
                languages
            }
        )
        await employee.save()
        return res.status(201).json({ message: "success" })
    }
    catch (err) {
        console.log(err.message)
    }
}

module.exports = { EMPLOYEE_DETAILS, EMPLOYEE_DETAILS_BY_ID, CREATE_EMPLOYEE_DETAILS }