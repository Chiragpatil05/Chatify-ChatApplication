import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import { createUser } from "./seeders/user.js";

dotenv.config({
    path:"./.env",
});
// connect with database/mongodb
const mongoURI = process.env.MONGO_URL;
const port = process.env.PORT || 3000 ;
connectDB(mongoURI);

// here we will use the seeder , createUser() and sirf 1 baar use karenge taaki baar baar user nahi bante rahe
// createUser(10);

const app = express();

// using middleware here --
app.use(express.json());  // json data access karne ke liye
app.use(cookieParser());  // inorder to access cookie

// app.use(express.urlencoded()); form data access karne ke liye
// but agar form mai file bhi le rhe hai toh isse kaam nhi chalega
// we have to use another middleware for accessing files => multer middleware

// user routes
app.use("/user" , userRoute);  

// chat routes
app.use("/chat" , chatRoute);


// deafult route
app.get("/", (req, res) => {
    res.send("this is the default route of out chatify application");
})

// error middlware 
app.use(errorMiddleware)

// listen to port
app.listen(port, () => {
    console.log(`server is running at port: ${port}`);
})