import { hash } from "bcrypt";
import mongoose , {Schema , model} from "mongoose";

const schema =new Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false, // jab bhi mongodb mese data access karenge , password nahi aana chaaiye
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
} , {
    timestamps:true
});


// yaha par password bhi hai , hum chahate hai ki database mai entry save hone se phele hi password hash ho jaaye
// so we will use presave method on schema
// but agar user kuch change karta hai(modify karta hai) toh wo dobaara save hoga and password wapas se hash hoga , apn ko esa nahi hone dena hai
schema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await hash(this.password,10);
})

export const User = mongoose.models.User || model("User",schema);