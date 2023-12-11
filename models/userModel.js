import mongoose from "mongoose";

const {Schema} = mongoose


const userSchema = new Schema({
    username:{
        type:String,
        unique:[true, 'Must be unique'],
        required: [true, 'Must provide a username'],
    },
    email:{
        type:String,
        unique:[true, 'Must be unique'],
        required: [true, 'Must provide a email'],
    },
    password:{
        type:String,
        required: [true, 'Must provide a password'],
    },
},
{ timestamps: true },

);

//If the User collection does not exist create a new one.
const User =  mongoose.models.User || mongoose.model("User", userSchema);

export default User;