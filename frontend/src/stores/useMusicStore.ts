import { axiosInstance } from '@/lib/axios';
import type { Album, Song } from '@/types';
import { create } from 'zustand';

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];

    // just updating state, not returning a value <void>
    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;  
}


export const useMusicStore = create<MusicStore>((set ) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    featuredSongs: [],
    madeForYouSongs: [],
    trendingSongs: [],

    fetchAlbums: async () => {
       set({ isLoading: true, error: null });
       try {
        const response = await axiosInstance.get("/albums");
        set({albums: response.data});
       } catch (error:any) {
        set({error: error.response.data.message});
       } finally {
        set({isLoading: false});
       }
    },

    // pass the id to get the album, backend gets album by id
    fetchAlbumById: async(id: string) => {
        set({isLoading: true, error: null})
        // console.log("Inside fetchAlbumById");
        try {
            // console.log("Inside fetchAlbumById try block")
            const response = await axiosInstance.get(`/albums/${id}`);
            // console.log("Inside fetchAlbumById try block after get")
            // console.log("after response object",response);
            // console.log("useMusicStore/response.data: ", response.data);
            set({ currentAlbum: response.data });
            
        } catch (error:any) {
            set({error: error.response.data.message });
        } finally {
            set({ isLoading: false});
        }
    }
}));
