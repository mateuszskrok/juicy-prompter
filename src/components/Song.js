import React from "react";
import { 
    Box, Heading, Badge, IconButton, Divider,
    AccordionHeader, AccordionIcon, AccordionItem, AccordionPanel, Button, ButtonGroup
} from "@chakra-ui/core";
import SongLyrics from "./SongLyrics";

class Song extends React.Component{
    constructor(props){
        super(props);
       
        this.handleToggleLyricsVisibility.bind(this)
    }

    state={
        areLyricsVisible:true,
        tempo:null,
        tapTempoTimestamp: null
    };

    handleTapTempo = (event) => {
        this.setState((prevState) => {
            const tapTempoTimestamp = new Date().getTime();
            const timeDifferenceBetweenTapsInSeconds = (tapTempoTimestamp - prevState.tapTempoTimestamp)/1000;
            var tempo = 60 / timeDifferenceBetweenTapsInSeconds; 
            if (timeDifferenceBetweenTapsInSeconds > 2) {
                tempo = prevState.tempo;
            }
            else {
                const actualTempo = tempo; 
                var avgTempo = null;
                if (prevState.tempo){
                    avgTempo = (2*prevState.tempo + actualTempo) / 3; //smoothen tempo changes
                    tempo = Math.round(avgTempo);
                }
                else{
                    tempo=Math.round(actualTempo);
                }
            }
            return{
                tapTempoTimestamp: tapTempoTimestamp,
                timeDifferenceBetweenTapsInSeconds: timeDifferenceBetweenTapsInSeconds,
                tempo: tempo
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
   
    render(){
        const {id, title, author, tempo, root, lyrics, onMoveSongToNextSet, onRejectSong, isSetTrash, isSetLast} = this.props;
        const {areLyricsVisible, timeDifferenceBetweenTapsInSeconds} = this.state;
        let bg = "tomato";
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
                            {areLyricsVisible ? "ukryj " : "pokaż " } tekst
                        </Button>
                        <button onMouseDown={this.handleTapTempo} 
                                class="blink"  
                                style={{
                                    animation: `blink ${timeDifferenceBetweenTapsInSeconds}s infinite`, 
                                    webkitAnimation: `blink ${timeDifferenceBetweenTapsInSeconds}s infinite`
                                    }}>
                                    {this.state.tempo ? this.state.tempo : "TAP"}
                        </button>
                    </ButtonGroup>
                    <SongLyrics title={title} author={author} defaultLyrics={lyrics} areVisible={areLyricsVisible}/>
                    
                 </AccordionPanel>
                </AccordionItem>
        )
    }
}
export default Song;