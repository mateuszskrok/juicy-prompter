import React from "react";



class TapTempoButton extends React.Component{

    state = {
        tempo:this.props.tempo,
        timeDifferenceBetweenTapsInSeconds: 60/this.props.tempo,
        tapTempoTimestamp: null
    }
    
    handleTapTempo = (event) => {
        this.setState((prevState) => {
            const tapTempoTimestamp = new Date().getTime();
            const timeDifferenceBetweenTapsInSeconds = (tapTempoTimestamp - prevState.tapTempoTimestamp)/1000;
            var tempo = 60 / timeDifferenceBetweenTapsInSeconds; 
            if (timeDifferenceBetweenTapsInSeconds > 2) {
                tempo = prevState.tempo;
            }
            else {
                const actualTempo = tempo; 
                var avgTempo = null;
                if (prevState.tempo){
                    avgTempo = (2*prevState.tempo + actualTempo) / 3; //smoothen tempo changes
                    tempo = Math.round(avgTempo);
                }
                else{
                    tempo=Math.round(actualTempo);
                }
            }
            return{
                tapTempoTimestamp: tapTempoTimestamp,
                timeDifferenceBetweenTapsInSeconds: timeDifferenceBetweenTapsInSeconds,
                tempo: tempo
            }
        })
    }

    render(){
        const {timeDifferenceBetweenTapsInSeconds} = this.state;
        return(
            <button onMouseDown={this.handleTapTempo} 
                                className="blink"  
                                style={{
                                    animation: `blink ${timeDifferenceBetweenTapsInSeconds}s infinite`, 
                                    WebkitAnimation: `blink ${timeDifferenceBetweenTapsInSeconds}s infinite`
                                    }}>
                                    {this.state.tempo ? this.state.tempo : "TAP"}
                        </button>
        )
    }
}

export default TapTempoButton