import connectDB from "../../../utils/connect";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import User from "../../../models/userModel";

export const POST = async(request) => {
    try{
        await connectDB();
        const {username, email, password} = await request.json();

        const exists = await User.findOne({ $or: [{email}, {username}]});
        if(exists){
            return (
                NextResponse.json({message: 'Username or email already exists'}),
                {status: 500}
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({username, email, password: hashedPassword})
        return NextResponse.json({message: 'User registered'}, {status: 201});
        }

    catch(error){
        return NextResponse.json({message: 'Error occured while registring the user'}, {status: 500});
    }
    


}