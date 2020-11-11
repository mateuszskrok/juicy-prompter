import React from "react";
import { 
    Box, Heading, Badge, IconButton, Divider, Text, 
    AccordionHeader, AccordionIcon, AccordionItem, AccordionPanel, Button, ButtonGroup,
} from "@chakra-ui/core";
import {BsFileText, BsHash} from "react-icons/bs";
import {GiMusicalScore}from "react-icons/gi";
import {MdSpeakerNotes} from "react-icons/md";
import SongLyrics from "./SongLyrics";
import TapTempoButton from "./TapTempoButton";
import {Transpose, TransposeWidget} from "./Transpose";

class Song extends React.Component{

    state={
        areLyricsVisible: true,
        areNotesVisible: false,
        areChordSVisible: false,
        error: null,
        useSharp: true,
        transpose:0
    };

    handleTransposeDown = () => {
        this.setState((prevState) => {
            return{
                transpose: prevState.transpose-1}
        })
    }

    handleTransposeUp= () => {
        this.setState((prevState) => {
            return{
                transpose: prevState.transpose+1}
        })
    }
    
    handleTransposeReset = () => {
        this.setState({transpose:0})
    }

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

    handleToggleChordsMode = (event) => {
        this.setState((prevState) => {
            return{
                useSharp: !prevState.useSharp
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
        const {id, title, author, tempo, root, lyrics, chords, notes, onMoveSongToNextSet, onRejectSong, isSetTrash, isSetLast} = this.props;
        const {transpose, useSharp, areLyricsVisible, areNotesVisible, areChordsVisible} = this.state;
        
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
                        <Badge rounded="full" px="2" variantColor="gray">
                        {tempo} BPM
                        </Badge>
                        <Badge rounded="full" px="2" variantColor="gray">
                        {root}
                        </Badge>
                    </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel spacing={5} width="100%">
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
                        <Button onClick={this.handleToggleChordsMode}>
                            <Box as={BsHash}/>
                        </Button>
                        <TapTempoButton tempo={tempo}/>
                        <TransposeWidget 
                            transpose={transpose} 
                            onMinus={this.handleTransposeDown} 
                            onPlus={this.handleTransposeUp}
                            onReset={this.handleTransposeReset}/>
                        
                    </ButtonGroup>
                    
                    {areNotesVisible ?
                    
                    <Box>
                        <Text as="i">{notes}</Text> 
                    </Box>
                    : ""}
                    {areChordsVisible ? 
                    <Box>
                        <Text as="kbd">
                            <Transpose 
                                chords={chords} 
                                semitones={transpose} 
                                useSharp={useSharp}>
                            </Transpose></Text>
                    </Box>
                    : ""}
                    
                    <SongLyrics 
                        title={title} 
                        author={author} 
                        defaultLyrics={lyrics} 
                        areVisible={areLyricsVisible}
                    />
                    
                 </AccordionPanel>
                </AccordionItem>
        )
    }
}
export default Song;