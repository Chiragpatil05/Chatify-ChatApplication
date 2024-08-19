import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";

// ---- new group chat controller ----
// isme hum group ka name & members(ye user.id hogi) request ki body se fetch karlenge
// then allmembers mai ye members (req.body) se aaye hai wo toh honge hi and saath mai apn khud bhi include honge
// jese he group banjata hai => event emit karna hai
const newGroupChat = TryCatch(
    async(req , res , next) => {
        const { name , members } = req.body;

        if(members.length < 2) return next(new ErrorHandler("Group chat must have at least 3 memebers" , 400));

        // ...members : jo member aaye hai & req.user ye khud apn hai(creator hum khud hai)
        const allMembers = [...members , req.user]; 

        await Chat.create({
            name,
            groupChat: true,
            creator: req.user,
            members: allMembers,
        });

        emitEvent(req , ALERT , allMembers , `welcome to ${name} group`);
        emitEvent(req , REFETCH_CHATS , members);
    
        return res.status(201).json({
            success: true,
            message: `${name} group created successfully`,
        })
        
    }
)

export { newGroupChat }