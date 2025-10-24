import { User } from "../models/user.model.js";


export const getAllUsers = async(req, res, next) => {

    console.log("Inside GetAllUsers");
    try {
        // const currentUserId = req.auth.userId;
        // const { currentUserId } = req.auth();
        // console.log("currentUserId: ", currentUserId);
        const {userId } = req.auth();
 
 
        console.log("currentUserId: ", userId);
        console.log("***Type of userId:", typeof userId);
        const sample = await User.findOne();
        console.log("Type of sample.clerkId:", typeof sample.clerkId);

        console.log("Debugging query:", { $ne: userId });

        const all = await User.find();
        console.log("All users in DB:", all.map(u => u.clerkId));

        const users = await User.find({ clerkId: { $ne: userId.toString() } });
        console.log("Filtered users:", users);






        //filter out current user from findall (ne is not equal)
        // const users = await User.find({ clerkId: {$ne: userId} });
        console.log("after users returned in backend.")
        console.log("🔍 Users returned:", JSON.stringify(users, null, 2)); 

        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
}