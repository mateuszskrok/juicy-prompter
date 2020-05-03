import axios from "axios";
import BASE_URL from "./config.js"
const GIGS_URL = (`${BASE_URL}/gigs`);
console.log(GIGS_URL);

const GigsAPI ={
    getAllGigs: async function(){
        const response = await axios.get(GIGS_URL);
        const gigs = response.data;
        return gigs;
    },
}

export default GigsAPI;