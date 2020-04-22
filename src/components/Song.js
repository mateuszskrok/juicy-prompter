import React from "react";
import { Box, Heading, Badge, Text } from "@chakra-ui/core";

class Song extends React.Component{
    render(){
        const {title, author, tempo, root, lyrics} = this.props;
        return(
            <Box bg="#324659" w="90%" p={5} color="white">
                <Heading>
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
                <Box>
                    <Text>
                        {lyrics}
                    </Text>
                </Box>
            </Box>
        )
    }
}
export default Song;