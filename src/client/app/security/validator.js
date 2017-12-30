"use strict";

//import validator utility
let validatorUtil = require('../utils/validatorUtil');

/**
 * 
 * @type {{validate(*, *=, *, *): void}}
 */
let validator = {
    validate(name, value, config, uiState){
        console.info("in validate ");
        let result = validatorUtil.isValid( value,
            config.formValidations[ name + "_minLength"],
            config.formValidations[ name + "_maxLength"],
            config.formMessages[ name]);
        uiState[name + "ErrorMessage"] = result.errorMessage;
        uiState[name + "Valid"] = result.isValid;

        console.log(uiState.groupIDValid + " " + uiState.loginIDValid + " " + uiState.passwordValid);
        if(uiState.groupIDValid && uiState.loginIDValid && uiState.passwordValid){
            console.log("all fields are valid");
            uiState.submitdisabled = false;
        }
        else{
            console.log("some fields are not valid");
            uiState.submitdisabled = true;
        }
    }
};

module.exports = validator;