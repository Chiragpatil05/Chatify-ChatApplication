import { body , validationResult , check, param, query } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req , res , next) => {
    const errors = validationResult(req);
    const errorMessage =  errors.array().map((error) => error.msg).join(", ");
    console.log(errorMessage);
    if(errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessage , 400));
}

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

const newGroupValidator = () => [
    body("name" , "Please Enter Name").notEmpty(),
    body("members").notEmpty().withMessage("Please Enter Members").isArray({min: 2 , max: 100}).withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
    body("chatId" ,"Please Enter Chat ID").notEmpty(),
    body("members").notEmpty().withMessage("Please Enter Members").isArray({min: 1 , max: 97}).withMessage("Memebers must be 1-97")
];

const removeMemeberValidator = () => [
    body("chatId" , "Please Enter Chat ID").notEmpty(),
    body("userId" , "Please Enter User ID").notEmpty(),
];

const sendAttachmentValidator = () => [
    body("chatId" , "Please Enter Chat ID").notEmpty(),
    check("files").notEmpty().withMessage("Please Uplaod Attachments").isArray({min:1 , max:5})
    .withMessage("Attachment must be 1-5"),
];

const chatIdValidator = () => [
    param("id" , "Please Enter Chat ID").notEmpty(),
];

const renameGroupValidator = () => [
    param("id" , "Please Enter Chat ID").notEmpty(),
    body("name" , "Please Enter Group New Name").notEmpty(),
];

export {
    registerValidator,
    validateHandler,
    loginValidator,
    newGroupValidator,
    addMemberValidator,
    removeMemeberValidator,
    sendAttachmentValidator,
    chatIdValidator,
    renameGroupValidator
}