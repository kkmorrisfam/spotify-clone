import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        typeof: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    clerkId: {
        type: String,
        required: true,
        unique: true,
    
    },

   }, { timestamps: true}  //created At, updatedAt
);  

export const User = mongoose.model("User", userSchema);