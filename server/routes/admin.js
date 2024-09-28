import { allUsers } from "../controllers/admin.js";
import express from "express";

const app = express.Router();

/*
    1. get admin information
    2. verify admin
    3. logout admin
    4. get users data
    5. get chats data
    6. get messages data
    7. get stats for statistics
*/

app.get("/users" , allUsers);

export default app;