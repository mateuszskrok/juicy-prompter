import axios from "axios";
import BASE_URL from "./config.js";
const CHORDS_URL = (`${BASE_URL}/chords`);

const ChordsAPI = {
    getChords: async function(songId){
        const response = await axios.get(`${CHORDS_URL}/${songId}`) 
        const chords = response.data.body
        return chords;
    }
}

export default ChordsAPI;