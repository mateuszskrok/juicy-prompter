import React from "react";
import { 
    Box, Heading, Badge,
    AccordionHeader, AccordionIcon, AccordionItem, AccordionPanel
} from "@chakra-ui/core";

class Song extends React.Component{
    render(){
        const {title, author, tempo, root, lyrics} = this.props;
        return(
            <AccordionItem>
                <AccordionHeader _expanded={{ bg: "tomato", color: "white" }}>
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
                    <Box>
                        {lyrics}
                    </Box>
                 </AccordionPanel>
                </AccordionItem>
        )
    }
}
export default Song;