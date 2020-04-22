import React from 'react';
import './App.css';
import Song from "./components/Song"
import { ThemeProvider, theme, Heading } from '@chakra-ui/core';
import { CSSReset } from '@chakra-ui/core';

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

class SetOfSongs extends React.Component{
  state = {
    songs:[
      {author:"Maryla Rodowicz", title:"Małgośka", tempo:100, root:"d-moll", lyrics:"To był Maj pachniała Saska Kępa"},
      {author:"Natalia Nykiel", title:"Error", tempo:110, root:"c-moll", lyrics:"Tramwaj lepiej wie gdzie czas zakręca"},
      {author:"Sandu Ciorba", title:"Dalibomba", tempo:90, root:"d-moll", lyrics:"A lej lej lej lej lej la"}
    ]
  
  }
  render(){
    return(
      <>
      <Heading>
        {this.props.name}
      </Heading>
      {this.state.songs.map( (song) => (
        <Song
          title = {song.title}
          author = {song.author}
          root = {song.root}
          tempo = {song.tempo}
          lyrics = {song.lyrics}
          />
      ))}
      </>
    )
  }
}

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <SetOfSongs name="Set I">
      </SetOfSongs>
    </ThemeProvider>

  );
}

export default App;
