import React from "react";
import ReactHtmlParser from 'react-html-parser';
import {Transpose, TransposeWidget} from "./Transpose";
import { 
    Box, Button, Textarea
        }
    from "@chakra-ui/core";
import {GiMusicalScore}from "react-icons/gi";
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
        const {
            lyrics, 
            chords, 
            areVisible, 
            editMode, 
            onEdit, 
            onChange, 
            onSave, 
            semitones, 
            useSharp, 
            onToggleChords, 
            areChordsVisible,
            onMinus,
            onPlus,
            onReset,
            onToggleMode
        } = this.props;
        var insertChords= function(p,c){return p.replace(/%s/,`<span class="chords">${c}</span >`)};
        const onlyLyrics = lyrics.replace(/%s/g,"")
        
        return(
            areVisible ?
            
            <Box>
                  <Button onClick={onToggleChords}>
                            <Box as={GiMusicalScore}/>
                    </Button>
                {editMode ?
                <>
                <Box width="100%"> 
                <Textarea className="textEditor"
                    onChange={onChange}
                    defaultValue={lyrics}>
                 </Textarea>
                </Box>
                
                <Button onClick={onSave}>Zapisz</Button>
                </>
                :
                <>
                {areChordsVisible?
                    <>                     
                        <TransposeWidget 
                            transpose={semitones} 
                            onMinus={onMinus}
                            onPlus={onPlus}
                            onReset={onReset}
                            onToggleMode={onToggleMode}/>
                    <p className="chordsLyrics">
                        {ReactHtmlParser(Transpose(chords, useSharp, semitones).reduce(insertChords, lyrics).replace(/%s/g,""))}
                    </p>
                    </> 
                    :
                    <p className="lyrics">
                        {ReactHtmlParser(onlyLyrics)}
                    </p>
                }
                
                <Button onClick={onEdit}>Edytuj</Button></>
                }
                
            </Box> :
            ""
        ) 
    }
}

export default SongLyrics;