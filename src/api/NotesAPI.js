import axios from "axios";
import BASE_URL from "./config.js";
const NOTES_URL = (`${BASE_URL}/notes`);

const NotesAPI = {
    getNotes: async function(songId){
        const response = await axios.get(`${NOTES_URL}/${songId}`) 
        const notes = response.data.body
        return notes;
    }
}

export default NotesAPI;