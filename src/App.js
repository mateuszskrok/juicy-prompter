import React from 'react';
import './App.css';
import SetOfSongs from "./components/SetOfSongs";
import SetSelector from "./components/SetSelector"
import { ThemeProvider, theme, Heading } from '@chakra-ui/core';
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
    songs: [
      {id: 1, author:"Maryla Rodowicz", title:"Małgośka", tempo:100, root:"d-moll", lyrics:"To był Maj pachniała Saska Kępa..."},
      {id: 2, author:"Natalia Nykiel", title:"Error", tempo:110, root:"c-moll", lyrics:"Tramwaj lepiej wie gdzie czas zakręca..."},
      {id: 3, author:"Sandu Ciorba", title:"Dalibomba", tempo:90, root:"d-moll", lyrics:"A lej lej lej lej lej la..."},
      {id: 4, author:"Maryla Rodowicz", title:"Niech żyje bal", tempo:80, root:"a-moll", lyrics:"Zycie kochanie trwa tyle co taniec..."},
      {id: 5, author:"Krzysztof Krawczyk", title:"Tylko Ty", tempo:100, root:"F-dur", lyrics:"Nie każdy dzień był naszym dniem..."},
      {id: 6, author:"Akcent", title:"Przez Twe Oczy zielone", tempo:130, root:"a-moll", lyrics:"Odkąd zobaczyłem Ciebie...."},
      {id: 7, author:"BAJM", title:"Biała Armia", tempo:125, root:"e-moll", lyrics:"To twoja flaga nasz młody przyjacielu..."},
      {id: 8, author:"Krzysztof Krawczyk", title:"Za Tobą pójdę jak na bal", tempo:110, root:"F-dur", lyrics:"Ty jedna umiesz w życie grać..."},
      {id: 9, author:"Fitness", title:"Fitness", tempo:140, root:"d-moll", lyrics:"Doskonałe ciało masz, Najpiękniejsza Twoja twarz..."}
    ],
    sets: [
      {
      id: uuidv4(),
      name: "Set I", 
      songIds:[1,2,3]
      },
      {
      id: uuidv4(),
      name: "Set II", 
      songIds:[4,5,6]
      },
      {
      id: uuidv4(),
      name: "Set III", 
      songIds:[7,8,9]
      },
      {
      id: uuidv4(),
      name: "Odrzucone", 
      songIds:[]
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

  handleMoveSongToNextSet = (selectedSongId) => {
    console.log(selectedSongId) 
    this.setState(
      function(prevState) {
        let changedSets = prevState.sets
        console.log(changedSets[prevState.activeSet].songIds)
        let filtered = changedSets[prevState.activeSet].songIds.filter((val) => val !== selectedSongId)
        changedSets[prevState.activeSet].songIds = filtered
        changedSets[prevState.activeSet+1].songIds.push(selectedSongId)
        console.log("sety:",changedSets);
        return{sets: changedSets}
      }
    )
  }

  handleRejectSong = (selectedSongId) => {
    console.log(selectedSongId) 
    this.setState(
      function(prevState) {
        let changedSets = prevState.sets
        console.log(changedSets[prevState.activeSet].songIds)
        let filtered = changedSets[prevState.activeSet].songIds.filter((val) => val !== selectedSongId)
        changedSets[prevState.activeSet].songIds = filtered
        changedSets[changedSets.length -1].songIds.push(selectedSongId)
        console.log("sety:",changedSets);
        return{sets: changedSets}
      }
    )
  }
  
  handleSetSelect = (selectedSetName) => {
    const selectedSet = this.state.sets.findIndex(
      set => (set.name === selectedSetName) 
    )
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
    console.log("this: ", this);
    console.log("this state: ", this.state);
    const currentSet = this.state.sets[this.state.activeSet]
 
    return (
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        {this.state.isSetSelected ?
          <SetOfSongs 
            name={currentSet.name} 
            songs={this.state.songs.filter(
              song => (currentSet.songIds.includes(song.id))
            )}
            onPrevSet={this.handleSetPrevious}
            onNextSet={this.handleSetNext}
            onSetDeselect={this.handleSetDeselect}
            onMoveSongToNextSet={this.handleMoveSongToNextSet}
            onRejectSong={this.handleRejectSong}
            isFirst={(this.state.activeSet === 0)}
            isLast={(this.state.activeSet === this.state.sets.length - 2)}
            isTrash={(this.state.sets[this.state.activeSet].name === "Odrzucone")}
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
