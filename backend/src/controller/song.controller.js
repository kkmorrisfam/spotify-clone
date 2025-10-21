import { Song } from "../models/song.model.js"

export const getAllSongs = async(req, res, next) => {
    try {
        // -1 is descending
        const songs = await Song.find({createdAt: -1})
        res.json(songs)
        
    } catch (error) {
        next(error)
    }
}

export const getFeaturedSongs = async(req, res, next) => {
    try {
        // get 6 random songs using mongodb's aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample: {size:6}
            },
            {
               $project: {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    albumId:1,
                    audioUrl:1
                }, 
            },
        ]);
        res.json(songs);
    } catch (error) {
        next(error);   
    }
};

export const getMadeForYouSongs = async(req, res, next) => {
    try {
        // get 4 random songs using mongodb's aggregation pipeline
        // this is where you could create another algorithm based on user
        const songs = await Song.aggregate([
            {
                $sample: {size:4}
            },
            {
               $project: {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    albumId:1,
                    audioUrl:1
                }, 
            },
        ]);
        res.json(songs);
    } catch (error) {
        next(error);
    }
}
export const getTrendingSongs = async(req, res, next) => {
    try {
        // get 4 random songs using mongodb's aggregation pipeline
        // this is where you could create another algorithm based on user
        const songs = await Song.aggregate([
            {
                $sample: {size:4}
            },
            {
               $project: {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    albumId:1,
                    audioUrl:1
                }, 
            },
        ]);
        res.json(songs);
    } catch (error) {
        next(error);
    }
}