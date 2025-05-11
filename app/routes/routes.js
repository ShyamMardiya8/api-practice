const express = require("express")
const { GET_HIRE_DETAILS, POST_HIRE_DETAILS, UPDATE_HIRE_DETAILS, DELETE_HIRE_DETAILS } = require("../controller/CompanyService")
const { CREATE_EMPLOYEE_DETAILS } = require("../controller/EmployeeService")
const multerMiddleware = require("../middleware/multerMiddeware")

const route = express.Router()

route.get('/company', GET_HIRE_DETAILS)
route.post('/company', POST_HIRE_DETAILS)
route.put('/company/:id', UPDATE_HIRE_DETAILS)
route.delete('/company/:id', DELETE_HIRE_DETAILS)
route.post('/employee', multerMiddleware, CREATE_EMPLOYEE_DETAILS)


module.exports = route