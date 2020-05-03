import axios from "axios";
import BASE_URL from "./config.js";
const SETS_URL = (`${BASE_URL}/sets`);
const GIGS_URL = (`${BASE_URL}/gigs`);

const SetsAPI ={
    getAllSets: async function(){
        const response = await axios.get(SETS_URL);
        const sets = response.data;
        return sets;
    },
    getAllSetsFromGig: async function(gigId){
        const gigsResponse = await axios.get(GIGS_URL);
        const gigs = gigsResponse.data;
    
        const currentGig = gigs.find((gig) => gig.id === gigId)
        const response = await axios.get(SETS_URL);
        const sets = response.data;
        
        const setsFromGig = sets.filter((set) => currentGig.id === set.gigId)
        console.log(setsFromGig)
        return setsFromGig;
    },
    getSet: async function(setId){
        const response = await axios.get(`${SETS_URL}/${setId}`);
        const set = response.data;
        return set;
    },
    addSet: async function (setToAdd){
        const response = await axios.post(SETS_URL, setToAdd);
        const addedSet = response.data;
        return addedSet;
        },
    replaceSet: async function (idToReplace, setToReplace){
        const response = await axios.put(`${SETS_URL}/${idToReplace}`, setToReplace);
        const replacedSet = response.data;
        return replacedSet;
        },

    removeSet: async function (idToRemove){
        await axios.delete(`${SETS_URL}/${idToRemove}`);
    }
}

export default SetsAPI;