import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { User } from "../models/user.js";

// ---- new group chat  ----
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


// ---- get my chats  -----
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

                // memebers mai mujhse chhd kar baaki memebers aajaye
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

// ------- get my groups --------
// jis bhi chat ke members mai me hu and group chat true hai and creator bhi mai hu , then we saare mere groups hai
const getMyGroups = TryCatch(
    async(req , res , next) => {
        const chats = await Chat.find({
            members: req.user,
            groupChat: true,
            creator: req.user,
        }).populate("members" , "name avatar");
        

        const groups = chats.map(({ members , _id , groupChat , name }) => (
            {
                _id,
                groupChat,
                name,
                avatar: members.slice(0,3).map(({avatar}) => avatar.url), 
            }
        ));


        return res.status(200).json({
            success:true,
            groups,
        })
    }
)


// --------- add member to group ---------
// kis member ko add karna hai aur konse chat mai add karna hai , so we need members(userId) & chatId
const addMembers = TryCatch(
    async(req , res , next) => {
        const {chatId , members} = req.body;

        if(!members || members.length < 1) return next(new ErrorHandler("Please provide members" , 400));

        // find the chat on the basis of chatId
        const chat = await Chat.findById(chatId);

        // not chat found
        if(!chat) return next(new ErrorHandler("Chat not found" , 404));

        // chat group chat nahi hai
        if(!chat.groupChat) return next(new ErrorHandler("This is not a group chat" , 400));

        // us group ka creator mai nhi hu , toh member kese add karunga
        if(chat.creator.toString() != req.user.toString()) return next(new ErrorHandler("You are not allowed to add members" , 403));

        const allNewMembersPromise = members.map((i) => User.findById(i ,"name"));

        const allNewMembers = await Promise.all(allNewMembersPromise);

        const uniqueMembers = allNewMembers.filter((i) => !chat.members.includes(i._id.toString())).map((i) => i._id);

        chat.members.push(...uniqueMembers);

        if(chat.members.length > 100) return next(new ErrorHandler("Group members limit reached" , 400));

        await chat.save();

        const allUsersName = allNewMembers.map((i) => i.name).join(",");

        emitEvent(req , ALERT , chat.members , `${allNewMembers} has been added to the group ${chat.name}`);

        emitEvent(req , REFETCH_CHATS , chat.members);

        return res.status(200).json({
            success: true,
            message: "Members added successfully",
        })
    }
)


// -------- remove member from group --------
// kis user(userId) ko remove karna hai aur kis chat(chatId) se remove karna hai , so we need userId & chatid 
const removeMemeber = TryCatch(
    async(req , res , next) => {
        const {userId , chatId} = req.body;

        // find both user and chat on the basis of userId and chatId , we can do both task ek saath by using promise
        const [chat , userThatWillBeRemoved] = await Promise.all([
            Chat.findById(chatId),
            User.findById(userId , "name"),
        ]);

        if(!chat) return next(new ErrorHandler("Chat not found" , 404));

        if(!chat.groupChat) return next(new ErrorHandler("This is not a group chat" , 400));

        if(chat.creator.toString() !== req.user.toString()) return next(new ErrorHandler("You are not allowed to remove member" , 403));

        if(chat.members.length <= 3) return next(new ErrorHandler("Group must have at least 3 members"));

        chat.members = chat.members.filter((member) => member.toString() != userId.toString());

        await chat.save();

        emitEvent(req , ALERT , chat.members , `${userThatWillBeRemoved} has been removed from the group`);

        emitEvent(req , REFETCH_CHATS , chat.members);

        return res.status(200).json({
            success: true,
            message: "Member removed from group successfully",
        })
    }
)


export { newGroupChat, getMyChats, getMyGroups, addMembers, removeMemeber } 