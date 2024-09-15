import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js"
import { cookieOptions, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";


// ----- new user controller -------
// create a new user(register a new user) and save it to database and also save token in cookie
// here at the time of registration we are also accessing a file for avatar , and to access file we have to use multer middleware
// yha par password bhi hai and hum chahate hai ki database mai entery save hone se phele password hash ho jaaye se we will use presave method on schema
const newUser = TryCatch(
    async (req, res) => {
        const {name,username,password,bio} = req.body;
        const avatar = {
            public_id:"cloudinary_id1",
            url:"cloudinary_url1"
        }
        console.log(req.body);
    
        const user = await User.create({
            name,
            username,
            password,
            bio,
            avatar
        })
    
        sendToken(res, user , 201 , "User created & registered successfully");
    }
)


// ------- login controller ------ 
// request ki body mese username & password fetch karo
// database mai check karo ki user exits karta hai kya , find user by req ki body wala username
// same for password ki jo password req body mai se aaya hai wo whi password database mai hai ki nhi
// save token in cookie
// next wala middleware => errorMiddleware hai
const login = TryCatch(
    async (req , res , next) => {
        const {username , password} = req.body;
    
        const user = await User.findOne({username}).select("+password");
    
        if(!user) return next(new ErrorHandler("Invalid username or user is not registered" , 404));
    
        const isPasswordMatch = await compare(password , user.password);
    
        if(!isPasswordMatch) return next(new ErrorHandler("password is incorrect",404));
    
        sendToken(res , user , 200 , `Welcome back ${user.name}`);
    }
)


// ------ get my profile route ------
// sabse phele user login hona chaiye , iske liye isAuthenticated middleware ka use karenge , ye middleware -> token ko verify kaerga , 
const getMyProfile = TryCatch(
    async (req , res) => {
        const user = await User.findById(req.user);
    
        res.status(200).json({
            success: true,
            message:"check getmyprofile route",
            user,
        })
    }
)


// ------ logout controller ----------
// jab user login ya register hota hai toh uko token milta hai
// logout ke time token ko clear kardenge ya cookie ko empty set kardenge
const logout = TryCatch(
    async (req , res) => {
        return res.status(200)
        .cookie("chatify-token","", {...cookieOptions , maxAge:0})
        .json({
            success:true,
            message:"logged out successfully",
        })
    }
)


// ------- search user controller -----
// yaha query lagegi , now what is query => localhost:port/user/search?name=chirag  
// ---?name=chirag(1 parameter) , ?name=chirag&age=20 (2 parameter)
// so we can access the name by using query
// mujhse wo user search karne hai jo mere friends nhi hai
const searchUser = TryCatch(
    async(req , res) => {
        const { name = "" } = req.query;

        // apni saari chats find karo => jo group chat na ho and chat ke members me  mai hu
        const myChats = await Chat.find({ groupChat: false , members: req.user});

        /*
            ab apni chat mai(myChats) , khud ko chhod ke (req.user) baaki members apni chat mai honge
            isse khud ko chhod ke baaki saari members ki id mil jayegi
            all users from my chat means : friends or people i have chatted with
            const allUsersFromMyChats = myChats.map((chat) => chat.members).flat(); OR
            flat karne se saare members ki id ek array mai aajayegi
        */
        const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

        // ab jo user apn ko search karne hai wo apni chat mese koi nahi hona chaiye
        // wo saari id jo , par  allUsersFromMyChats iko chhod kar
        const allUsersExceptMeAndFriends = await User.find({
            _id:{ $nin: allUsersFromMyChats} , 

            // ab frontend mai jese koi name type kara wese user search hona chaiye
            // so here we will use "regex"
            // regex is a mongodb operator , which is used to find pattern in the given entity , here i means case insensitive
            name: { $regex: name , $options: "i" },
        });

        const users = allUsersExceptMeAndFriends.map(({_id , name , avatar}) => (
            { 
                _id,
                name,
                avatar : avatar.url,
            }
        ));

        return res.status(200).json({
            success:true,
            users,
        })
    }
)


export {
    login , 
    newUser , 
    getMyProfile , 
    logout,
    searchUser
}