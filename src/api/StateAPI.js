import axios from "axios";
import BASE_URL from "./config";


const StateAPI = {
    getState: async function(){
        const response = await axios.get(`${BASE_URL}/state`)
        const {currentGig, activeSetId, isSetSelected, sets, songs} = response.data
        return {currentGig, activeSetId, isSetSelected, sets, songs}
    },
    updateState: async function(currentGig, activeSetId, isSetSelected, sets, songs){
        const response = await axios.put(`${BASE_URL}/state`,{currentGig, activeSetId, isSetSelected, sets, songs})
        return response.data;
    }
}

export default StateAPI;