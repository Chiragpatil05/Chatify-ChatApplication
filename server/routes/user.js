import express from "express";
import { acceptFriendRequest, getMyNotifications, getMyProfile, login, logout, newUser, searchUser, sendFriendRequest } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

app.post("/new", singleAvatar , registerValidator() , validateHandler , newUser);

app.post("/login", loginValidator() , validateHandler ,  login);


// * after here user must be logged in to access the routes
// ? so there must be a middleware to authenticate the user (we will use token to authenticate , so inorder to do this we need to access the token from cookies so we need to use cookie-parser)

app.use(isAuthenticated); 
// meaning iske neeche jo bhi routes honge wo ese honge , so baar baar isAuthenticated nahi likhna padega =>  app.get("/me", isAuthenticated , getMyProfile);

app.get("/me", getMyProfile);

app.get("/logout" , logout);

app.get("/search" , searchUser);

app.put("/sendrequest" , sendRequestValidator() , validateHandler  ,sendFriendRequest);

app.put("/acceptrequest" , acceptRequestValidator() , validateHandler , acceptFriendRequest);

app.get("/notifications" , getMyNotifications);

export default app;
