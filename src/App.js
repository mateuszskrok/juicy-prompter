import React from 'react';
import './App.css';
import SetOfSongs from "./components/SetOfSongs";
import SetSelector from "./components/SetSelector"
import { ThemeProvider, theme } from '@chakra-ui/core';
import { CSSReset } from '@chakra-ui/core';
import { v4 as uuidv4 } from 'uuid';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      // other shades
      500: "#123456"
    },
    secondary: {
      500: "#646463"
    }
  }
};


class App extends React.Component{

  constructor(props){
    super(props);
    this.handleSetSelect.bind(this);
  }

  state = {
    isSetSelected: false,
    activeSet: null,
    sets: [
      {
      id: uuidv4(),
      name: "Set I", 
      songs:[
        {author:"Maryla Rodowicz", title:"Małgośka", tempo:100, root:"d-moll", lyrics:"To był Maj pachniała Saska Kępa..."},
        {author:"Natalia Nykiel", title:"Error", tempo:110, root:"c-moll", lyrics:"Tramwaj lepiej wie gdzie czas zakręca..."},
        {author:"Sandu Ciorba", title:"Dalibomba", tempo:90, root:"d-moll", lyrics:"A lej lej lej lej lej la..."}
      ]
      },
      {
      id: uuidv4(),
      name: "Set II", 
      songs:[
        {author:"Maryla Rodowicz", title:"Niech żyje bal", tempo:80, root:"a-moll", lyrics:"Zycie kochanie trwa tyle co taniec..."},
        {author:"Krzysztof Krawczyk", title:"Tylko Ty", tempo:100, root:"F-dur", lyrics:"Nie każdy dzień był naszym dniem..."},
        {author:"Sandu Ciorba", title:"Dalibomba", tempo:90, root:"d-moll", lyrics:"A lej lej lej lej lej la"}
      ]
      },
      {
        id: uuidv4(),
        name: "Set III", 
        songs:[
          {author:"BAJM", title:"Biała Armia", tempo:125, root:"e-moll", lyrics:"To twoja flaga nasz młody przyjacielu..."},
          {author:"Krzysztof Krawczyk", title:"Za Tobą pójdę jak na bal", tempo:110, root:"F-dur", lyrics:"Ty jedna umiesz w życie grać..."},
          {author:"Sandu Ciorba", title:"Dalibomba", tempo:90, root:"d-moll", lyrics:"A lej lej lej lej lej la"}
        ]
        }
    ]
  }


  handleSetNext = (event) => {
    this.setState(
      function(prevState) {
        return{activeSet: prevState.activeSet+1}
      }
    )
  }

  handleSetPrevious = (event) => {
    this.setState(
      function(prevState) {
        return{activeSet: prevState.activeSet-1}
      }
    )
  }
  
  handleSetSelect = (selectedSetName) => {
    const selectedSet = this.state.sets.findIndex(
      set => (set.name === selectedSetName) 
    )
    console.log(selectedSet)
    this.setState((state) => {
      return{
        activeSet: selectedSet,
        isSetSelected: true
    }}
    )
  }

  handleSetDeselect = () => {
    this.setState((state) => {
      return{
        activeSet: null,
        isSetSelected: false
    }}
    )
  }

  render() {
    const currentSet = this.state.sets[this.state.activeSet]
    console.log(currentSet)
    return (
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        {this.state.isSetSelected ? 
          <SetOfSongs 
            name={currentSet.name} 
            songs={currentSet.songs}
            onPrevSet={this.handleSetPrevious}
            onNextSet={this.handleSetNext}
            onSetDeselect={this.handleSetDeselect}
            isFirst={(this.state.activeSet ===0)}
            isLast={(this.state.activeSet === this.state.sets.length - 1)}
            />
          :
          <SetSelector 
            sets={this.state.sets}
            onSetSelect={this.handleSetSelect}
          />
         }
      </ThemeProvider>
    );
  }
  
}

export default App;
