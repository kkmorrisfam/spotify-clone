
// both type and interface allow you to define the shape of the data
// interfaces are extendable so you can extend the type
// or merge
export interface Song {
    _id: string;
    title: string;
    artist: string; 
    albumId: string | null;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    songs: Song[];
}