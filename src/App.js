import React from 'react';
import './App.scss';
import SetOfSongs from "./components/SetOfSongs";
import SetSelector from "./components/SetSelector"
import { ThemeProvider, Select, theme, useToast} from '@chakra-ui/core';
import { CSSReset } from '@chakra-ui/core';
import GigsAPI from "./api/GigsAPI";
import SetsAPI from "./api/SetsAPI";
import SongsAPI from "./api/SongsAPI";


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
        console.log("indexToRemove: ", indexToRemove)
        currentSet.songIds.splice(indexToRemove,1)
        console.log("current: ", currentSet)
        nextSet.songIds.push(selectedSongId)
        console.log("next: ", nextSet)
        SetsAPI.replaceSet(currentSet.id, currentSet)
        SetsAPI.replaceSet(nextSet.id, nextSet)
        return {sets: setsToChange}
      })
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
          <SetOfSongs
            name={currentSet.name} 
            setId={currentSet.id}
            songs={this.state.songs}
            onPrevSet={this.handleSetPrevious}
            onNextSet={this.handleSetNext}
            onSetDeselect={this.handleSetDeselect}
            onMoveSongToNextSet={this.handleMoveSongToNextSet}
            onRejectSong={this.handleRejectSong}
            isFirst={(this.state.activeSet === 0)}
            isLast={(this.state.activeSet >= this.state.sets.length - 2)}
            isTrash={(this.state.sets[currentSetIndex].name === "Odrzucone")}
            />
          :
          <SetSelector
            gigId = {this.state.currentGig.id}
            gigName = {this.state.currentGig.name}
            sets = {this.state.sets}
            onSetSelect={this.handleSetSelect}
          />
         }
         </>}
      </ThemeProvider>
    );
  }
  
}

export default App;