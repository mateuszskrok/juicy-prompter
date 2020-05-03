import axios from "axios";
import BASE_URL from "./config"
const SETS_URL = (`${BASE_URL}/sets`);
const SONGS_URL = (`${BASE_URL}/songs`);

const SongsAPI ={
    getAllSongs: async function(){
        const response = await axios.get(SONGS_URL);
        const songs = response.data;
        return songs;
    },
    getAllSongsFromSet: async function(setId){
        const setsResponse = await axios.get(SETS_URL);
        const sets = setsResponse.data;

        const currentSet = sets.find((set) => set.id === setId)
        const response = await axios.get(SONGS_URL);
        const songs = response.data;

        const songsFromSet = songs.filter((song) => currentSet.songIds.includes(song.id))
        console.log(songsFromSet)
        return songsFromSet;
    }
}

export default SongsAPI;