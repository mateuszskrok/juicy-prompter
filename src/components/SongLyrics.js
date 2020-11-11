import React from "react";
import { 
    Box, Button, 
        }
    from "@chakra-ui/core";
// import config from "../config.js";
// import fetchJsonp from "fetch-jsonp";
class SongLyrics extends React.Component{

 
    // loadText(){
    //     const title = this.props.title
    //     const author = this.props.author
    //     const apikey = config.MUSIXMATCH_APIKEY
    //     fetchJsonp("https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track="+title+"&q_artist="+author+"&apikey="+apikey)
    //         .then(response => { return response.json();})
    //         .then(responseData => {console.log(responseData); return responseData;})
    //         .then(
    //         (result) => {
    //             if (result.message.header.status_code === 200){
    //                 this.setState({
    //                     isLoaded: true,
    //                     onlineLyrics: result.message.body.lyrics.lyrics_body
    //                   });
    //             }
    //             else {
    //                 this.setState({
    //                     isLoaded: true,
    //                     onlineLyrics: null
    //                   });
    //             }
    //         },
    //         (error) => {
    //           this.setState({
    //             isLoaded: true,
    //             error,
    //             lyrics: null
    //           });
    //         }
    //       )
    // }

    // componentDidMount() {
    //     this.loadText();
    // }
    render(){
        const {lyrics, areVisible, editMode, onEdit, onChange, onSave} = this.props;

        return(
            areVisible ?
            <Box>
                {editMode ?
                <>
                <textarea
                    width="100%"
                    onChange={onChange}
                    defaultValue={lyrics}>
                 </textarea>
                <Button onClick={onSave}>Zapisz</Button>
                </>
                :
                <>
                <pre style={{fontFamily: "Roboto"}}>
                    {lyrics}
                </pre>
                <Button onClick={onEdit}>Edytuj</Button></>
                }
                
            </Box> :
            ""
        ) 
    }
}

export default SongLyrics;