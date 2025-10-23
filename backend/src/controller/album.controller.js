import { Album } from "../models/album.model.js";
import mongoose from "mongoose";

export const getAllAlbums = async  (req, res, next) => {
    try {
        const albums= await Album.find();
        res.status(200).json(albums)
    } catch (error) {
        next(error);
    }
}

export const getAlbumById = async (req, res, next) => {
    try {
        console.log("backend params in getAlbumById", req.params);
        const { albumId } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(albumId)) {
            console.log("Invalid ObjectId:", albumId);
            return res.status(400).json({ message: "Invalid album ID" });
        }



        const album = await Album.findById(albumId).populate("songs");
        console.log("getAlbumById- album: ");
        if (!album) {
            return res.status(404).json({ message: "Album not found"});

        }

    res.status(200).json(album);
    } catch (error) {
        next(error);
    }
}