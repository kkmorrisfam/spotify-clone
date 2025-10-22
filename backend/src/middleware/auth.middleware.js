import { clerkClient } from "@clerk/express";

// console.log("Auth Object:", req.auth)

export const protectRoute = async (req, res, next) => {
    console.log("Auth Object:", req.auth);
    console.log("Inside protectRoute");

    if (!req.auth.userId){
        return res.status(401).json({message: "Unauthorized - must be logged in"});
        
    }
    
    next();
}

export const requireAdmin = async(req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        console.log("Fetched Clerk user: ", currentUser);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress

        if(!isAdmin) {
            return res.status(403).json({ message: "Unauthorized - you must be an admin"});
            
        }

        next();

    } catch (error) {
        // return res.status(500).json({message: "Internal server error", error});
        next(error);
    }
};