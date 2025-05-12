const company = require("../models/companySchema");
const employeeDetails = require("../models/employeeSchema");

const HANDLE_APPLY = async (req, res) => {
  try {
    const { companyId, employeeId } = req.query;

    // Find the employee by ID
    const findEmployee = await employeeDetails.findById(employeeId);

    if (!findEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Prepare the candidate data to be stored
    const candidateData = {
      _id: findEmployee._id,
      firstName: findEmployee.firstName,
      lastName: findEmployee.lastName,
      phone: findEmployee.phone,
      email: findEmployee.email,
      country: findEmployee.country,
      streetAddress: findEmployee.streetAddress,
      city: findEmployee.city,
      pincode: findEmployee.pincode,
      resume: findEmployee.resume,
      education: findEmployee.education,
      skills: findEmployee.skills,
      languages: findEmployee.languages,
      companyId : companyId
    };

    const updateCompany = await company.findByIdAndUpdate(
      companyId,
      { $push: { apply_candidates: candidateData} },
      { new: true, upsert: true }
    );

    if (!updateCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Application successful", data: updateCompany });
  } catch (err) {
    console.error("Error in HANDLE_APPLY:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
;


module.exports = HANDLE_APPLY;
