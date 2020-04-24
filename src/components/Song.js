import React from "react";
import { 
    Box, Heading, Badge, IconButton, Divider,
    AccordionHeader, AccordionIcon, AccordionItem, AccordionPanel, Button, ButtonGroup
} from "@chakra-ui/core";
import SongLyrics from "./SongLyrics";

class Song extends React.Component{
   
    render(){
        const {id, title, author, tempo, root, lyrics, onMoveSongToNextSet, onRejectSong, isSetTrash, isSetLast} = this.props;
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
                    </ButtonGroup>
                    <SongLyrics title={title} author={author} lyrics={lyrics}/>
                    
                 </AccordionPanel>
                </AccordionItem>
        )
    }
}
export default Song;