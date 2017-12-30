"use strict";

let validatorUtil = {
     isValid(value, minLength, maxLength, errorMessage){
         let retVal = {"isValid": true, "errorMessage": ""};
         if (value.length < minLength || value.length > maxLength) {
             retVal.isValid = false;
             retVal.errorMessage = errorMessage;
         }
         else {
             retVal.isValid = true;
             retVal.errorMessage = "";
         }
         return retVal;
    }
 };

 module.exports = validatorUtil;
