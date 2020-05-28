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
    data.architectureImgUrl = !(isEmpty(data.architectureImgUrl)) ? data.architectureImgUrl : "";
    if (validator.isEmpty(data.architectureName)) {
        errors.architectureName = "Architecture Name is required!!"
    }
    if (validator.isEmpty(data.architectureDescription)) {
        errors.architectureDescription = "Architecture Description is required!!"
    }
    if (validator.isEmpty(data.architectureImgUrl)) {
        errors.architectureImgUrl = "Architecture image is required!!"
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}

module.exports.constructionValidator = constructionValidator = function validateConstructionInput(data) {
    const errors = {}
    data.constructionName = !(isEmpty(data.constructionName)) ? data.constructionName : "";
    data.constructionDescription = !(isEmpty(data.constructionDescription)) ? data.constructionDescription : "";
    data.constructionImgUrl = !(isEmpty(data.constructionImgUrl)) ? data.constructionImgUrl : "";
    if (validator.isEmpty(data.constructionName)) {
        errors.constructionName = "Construction Name is required!!"
    }
    if (validator.isEmpty(data.constructionDescription)) {
        errors.constructionDescription = "Construction Description is required!!"
    }
    if (validator.isEmpty(data.constructionImgUrl)) {
        errors.constructionImgUrl = "Construction image is required!!"
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}

module.exports.interiordesignValidator = interiordesignValidator = function validateInteriordesignInput(data) {
    const errors = {}
    data.interiordesignName = !(isEmpty(data.interiordesignName)) ? data.interiordesignName : "";
    data.interiordesignDescription = !(isEmpty(data.interiordesignDescription)) ? data.interiordesignDescription : "";
    data.interiordesignImgUrl = !(isEmpty(data.interiordesignImgUrl)) ? data.interiordesignImgUrl : "";
    if (validator.isEmpty(data.interiordesignName)) {
        errors.interiordesignName = "Interiordesign Name is required!!"
    }
    if (validator.isEmpty(data.interiordesignDescription)) {
        errors.interiordesignDescription = "Interiordesign Description is required!!"
    }
    if (validator.isEmpty(data.interiordesignImgUrl)) {
        errors.interiordesignImgUrl = "Interiordesign image is required!!"
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}