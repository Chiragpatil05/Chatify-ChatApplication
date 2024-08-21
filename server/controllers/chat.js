import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

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


// ---- get my chats controller -----
// apni chats (including group chats) laani hai jo left side mai dikti hai
// apni chats kese find karenge => jis chat ke members[] mai mai hu(req.user) wo meri chats hai

const getMyChats = TryCatch(
    async(req , res , next) => {
        // agar populate nahi kara toh members ki id aayegi , but we need members avatar as well as name
        // agar members ko populate kara toh id ke jagah memeber ka actual document aayega (jo jo populate mai likha hoga i.e. name , avatar)
        const chats = await Chat.find({ members: req.user })
        .populate("members" , " name avatar")

        const transformedChats = chats.map(( {_id , name , members , groupChat} ) => {
            const otherMember = getOtherMember(members , req.user);

            return{
                _id,
                groupChat,  

                avatar: groupChat 
                ? members.slice(0,3).map(({avatar}) => avatar.url)
                : [otherMember.avatar.url] ,
                
                name: groupChat
                ? name
                : otherMember.name,

                members: members.reduce((prev , curr) => {
                    if(curr._id.toString() !== req.user.toString()){
                        prev.push(curr._id);
                    }
                    return prev;
                }, []),
            }
        })

        return res.status(200).json({   
            success: true,
            chats: transformedChats,
        })
    }
)

export { newGroupChat, getMyChats }