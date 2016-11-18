import React from 'react';
import {render} from 'react-dom';

function Card(props) {
  var path = "../assets/cards/SVG-cards-1.3/"
  var faceup = props.value + '_of_' + props.suit + '.svg'
  return (
    <button className="card">
      <img src={path + (props.faceup ? faceup : 'back')}></img>
    </button>
  )
}

class Tableau extends React.Component {
  // This component should really just store whether or not the cards are face up
  // The problem here is that when I am dealing the cards each card will have to be given a suit by the deck constructor/shuffler
  constructor(props) {
    super(props);
    this.state = {
      cardValue: 10,
      cardSuit: 'clubs'
    }
  }

  render() {
    return (
      <div>
        {createDeck()}
        <Card value={this.state.cardValue} suit={this.state.cardSuit} front="front" back="back" faceup={true}/>
      </div>
    )
  }
}

render (
  <Tableau />, document.getElementById('game')
)

function createDeck() {
  let deck = [];

  const suits = [
    'clubs',
    'diamonds',
    'spades',
    'hears'
  ];

  const values = [
    'ace',
    'king',
    'queen',
    'jack',
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2
  ];

  for (let i = 0; i < values.length; i ++) {
    for (let j = 0; j < suits.length; j ++) {
      deck.push([values[i], suits[j]]);
    }
  }

  return deck;
}
