import React from "react";
import {Box, Button, ButtonGroup} from "@chakra-ui/core";
import {BsHash} from "react-icons/bs";
function Transpose(chords, useSharp,semitones){

    let splittedChords = chords;
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
    
    const decodeTableB = [
        {key: "c", value: 0.5},
        {key: "des", value: 1.5},
        {key: "d", value: 2.5},
        {key: "es", value: 3.5},
        {key: "e", value: 4.5},
        {key: "f", value: 5.5}, 
        {key: "ges", value: 6.5},
        {key: "g", value: 7.5},
        {key: "as", value:  8.5},
        {key: "a", value:  9.5},
        {key: "b",value:  10.5},
        {key: "h", value: 11.5},

        {key: "C", value: 0},
        {key: "Des", value: 1},
        {key: "D", value: 2},
        {key: "Es", value: 3},
        {key: "E", value: 4},
        {key: "F", value: 5}, 
        {key: "Ges", value: 6},
        {key: "G", value: 7},
        {key: "As", value:  8},
        {key: "A", value:  9},
        {key: "B",value:  10},
        {key: "H", value: 11} 
    ]
    const transposedChordIndexes = splittedChords.map(
        chord => (transposeTable.find(a => a.key===chord).value + semitones + 12) % 12
    )
    var transposedChords = []
     
    if (useSharp) {
    transposedChords = transposedChordIndexes.map(
        index => decodeTable.find(a => a.value===index).key
    )}
    else{
    transposedChords = transposedChordIndexes.map(
        index => decodeTableB.find(a => a.value===index).key
    )}
    console.log("transpose:", transposedChords, semitones)

    return transposedChords;
}
function TransposeWidget({transpose, onMinus, onPlus, onReset, onToggleMode}){
    return(
        <>   
        <Button margin={3} onClick={onToggleMode}>
            <Box as={BsHash}/>
        </Button>
        <ButtonGroup spacing={1}>
        {transpose > -12 &&
        
        <Button onClick={onMinus}>
            -
        </Button>}
        <Button onDoubleClick={onReset}>TRANSPOSE: {transpose} </Button>
        {transpose < 12 &&
        <Button onClick={onPlus}>
             +
        </Button>}
        </ButtonGroup>
        </>
        
    )}

export {TransposeWidget, Transpose};