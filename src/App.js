import React from 'react';
import './App.css';
import SetOfSongs from "./components/SetOfSongs";
import SetSelector from "./components/SetSelector"
import { ThemeProvider, theme, Heading } from '@chakra-ui/core';
import { CSSReset } from '@chakra-ui/core';
import { v4 as uuidv4 } from 'uuid';
import {gigname, songs, sets} from "./data/songs.json"

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
    this.state = {
      isSetSelected: false,
      activeSet: null,
      gigname,
      songs,
      sets
    }
  
  
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
            isLast={(this.state.activeSet >= this.state.sets.length - 2)}
            isTrash={(this.state.sets[this.state.activeSet].name === "Odrzucone")}
            />
          :
          <SetSelector
            gigname={this.state.gigname}
            sets={this.state.sets}
            onSetSelect={this.handleSetSelect}
          />
         }
      </ThemeProvider>
    );
  }
  
}

export default App;

// var data = {a:1, b:2, c:3};
// var json = JSON.stringify(data);
// var blob = new Blob([json], {type: "application/json"});
// var url  = URL.createObjectURL(blob);

// var a = document.createElement('a');
// a.download    = "backup.json";
// a.href        = url;
// a.textContent = "Download backup.json";

// document.getElementById('content').appendChild(a);