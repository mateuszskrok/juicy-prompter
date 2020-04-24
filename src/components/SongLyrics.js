import React from "react";
import { 
    Box, 
        }
    from "@chakra-ui/core";
import config from "../config.js";
import fetchJsonp from "fetch-jsonp";
class SongLyrics extends React.Component{
    state = {
        lyrics: null
    }
    
    loadText(){
        const title = this.props.title
        const author = this.props.author
        const apikey = config.MUSIXMATCH_APIKEY
        console.log(apikey)
        fetchJsonp("https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track="+
                    title+"&q_artist="+author+"&apikey="+apikey+"")
            .then(response => { return response.json();})
            .then(responseData => {console.log(responseData); return responseData;})
            .then(
            (result) => {
                if (result.message.header.status_code === 200){
                    this.setState({
                        isLoaded: true,
                        lyrics: result.message.body.lyrics.lyrics_body
                      });
                }
                else {
                    this.setState({
                        isLoaded: true,
                        lyrics: null
                      });
                }
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error,
                lyrics: null
              });
            }
          )
    }

    componentDidMount() {
        this.loadText();
    }
    render(){
        const {lyrics} = this.props;
        return(
            <Box>
                <pre style={{fontFamily: "Roboto"}}>
                    {this.state.lyrics ? this.state.lyrics : lyrics}
                </pre>
            </Box>
        ) 
    }
}

export default SongLyrics;