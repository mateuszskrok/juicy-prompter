import {Button, Box, Heading, SimpleGrid} from "@chakra-ui/core";
import React from "react";

class SetSelector extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {sets, onSetSelect} = this.props
        return(
            <SimpleGrid columns={1} spacing={10}>
                {sets.map((set) => (
                    <>
                    <Box margin="auto" bg="tomato" width="50%" rounded={5} height="80px" as="button" onClick={() => onSetSelect(set.name)}>
                        <Heading>
                            {set.name}
                        </Heading>
                    </Box>
                    </>
                ))}
            </SimpleGrid>
        )
    }
    
}

export default SetSelector;