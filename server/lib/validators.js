import { body , validationResult , check } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const registerValidator = () => [
    body("name" , "Please Enter Your Name").notEmpty(),
    body("username" , "Please Enter Username").notEmpty(),
    body("bio" , "Please Enter Your Bio").notEmpty(),
    body("password" , "Please Enter Your Password").notEmpty(),
    check("avatar", "Please Upload Avatar").notEmpty(),
];

const loginValidator = () => [
    body("username" , "Please Enter Username").notEmpty(),
    body("password" , "Please Enter Password").notEmpty(),
];

const validateHandler = (req , res , next) => {
    const errors = validationResult(req);
    const errorMessage =  errors.array().map((error) => error.msg).join(", ");
    console.log(errorMessage);
    if(errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessage , 400));
}


export {
    registerValidator,
    validateHandler,
    loginValidator
}