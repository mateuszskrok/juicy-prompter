import {Box, Heading, SimpleGrid} from "@chakra-ui/core";
import React from "react";

class SetSelector extends React.Component{

    render(){
        
        const {onSetSelect, gigName, sets} = this.props
        return(
            <>
            <Heading margin="auto">{gigName}</Heading>
            <SimpleGrid columns={2} spacing={10}>
                {sets.map((set) => (
                    <>
                    <Box key={set.id} margin="auto" bg="#333" color="#fff" width="90%" rounded={5} height="80px" as="button" onClick={() => onSetSelect(set.id)}>
                        <Heading>
                            {set.name}
                        </Heading>
                    </Box>
                    </>
                ))}
            </SimpleGrid>
            </>
        )
    }
    
}

export default SetSelector;