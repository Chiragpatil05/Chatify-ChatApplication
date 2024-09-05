import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, getChatDetails, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMemeber, sendAttachments } from "../controllers/chat.js";
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

// get chat details : rename , delete
// here we will use "chaining" - route(path) ek hi hai but method are different
//    1.   app.get("/chat/:id" , function1)
//    2.   app.post("/chat/:id" , function2)
//    3.   app.delete("/chat/:id" , function3)
// agar ye 3 routes saath me likhenge it will look like 
app.route("/:id").get(getChatDetails).post().delete();

export default app;