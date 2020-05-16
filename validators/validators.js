const mongoose = require('mongoose');
const isEmpty = require('is-empty');
const validator = require('validator');

module.exports.loginValidator = loginValidator = function validateLoginInput(data) {
    const errors = {}
    data.email = !(isEmpty(data.email)) ? data.email : "";
    data.password = !(isEmpty(data.password)) ? data.password : "";

    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required!"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required!!"
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Please provide valid email ID!"
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}

module.exports.registerValidator = registerValidator = function validateRegisterInput(data) {
    const errors = {}
    data.email = !(isEmpty(data.email)) ? data.email : "";
    data.password = !(isEmpty(data.password)) ? data.password : "";
    data.name = !(isEmpty(data.name)) ? data.name : "";
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required!"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required!!"
    }
    if (validator.isEmpty(data.name)) {
        errors.name = "Name is required!!"
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Please provide valid email ID!"
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}


module.exports.architectureValidator = architectureValidator = function validateArchitectureInput(data) {
    const errors = {}
    data.architectureName = !(isEmpty(data.architectureName)) ? data.architectureName : "";
    data.architectureDescription = !(isEmpty(data.architectureDescription)) ? data.architectureDescription : "";
   
    if (validator.isEmpty(data.architectureName)) {
        errors.architectureName = "Architecture Name is required!!"
    }
    if (validator.isEmpty(data.architectureDescription)) {
        errors.architectureDescription = "Architecture Description is required!!"
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}