import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMemeber, renameGroup, sendAttachments } from "../controllers/chat.js";
import { attachmetsMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemeberValidator, renameGroupValidator, sendAttachmentValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

// after here user must be logged in to acess the routes
// ? so there must be a middleware to authenticate the user (we will use token to authenticate , so inorder to do this we need to access the token from cookies so we need to use cookie-parser)

app.use(isAuthenticated);
// meaning iske neeche jo bhi routes honge wo ese honge , so baar baar isAuthenticated nahi likhna padega =>  app.get("/me", isAuthenticated , getMyProfile);


app.post("/new" , newGroupValidator() , validateHandler , newGroupChat);

app.get("/my" , getMyChats);

app.get("/my/groups" , getMyGroups);

app.put("/addmembers" , addMemberValidator() , validateHandler , addMembers);

app.put("/removemember" , removeMemeberValidator() , validateHandler ,  removeMemeber);

// (chat/:id) it is dynamic routing
app.delete("/leave/:id" , chatIdValidator() , validateHandler ,  leaveGroup);

// normal message send karna text we will handle it using socket
// this is send attachment route
app.post("/message", attachmetsMulter , sendAttachmentValidator() , validateHandler ,  sendAttachments);

// get messages
app.get("/message/:id" , chatIdValidator() , validateHandler ,  getMessages);

// get chat details : rename , delete
// here we will use "chaining" - route(path) ek hi hai but method are different
//    1.   app.get("/chat/:id" , function1)
//    2.   app.post("/chat/:id" , function2)
//    3.   app.delete("/chat/:id" , function3)
// agar ye 3 routes saath me likhenge it will look like 
app.route("/:id")
.get( chatIdValidator() , validateHandler , getChatDetails)
.put(renameGroupValidator() , validateHandler , renameGroup)
.delete(chatIdValidator() , validateHandler ,  deleteChat);

export default app;