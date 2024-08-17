import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// cookie options
const cookieOptions = {
    maxAge: 15*24*60*60*1000, // 15 days
    sameSite: "none",
    httpOnly: true,
    secure: true,
};

const connectDB = (uri) => {
    mongoose.connect(uri , {dbName: "Chatify"})
    .then((data) => {
        console.log(`Connected to database : ${data.connection.host}`);
    })
    .catch((err) => {
        throw err;
    })
}

// token ko cookie mai send karna hai
const sendToken = (res , user , code , message) => {
    // id ke basis pe jwt token ko verify karunga
    const token = jwt.sign({_id:user._id} , process.env.JWT_SECRET);

    return res.status(code).cookie("chatify-token",token,cookieOptions).json({
        success:true,
        message,
    })
}

export {connectDB , sendToken , cookieOptions};