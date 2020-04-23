import React from "react";
import { 
    Box, Heading, Badge,
    AccordionHeader, AccordionIcon, AccordionItem, AccordionPanel, Button
} from "@chakra-ui/core";

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
                <AccordionPanel>
                    <Badge rounded="full" px="2" variantColor="gray">
                        {tempo} BPM
                    </Badge>
                    <Badge rounded="full" px="2" variantColor="gray">
                        {root}
                    </Badge>
                    {isSetTrash ? 
                        <Button>
                            Przywróć
                        </Button>
                    :
                        <Button onClick={() => onRejectSong(id)}>
                            Odrzuć
                        </Button>
                    }
                    {!isSetLast ?
                        <Button onClick={() => onMoveSongToNextSet(id)}>
                            Przenieś do następnego setu
                        </Button> 
                    : 
                        ""     
                    }
                    <Box>
                        {lyrics}
                    </Box>
                 </AccordionPanel>
                </AccordionItem>
        )
    }
}
export default Song;