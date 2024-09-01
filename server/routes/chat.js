import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMemeber, sendAttachments } from "../controllers/chat.js";
import { attachmetsMulter } from "../middlewares/multer.js";

const app = express.Router();

// after here user must be logged in to acess the routes
// ? so there must be a middleware to authenticate the user (we will use token to authenticate , so inorder to do this we need to access the token from cookies so we need to use cookie-parser)

app.use(isAuthenticated);
// meaning iske neeche jo bhi routes honge wo ese honge , so baar baar isAuthenticated nahi likhna padega =>  app.get("/me", isAuthenticated , getMyProfile);


app.post("/new" , newGroupChat);

app.get("/my" , getMyChats);

app.get("/my/groups" , getMyGroups);

app.put("/addmembers" , addMembers);

app.put("/removemember" , removeMemeber);

// (chat/:id) it is dynamic routing
app.delete("/leave/:id" , leaveGroup);

// normal message send karna text we will handle it using socket
// this is send attachment route
app.post("/message", attachmetsMulter , sendAttachments);



export default app;