import React from 'react';
import './App.scss';
import SetOfSongs from "./components/SetOfSongs";
import SetSelector from "./components/SetSelector"
import { Button, ThemeProvider, Select, theme} from '@chakra-ui/core';
import { CSSReset } from '@chakra-ui/core';
import GigsAPI from "./api/GigsAPI";
import SetsAPI from "./api/SetsAPI";
import SongsAPI from "./api/SongsAPI";
import StateAPI from "./api/StateAPI";


const customTheme = {
  ...theme,
  fonts: {
    body: "Open Sans",
    heading: "Open Sans",
    preformatted: "Roboto Light",
    button: "comfortaa"
  },
  colors: {
    ...theme.colors,
    primary: {
      // other shades
      500: "#ffcc00"
    },
    secondary: {
      500: "#164450"
    }
  }
};


class App extends React.Component{

  constructor(props){
    super(props);
    this.handleGetState.bind(this);
    this.state = {
      isSetSelected: false,
      activeSetId: null,
      currentGig: 1,
      sets: [],
      gigs: [],
      songs: [],
      loading: true,
      error: null
    }
    
  }

  componentDidMount(){
    GigsAPI.getAllGigs().then(
      (gigs) => this.setState({
        gigs})
    ).catch(
      (error) => this.setState({error})
    ).then(
      () => this.setState({
          loading:false,
        })
    )
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  handleShare = () => {
    const {currentGig, activeSetId, isSetSelected, sets, songs} = this.state;
    StateAPI.updateState(currentGig, activeSetId, isSetSelected, sets, songs)
  }

  handleGetState = () => {
    StateAPI.getState().then(
      (result) => {
        this.setState({
          currentGig: result.currentGig, 
          activeSetId: result.activeSetId,  
          sets: result.sets,
          songs: result.songs
        })
      this.handleSetSelect(result.activeSetId)
      }
    ).finally(console.log(this.state))
    
  }

  handleGigSelection = (gigId) => {
    const currentGig = this.findGigByAnId(gigId)
    if (currentGig) {
      SetsAPI.getAllSetsFromGig(gigId).then(
        (sets) => this.setState({sets}))
        .catch(
            (error) => this.setState({error})
        )
      
      this.setState({
        isSetSelected: false,
        currentGig: currentGig
      })
    }
  }

  findGigByAnId(gigId){
    return this.state.gigs.find(gig => gig.id === gigId)
  }

   
  handleSetSelect = (selectedSetId) => {
    this.setState(() => {
      return{
        activeSetId: selectedSetId,
        isSetSelected: true
    }}
    )  
    SongsAPI.getAllSongsFromSet(selectedSetId).then(
      (songs) => this.setState({songs})
      ).catch(
          (error) => this.setState({error})
      )
  }

  getIdOfNextSet(sets, currentSetId){
    const activeSetIndex = sets.findIndex(
      set => (set.id === currentSetId) 
    )
      const nextSetId = sets[activeSetIndex+1].id;
      return nextSetId
  }

  getIdOfPreviousSet(sets, currentSetId){
    const activeSetIndex = sets.findIndex(
      set => (set.id === currentSetId) 
    )
    const previousSetId = sets[activeSetIndex-1].id;
    return previousSetId
  }

  handleSetNext = () => {
    this.setState((state) => {
      const nextSetId = this.getIdOfNextSet(state.sets, state.activeSetId)
      SongsAPI.getAllSongsFromSet(nextSetId).then(
        (songs) => this.setState({songs})
        ).catch(
            (error) => this.setState({error})
        )
      return{
        activeSetId: nextSetId,
        isSetSelected: true
    }}
    )  
  }
  handleSetPrevious = () => {
    this.setState((state) => {
      const prevSetId = this.getIdOfPreviousSet(state.sets, state.activeSetId)
      SongsAPI.getAllSongsFromSet(prevSetId).then(
        (songs) => this.setState({songs})
        ).catch(
            (error) => this.setState({error})
        )
      return{
        activeSetId: prevSetId,
        isSetSelected: true
    }}
    )  
  }


  handleMoveSongToNextSet = (selectedSongId) => {
    this.setState(
      (prevState) =>{
        const currentSetIndex = prevState.sets.findIndex(
          set => (set.id === prevState.activeSetId) 
        )
        let setsToChange = prevState.sets 
        let currentSet = setsToChange[currentSetIndex]
        let nextSet = setsToChange[currentSetIndex+1]
        const indexToRemove = currentSet.songIds.findIndex(
          songId => (songId === selectedSongId))

        currentSet.songIds.splice(indexToRemove,1)
        nextSet.songIds.push(selectedSongId)
        SetsAPI.replaceSet(currentSet.id, currentSet)
        SetsAPI.replaceSet(nextSet.id, nextSet)
        return {sets: setsToChange}
      })
  }

  handleRejectSong = (selectedSongId) => {
    this.setState(
      (prevState) =>{
        const currentSetIndex = prevState.sets.findIndex(
          set => (set.id === prevState.activeSetId) 
        )
        let setsToChange = prevState.sets 
        let currentSet = setsToChange[currentSetIndex]
        let lastSet = setsToChange[prevState.sets.length-1]
        const indexToRemove = currentSet.songIds.findIndex(
          songId => (songId === selectedSongId))

        currentSet.songIds.splice(indexToRemove,1)
        lastSet.songIds.push(selectedSongId)
        SetsAPI.replaceSet(currentSet.id, currentSet)
        SetsAPI.replaceSet(lastSet.id, lastSet)
        return {sets: setsToChange}
      })
  }
 

  handleSetDeselect = () => {
    this.setState(() => {
      return{
        activeSet: null,
        isSetSelected: false
    }}
    )
  }

  render() {

    const currentSet = this.state.sets.find(set => set.id === this.state.activeSetId)
    const currentSetIndex = this.state.sets.findIndex(set => set.id === this.state.activeSetId)
    
    return (
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        {this.state.loading? "Ładuję dane" :
        <>
        <Select className="form-control" onChange={(event) => this.handleGigSelection(parseInt(event.target.value))} placeholder="Wybierz koncert">
          {this.state.gigs.map(
            (gig) => <option key={gig.id} value={gig.id}>{gig.name}</option>
          )
          }        
        </Select>
        {this.state.isSetSelected ?
        <>
          <SetOfSongs
            name={currentSet.name} 
            setId={currentSet.id}
            songs={this.state.songs}
            onPrevSet={this.handleSetPrevious}
            onNextSet={this.handleSetNext}
            onSetDeselect={this.handleSetDeselect}
            onMoveSongToNextSet={this.handleMoveSongToNextSet}
            onRejectSong={this.handleRejectSong}
            isFirst={(currentSetIndex === 0)}
            isLast={(currentSetIndex+1 === this.state.sets.length)}
            isTrash={(currentSetIndex+1 === this.state.sets.length)}
            />
            <Button onClick={this.handleShare} w="100%"> Udostępnij </Button>
            </>
          :
          <SetSelector
            gigId = {this.state.currentGig.id}
            gigName = {this.state.currentGig.name}
            sets = {this.state.sets}
            onSetSelect={this.handleSetSelect}
          />
         }
         <Button onClick={this.handleGetState} w="100%"> Pobierz aktualny set </Button>
         </>}
      </ThemeProvider>
    );
  }
  
}

export default App;