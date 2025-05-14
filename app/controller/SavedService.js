const company = require("../models/companySchema");
const employeeDetails = require("../models/employeeSchema");

const SAVE_JOBS_DETAILS = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await employeeDetails.findById(id);
    console.log(findUser, "user");
    const extractSavedJob = findUser.savedJob;
    if (extractSavedJob.length === 0) {
      return res.status(404).json({ message: "saved job is empty" });
    }
    return res.status(200).json(extractSavedJob);
  } catch (err) {
    console.log(err.message);
  }
};

const ADD_SAVED_JOB = async (req, res) => {
  try {
    const { companyId, employeeId } = req.query;
    const findCompanyDetails = await company.findById(companyId);
    if (findCompanyDetails.length === 0) {
      return res.status(404).json({ message: "company is not found" });
    }
    const savedJobDetails = {
      companyName: findCompanyDetails.companyName,
      jobRole: findCompanyDetails.jobRole,
      skills: findCompanyDetails.skills,
      education: findCompanyDetails.education,
      jobDetails: findCompanyDetails.jobDetails,
      shift: findCompanyDetails.shift,
      benefit: findCompanyDetails.benefit,
      description: findCompanyDetails.description,
    };

    console.log(findCompanyDetails, "details");
    const findEmployeeDetails = await employeeDetails.findByIdAndUpdate(
      employeeId,
      {
        $push: { savedJob: savedJobDetails },
      },
      { new: true, upsert: true }
    );
    if (findEmployeeDetails.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ message: "saved success" });
  } catch (err) {
    console.log(err.message);
  }
};

const DELETE_SAVED_JOB = async (req, res) => {
  try {
    const { companyId, employeeId } = req.query;

    const findEmployee = await employeeDetails.findById(employeeId);
    if (!findEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const jobExist = findEmployee.savedJob.find((i) => i._id == companyId);
    if (!jobExist) {
      return res.status(404).json({ message: "Job not found" });
    }

    const updatedSavedJobs = findEmployee.savedJob.filter((i) => i._id != companyId);

    const updatedEmployeeDetails = await employeeDetails.findByIdAndUpdate(
      employeeId,
      { savedJob: updatedSavedJobs },
      { new: true }
    );

    return res.status(200).json({
      message: "Saved job deleted successfully",
      savedJobs: updatedEmployeeDetails.savedJob,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  SAVE_JOBS_DETAILS,
  ADD_SAVED_JOB,
  DELETE_SAVED_JOB
};
