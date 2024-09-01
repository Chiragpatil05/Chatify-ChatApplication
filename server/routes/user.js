import express from "express";
import { getMyProfile, login, logout, newUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", singleAvatar , newUser);

app.post("/login", login);


// * after here user must be logged in to access the routes
// ? so there must be a middleware to authenticate the user (we will use token to authenticate , so inorder to do this we need to access the token from cookies so we need to use cookie-parser)

app.use(isAuthenticated); 
// meaning iske neeche jo bhi routes honge wo ese honge , so baar baar isAuthenticated nahi likhna padega =>  app.get("/me", isAuthenticated , getMyProfile);

app.get("/me", getMyProfile);

app.get("/logout" , logout);

// app.get("/search" , searchUser);

export default app;
