import React from "react";
import { 
    Box, Heading, Badge, IconButton, Divider, Text, useToast,
    AccordionHeader, AccordionIcon, AccordionItem, AccordionPanel, Button, ButtonGroup
} from "@chakra-ui/core";
import {BsFileText} from "react-icons/bs";
import {GiMusicalScore}from "react-icons/gi";
import {MdSpeakerNotes} from "react-icons/md";
import SongLyrics from "./SongLyrics";
import TapTempoButton from "./TapTempoButton";

class Song extends React.Component{

    state={
        areLyricsVisible: true,
        areNotesVisible: false,
        areChordSVisible: false
    };

    handleToggleNotesVisibility = (event) => {
        this.setState((prevState) => {
            return{
                areNotesVisible: !prevState.areNotesVisible
            }
        })
    }
   
    handleToggleLyricsVisibility = (event) => {
        this.setState((prevState) => {
            return{
                areLyricsVisible: !prevState.areLyricsVisible
            }
        })
    }

    handleToggleChordsVisibility = (event) => {
        this.setState((prevState) => {
            return{
                areChordsVisible: !prevState.areChordsVisible
            }
        })
    }
   
    render(){
        const {id, title, author, tempo, root, lyrics, notes, chords, onMoveSongToNextSet, onRejectSong, isSetTrash, isSetLast} = this.props;
        const {areLyricsVisible, areNotesVisible, areChordsVisible} = this.state;
        
        let bg = "#333";
        if (title.includes("zielone")) {
            bg = "#48bb78"
        }
        return(
            <AccordionItem>
                <AccordionHeader _expanded={{ bg: bg, color: "white" }}>
                    <Box flex="1" textAlign="left">
                        <Heading as="h3" size="lg">
                            {title}
                        </Heading>
                        <Heading as="h6" size="sm">
                            {author}
                        </Heading>
                    </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel spacing={5} width="100%">
                    <Badge rounded="full" px="2" variantColor="gray">
                        {tempo} BPM
                    </Badge>
                    <Badge rounded="full" px="2" variantColor="gray">
                        {root}
                    </Badge>
                    <Divider orientation="vertical"/>
                    <ButtonGroup spacing={3}>
                        {isSetTrash ? 
                            <Button>
                                Przywróć
                            </Button>
                        :
                            <IconButton onClick={() => onRejectSong(id)} icon="delete"/>
                        }
                        {!isSetLast ?
                            <IconButton onClick={() => onMoveSongToNextSet(id)} icon="arrow-forward"/> 
                        : 
                            ""     
                        }
                        <Button onClick={this.handleToggleLyricsVisibility}>
                            <Box as={BsFileText}/>
                        </Button>
                        <Button onClick={this.handleToggleNotesVisibility}> 
                            <Box as={MdSpeakerNotes}/>
                        </Button>
                        <Button onClick={this.handleToggleChordsVisibility}>
                            <Box as={GiMusicalScore}/>
                        </Button>
                        <TapTempoButton tempo={tempo}/>
                    </ButtonGroup>
                    
                    {areNotesVisible ?
                    
                    <Box>
                        <Text as="i">{notes}</Text> 
                    </Box>
                    : ""}
                    {areChordsVisible ? 
                    <Box>
                        <Text as="kbd">{chords}</Text>
                    </Box>
                    : ""}
                    
                    <SongLyrics title={title} author={author} defaultLyrics={lyrics} areVisible={areLyricsVisible}/>
                    
                 </AccordionPanel>
                </AccordionItem>
        )
    }
}
export default Song;