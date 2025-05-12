const employeeDetails = require("../models/employeeSchema");
const missingFields = require("../validators/responseValidator");

const EMPLOYEE_DETAILS = async (req, res) => {
  try {
    const getDetails = await employeeDetails.find({});
    if (getDetails.length === 0) {
      return res.status(200).json({ message: "employee details is not found" });
    }
    return res.status(200).json(getDetails)
  } catch (err) {
    console.log(err.message);
  }
};

const EMPLOYEE_DETAILS_BY_ID = async  (req, res) => {
    // console.log(req, "req")
  try {
    const {id}  = req.params;
    const details = await employeeDetails.findById(id);
    if (!details) {
      return res.status(404).json({ message: "not found employee" });
    }
    return res.status(200).json(details);
  } catch (err) {
    console.log(err.message);
  }
};

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
      languages,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const resume = req.file.originalname;
    console.log(resume, "path");

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
      languages,
    };
    const missing = missingFields(requiredFields);
    console.log(missing, "miss");
    if (!missing.length == []) {
      return res
        .status(200)
        .json({ message: `missing field is  ${missing.join(", ")}` });
    }

    const employee = new employeeDetails({
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
      languages,
    });
    await employee.save();
    return res.status(201).json({ message: "success" });
  } catch (err) {
    console.log(err.message);
  }
};

const UPDATE_EMPLOYEE_DETAILS = async (req, res) => {
  try {
    const { id } = req.params;
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
      languages,
    } = req.body;

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
      languages,
    };
    const missing = missingFields(requiredFields);
    if (missing.length > 0) {
      return res
        .status(400)
        .json({ message: `missing field is ${missing.join(",")}` });
    }
    const updateDetails = {
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
      languages,
    };

    await employeeDetails.findByIdAndUpdate(id, updateDetails)
    return res.status(201).json({message : "updated successfully"})
  } 
  catch (err) {
    console.log(err.message);
  }
};


const DELETE_EMPLOYEE_DETAILS = async (req, res) => {
    try{
        const {id} = req.params
        const findDetails = await employeeDetails.findByIdAndDelete(id)
        if (!findDetails) {
            return res.status(200).json({ message : "delete issue"})
        }
        return res.status(200).json({ message : "success"})
    }
    catch(err){
        console.log(err.message)
    }
}
module.exports = {
  EMPLOYEE_DETAILS,
  EMPLOYEE_DETAILS_BY_ID,
  CREATE_EMPLOYEE_DETAILS,
  UPDATE_EMPLOYEE_DETAILS,
  DELETE_EMPLOYEE_DETAILS
};
