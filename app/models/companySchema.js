const mongoose = require("mongoose");

const companyHireDetails = new mongoose.Schema(
  {
    companyName: {
      type: String,
      require: true,
      trim: true,
    },
    jobRole: {
      type: String,
      require: true,
      trim: true,
    },
    skills: {
      type: Array,
      require: true,
    },
    education: {
      type: Array,
      require: true,
    },
    jobDetails: {
      type: String,
      require: true,
      trim: true,
    },
    shift: {
      type: String,
      require: true,
      trim: true,
    },
    benefit: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    apply_candidates: [
      {
        _id : String,
        companyId : String,
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        country: String,
        streetAddress: String,
        city: String,
        pincode: String,
        resume: String,
        education: String,
        skills: [String],
        languages: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const company = mongoose.model("companyHireDetails", companyHireDetails);

module.exports = company;
