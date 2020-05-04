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
import ChordsAPI from "../api/ChordsAPI";
import NotesAPI from "../api/NotesAPI";

function Transpose(props){
    
    console.log(props.chords)
    let splittedChords = props.chords.toString().split(" ");
    const transposeTable = [
        {key: "c", value: 0.5},
        {key: "cis", value: 1.5},
        {key: "des", value: 1.5},
        {key: "d", value: 2.5},
        {key: "dis", value: 3.5},
        {key: "es", value: 3.5},
        {key: "e", value: 4.5},
        {key: "f", value: 5.5}, 
        {key: "fis", value: 6.5},
        {key: "ges", value: 6.5},
        {key: "g", value: 7.5},
        {key: "gis", value:  8.5},
        {key: "as", value: 8.5},
        {key: "a", value:  9.5},
        {key: "ais",value:  10.5},
        {key: "b", value: 10.5},
        {key: "h", value: 11.5},

        {key: "C", value: 0},
        {key: "Cis", value: 1},
        {key: "Des", value: 1},
        {key: "D", value: 2},
        {key: "Dis", value: 3},
        {key: "Es", value: 3},
        {key: "E", value: 4},
        {key: "F", value: 5}, 
        {key: "Fis", value: 6},
        {key: "Ges", value: 6},
        {key: "G", value: 7},
        {key: "Gis", value:  8},
        {key: "As", value: 8},
        {key: "A", value:  9},
        {key: "Ais",value:  10},
        {key: "B", value: 10},
        {key: "H", value: 11} 
    ]
    const decodeTable = [
        {key: "c", value: 0.5},
        {key: "cis", value: 1.5},
        {key: "d", value: 2.5},
        {key: "dis", value: 3.5},
        {key: "e", value: 4.5},
        {key: "f", value: 5.5}, 
        {key: "fis", value: 6.5},
        {key: "g", value: 7.5},
        {key: "gis", value:  8.5},
        {key: "a", value:  9.5},
        {key: "ais",value:  10.5},
        {key: "h", value: 11.5},

        {key: "C", value: 0},
        {key: "Cis", value: 1},
        {key: "D", value: 2},
        {key: "Dis", value: 3},
        {key: "E", value: 4},
        {key: "F", value: 5}, 
        {key: "Fis", value: 6},
        {key: "G", value: 7},
        {key: "Gis", value:  8},
        {key: "A", value:  9},
        {key: "Ais",value:  10},
        {key: "H", value: 11} 
    ]
    console.log(splittedChords)
    const transposedChordIndexes = splittedChords.map(
        chord => (transposeTable.find(a => a.key===chord).value + props.semitones) % 12
    )
    const transposedChords = transposedChordIndexes.map(
     index => decodeTable.find(a => a.value===index).key + " "
    )
      
    return transposedChords;
}

class Song extends React.Component{

    state={
        notes: {},
        chords: {},
        areLyricsVisible: true,
        areNotesVisible: false,
        areChordSVisible: false,
        error: null,
        transpose:0
    };

    componentDidMount(){
      this.getChords(this.props.id)
      this.getNotes(this.props.id)
    }
    getChords(songID){
        ChordsAPI.getChords(songID).then(
            (chords) => this.setState({chords})
        ).catch(
            (error) => this.setState({error})   
        )
    }

    getNotes(songID){
        NotesAPI.getNotes(songID).then(
            (notes) => this.setState({notes})
        ).catch(
            (error) => this.setState({error})   
        )
    }

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

    handleToggleChordsVisibility = (event) => {
        this.setState((prevState) => {
            return{
                areChordsVisible: !prevState.areChordsVisible
            }
        })
    }
   
    render(){
        const {id, title, author, tempo, root, lyrics, onMoveSongToNextSet, onRejectSong, isSetTrash, isSetLast} = this.props;
        const {chords, notes, areLyricsVisible, areNotesVisible, areChordsVisible} = this.state;
        
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
                        <Button onClick={this.handleTransposeDown}>
                            -
                        </Button>

                        <Button onDoubleClick={this.handleTransposeReset}>TRANSPOSE: {this.state.transpose} </Button>
                        
                        <Button onClick={this.handleTransposeUp}>
                            +
                        </Button>
                    </ButtonGroup>
                    
                    {areNotesVisible ?
                    
                    <Box>
                        <Text as="i">{notes}</Text> 
                    </Box>
                    : ""}
                    {areChordsVisible ? 
                    <Box>
                        <Text as="kbd"><Transpose chords={chords} semitones={this.state.transpose}></Transpose></Text>
                    </Box>
                    : ""}
                    
                    <SongLyrics title={title} author={author} defaultLyrics={lyrics} areVisible={areLyricsVisible}/>
                    
                 </AccordionPanel>
                </AccordionItem>
        )
    }
}
export default Song;