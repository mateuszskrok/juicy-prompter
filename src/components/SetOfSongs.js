import {Box, Button, Grid, Heading, Accordion} from "@chakra-ui/core";
import React from "react";
import Song from "./Song";


class SetOfSongs extends React.Component{
   
    render(){
       
        const {onPrevSet, onNextSet, isFirst, isLast} = this.props;
        return(
            <>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <Box w="100%" h="10">
                    {!isFirst ? 
                    <Button onClick={onPrevSet} margin="auto">
                        previous
                    </Button> : ""}
                </Box>
                        
                <Box w="100%" h="10"  >
                    <Heading align="center">
                        {this.props.name}
                    </Heading>
                </Box>
                <Box w="100%" h="10" >
                    {!isLast ? 
                     <Button  onClick={onNextSet} margin="auto">
                    next
                    </Button> : ""}
                </Box>
            </Grid>
            <Accordion>
            {this.props.songs.map( (song) => (
                    <Song
                        title = {song.title}
                        author = {song.author}
                        root = {song.root}
                        tempo = {song.tempo}
                        lyrics = {song.lyrics}
                        />
                    ))}
            </Accordion>
            </>
        )
    }
  }

  export default SetOfSongs;