import { compare } from "bcrypt";
import {User} from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";


// ----- new user controller -------
// create a new user(register a new user) and save it to database and also save token in cookie
// here at the time of registration we are also accessing a file for avatar , and to access file we have to use multer middleware
// yha par password bhi hai and hum chahate hai ki database mai entery save hone se phele password hash ho jaaye se we will use presave method on schema
const newUser = TryCatch(
    async (req, res) => {
        const {name,username,password,bio} = req.body;
        const avatar = {
            public_id:"cloudinary_id1",
            url:"cloudinary_url1"
        }
        console.log(req.body);
    
        const user = await User.create({
            name,
            username,
            password,
            bio,
            avatar
        })
    
        sendToken(res, user , 201 , "User created & registered successfully");
    }
)


// ------- login controller ------ 
// request ki body mese username & password fetch karo
// database mai check karo ki user exits karta hai kya , find user by req ki body wala username
// same for password ki jo password req body mai se aaya hai wo whi password database mai hai ki nhi
// save token in cookie
// next wala middleware => errorMiddleware hai
const login = TryCatch(
    async (req , res , next) => {
        const {username , password} = req.body;
    
        const user = await User.findOne({username}).select("+password");
    
        if(!user) return next(new ErrorHandler("Invalid username or user is not registered" , 404));
    
        const isPasswordMatch = await compare(password , user.password);
    
        if(!isPasswordMatch) return next(new ErrorHandler("password is incorrect",404));
    
        sendToken(res , user , 200 , `Welcome back ${user.name}`);
    }
)

export {login , newUser}