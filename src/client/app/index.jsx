import React from 'react';
import {render} from 'react-dom';

function Card(props) {
  var img;
  img = props.faceup ? props.front : props.back;
  console.log(img);
  var path = "../assets/cards/SVG-cards-1.3/"
  return (
    <button className="card">
      <img src={path + props.value + '_of_' + props.suit + '.svg'}></img>
    </button>
  )
}

class Tableau extends React.Component {
  // This component should really just store whether or not the cards are face up
  // The problem here is that when I am dealing the cards each card will have to be given a suit by the deck constructor/shuffler
  constructor(props) {
    super(props);
    this.state = {
      cardValue: 'ace',
      cardSuit: 'clubs'
    }
  }
  render() {
    return (
      <div>
        <Card value={this.state.cardValue} suit={this.state.cardSuit} front="front" back="back" faceup={true}/>
      </div>
    )
  }
}

render (
  <Tableau />, document.getElementById('game')
)
