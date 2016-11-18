import React from 'react';
import {render} from 'react-dom';

function Card(props) {
  var img;
  img = props.faceup ? props.front : props.back;
  console.log(img);

  return (
    <button className="card">
      {img}
    </button>
  )
}

class Tableau extends React.Component {
  // This component should really just store whether or not the cards are face up
  // The problem here is that when I am dealing the cards each card will have to be given a suit by the deck constructor/shuffler
  constructor(props) {
    super(props);
    this.state = {
      cardValue: 'Ace'
    }
  }
  render() {
    return (
      <div>
        <img src="../assets/cards/SVG-cards-1.3/2_of_clubs.svg"></img>
        <Card value={this.state.cardValue} front="front" back="back" faceup={true}/>
      </div>
    )
  }
}

render (
  <Tableau />, document.getElementById('game')
)
