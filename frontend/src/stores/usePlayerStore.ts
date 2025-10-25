import { create } from 'zustand';
import type { Song } from "@/types";
import { Settings } from 'lucide-react';

interface PlayerStore { 
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    initializeQueue: (songs: Song[]) => void;  //void just manages state, no return value
    playAlbum: (songs: Song[], startIndex?: number)=> void;
    setCurrentSong: (song: Song | null)=> void;
    togglePlay: ()=> void;
    playNext: ()=> void;
    playPrevious: ()=> void;
}

export const usePlayerStore = create<PlayerStore>((set, get)=> ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    

    initializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
        })
    },

    playAlbum: (songs: Song[], startIndex = 0) => {
        if(songs.length === 0) return;

        const song = songs[startIndex];

        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true,
        })
    },

    setCurrentSong: (song: Song | null) => {
        if(!song) return;

        const songIndex = get().queue.findIndex(s=>s._id === song._id);
        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex !== -1 ? songIndex: get().currentIndex

        });
    },

    togglePlay: ()=> {
        const willStartPlaying = !get().isPlaying;  //get whatever it's not

        set({
            isPlaying: willStartPlaying,
        })
    },

    playNext: ()=> {
        const {currentIndex, queue} = get();
        const nextIndex = currentIndex + 1;
        
        // if there is a next song to play, then play it
        if(nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true,
            })
        } else {
            // no song next in the queue
            set({ isPlaying: false});
        }
    },

    playPrevious: ()=> {
        const { currentIndex, queue} = get();
        const previousIndex = currentIndex -1;

        if(previousIndex >= 0 ) {
            const previousSong = queue[previousIndex];
            set({
                currentSong: previousSong,
                currentIndex: previousIndex,
                isPlaying: true,
            })
        } else {
            set({ isPlaying: false});
        }
    },
}));
