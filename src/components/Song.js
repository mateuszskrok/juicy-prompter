import React from "react";
import { 
    Box, Heading, Badge, IconButton, Divider, Text, 
    AccordionHeader, AccordionIcon, AccordionItem, AccordionPanel, Button, ButtonGroup,
} from "@chakra-ui/core";
import {BsFileText} from "react-icons/bs";
import {MdSpeakerNotes} from "react-icons/md";
import SongLyrics from "./SongLyrics";
import TapTempoButton from "./TapTempoButton";
import SongsAPI from "../api/SongsAPI";

class Song extends React.Component{

    state={
        areLyricsVisible: true,
        areNotesVisible: false,
        areChordsVisible: false,
        error: null,
        editMode: false,
        useSharp: true,
        lyrics: this.props.lyrics,
        transpose: 0
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

    handleLyricsEdit = () => {
        this.setState({
            editMode:true
        });
    }
    handleLyricsChange = (event) => {
        this.setState({
            lyrics: event.target.value
        });
    }
    handleLyricsSave = (state) => {
        console.log('saving lyrics')
        const {id, title, author, tempo, root, chords, notes} = this.props;

        this.setState({
            editMode:false,
        });
        const song = {
            id: id,
            title: title,
            author: author,
            tempo: tempo,
            root: root,
            chords: chords,
            notes: notes,
            lyrics: this.state.lyrics
        }
        SongsAPI.replaceSong(id,song)
    }
   
    render(){
        const {id, title, author, tempo, root, chords, notes, onMoveSongToNextSet, onRejectSong, isSetTrash, isSetLast} = this.props;
        const {lyrics, transpose, useSharp, areLyricsVisible, areNotesVisible, areChordsVisible, editMode} = this.state;
        
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
                        <TapTempoButton tempo={tempo}/>
                    </ButtonGroup>
                    
                    {areNotesVisible ?
                    
                    <Box>
                        <Text as="i">{notes}</Text> 
                    </Box>
                    : ""}                   
                    <SongLyrics 
                        title={title} 
                        author={author} 
                        lyrics={lyrics} 
                        areVisible={areLyricsVisible}
                        editMode={editMode}
                        chords={chords}
                        onEdit={this.handleLyricsEdit}
                        onSave={this.handleLyricsSave}
                        onChange={this.handleLyricsChange}
                        onToggleChords={this.handleToggleChordsVisibility}
                        semitones={transpose} 
                        useSharp={useSharp}
                        areChordsVisible={areChordsVisible}
                        onMinus={this.handleTransposeDown} 
                        onPlus={this.handleTransposeUp}
                        onReset={this.handleTransposeReset}
                        onToggleMode={this.handleToggleChordsMode}
                    />
                    
                 </AccordionPanel>
                </AccordionItem>
        )
    }
}
export default Song;