import {Button, Heading} from "@chakra-ui/core";
import React from "react";
import Song from "./Song";


class SetOfSongs extends React.Component{
   
    render(){
        
        const {onPrevSet, onNextSet, isFirst, isLast} = this.props;
        return(
            <>
            {!isFirst ? 
            <Button onClick={onPrevSet}>
            previous
            </Button> : ""}
            {!isLast ? 
            <Button  onClick={onNextSet} visible={!isLast}>
            next
            </Button> : ""}
            <Heading>
            {this.props.name}
            </Heading>
            {this.props.songs.map( (song) => (
            <Song
                title = {song.title}
                author = {song.author}
                root = {song.root}
                tempo = {song.tempo}
                lyrics = {song.lyrics}
                />
            ))}
            </>
        )
    }
  }

  export default SetOfSongs;