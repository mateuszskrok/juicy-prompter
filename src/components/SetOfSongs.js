import {Box, Button, Grid, Heading, Accordion} from "@chakra-ui/core";
import React from "react";
import Song from "./Song";
import {notes, chords} from "../data/songs.json"


class SetOfSongs extends React.Component{
   
    render(){
       
        const {onPrevSet, onNextSet, onSetDeselect, onMoveSongToNextSet, onRejectSong, isTrash, isFirst, isLast} = this.props;
        return(
            <>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <Box w="100%" h="10">
                    {!isFirst ? 
                    <Button onClick={onPrevSet} w="100%">
                        poprzedni
                    </Button> : ""}
                </Box>
                        
                <Box w="100%" h="10" alignContent="center" >
                    <Heading align="center">
                        {this.props.name}
                    </Heading>
                </Box>
                <Box w="100%" h="10" >
                    {!isLast ? 
                     <Button  onClick={onNextSet} w="100%">
                        następny
                    </Button> : ""}
                </Box>
            </Grid>
            <Accordion>
            {this.props.songs.map( (song) => (
                    <Song
                        id = {song.id}
                        title = {song.title}
                        author = {song.author}
                        root = {song.root}
                        tempo = {song.tempo}
                        lyrics = {song.lyrics}
                        notes = {notes[song.id].body}
                        chords = {chords[song.id].body}
                        isSetLast = {isLast}
                        isSetTrash = {isTrash}
                        onMoveSongToNextSet = {() => onMoveSongToNextSet(song.id)}
                        onRejectSong = {() => onRejectSong(song.id)}
                        />
                    ))}
            </Accordion>
            <Button w ="100%" onClick={onSetDeselect}>
                MENU
            </Button>
            </>
        )
    }
  }

  export default SetOfSongs;