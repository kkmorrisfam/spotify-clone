import { User } from "../models/user.model.js";


export const getAllUsers = async(req, res, next) => {
    try {
        const currentUserId = req.auth.userId
        //filter out current user from findall (ne is not equal)
        const users = await User.find({ clerkId: {$ne: currentUserId}});
       
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
}