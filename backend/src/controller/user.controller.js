import { User } from "../models/user.model.js";


export const getAllUsers = async(req, res, next) => {

    console.log("Inside GetAllUsers");
    try {
        // get current logged in user id
        const {userId } = req.auth();

        //filter out current user from find-all -$ne is not equal (to current user)
        // if you are testing with one user, then nothing will show, because it won't include 
        // current user.
        const users = await User.find({ clerkId: {$ne: userId} });
        
        // console.log("🔍 Users returned:", JSON.stringify(users, null, 2)); 

        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
}