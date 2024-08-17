import jwt  from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";

// we will use token to authenticate the user , and we will fetch token from cookie , so we need to use cookie parsar
// here we will verify the token , token ko create karte time humne user._id ka use kara tha , so agar token verify hota hai toh hume user._id milegi and usse hum user ko verify karskte hai
const isAuthenticated = async(req , res , next) => {
        const token = req.cookies["chatify-token"];

        if(!token) return next(new ErrorHandler("Please login to access this route" , 401));

        const decodedData = jwt.verify(token , process.env.JWT_SECRET);
        
        // is id se user ko find karenge
        req.user = decodedData._id;

        console.log(decodedData);

        next();
    };

export {isAuthenticated}