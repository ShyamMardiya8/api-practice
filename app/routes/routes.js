const express = require("express");
const {
  GET_HIRE_DETAILS,
  POST_HIRE_DETAILS,
  UPDATE_HIRE_DETAILS,
  DELETE_HIRE_DETAILS,
  GET_REGISTER,
  CREATE_ACCOUNT,
} = require("../controller/CompanyService");
const { CREATE_EMPLOYEE_DETAILS, UPDATE_EMPLOYEE_DETAILS, DELETE_EMPLOYEE_DETAILS, EMPLOYEE_DETAILS_BY_ID, EMPLOYEE_DETAILS } = require("../controller/EmployeeService");
const multerMiddleware = require("../middleware/multerMiddeware");
const tokenCheck = require("../middleware/jwtToken");
const HANDLE_APPLY = require("../controller/ApplyService");

const route = express.Router();

route.get('/company_register', GET_REGISTER)
route.post('/company_register', CREATE_ACCOUNT)
route.get("/company", GET_HIRE_DETAILS);
route.get("/company/:id", GET_HIRE_DETAILS);
route.post("/company", POST_HIRE_DETAILS);
route.put("/company/:id",tokenCheck, UPDATE_HIRE_DETAILS);
route.delete("/company/:id", tokenCheck, DELETE_HIRE_DETAILS);
route.get('/employee', EMPLOYEE_DETAILS)
route.get('/employee/:id', EMPLOYEE_DETAILS_BY_ID)
route.post("/employee",tokenCheck, multerMiddleware, CREATE_EMPLOYEE_DETAILS);
route.put('/employee/:id', tokenCheck, UPDATE_EMPLOYEE_DETAILS)
route.delete('/employee/:id',tokenCheck, DELETE_EMPLOYEE_DETAILS)
route.post('/apply', HANDLE_APPLY)

module.exports = route;
