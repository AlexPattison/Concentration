import React from 'react';
import {render} from 'react-dom';

function Card(props) {
  const path = "../assets/cards/SVG-cards-1.3/"
  const faceup = props.value + '_of_' + props.suit + '.svg'
  return (
    <span className="card" onClick={() => props.onClick()}>
      <img src={path + (props.faceup ? faceup : 'back.svg')}></img>
    </span>
  )
}

class Tableau extends React.Component {
  // This component should really just store whether or not the cards are face up
  // The problem here is that when I am dealing the cards each card will have to be given a suit by the deck constructor/shuffler
  constructor(props) {
    super(props);
    this.state = {
      deck: createDeck(),
      numberFaceup: 0,
      previous: null,
      score: 0,
    }
  }

  handleClick(i) {
    const deck = this.state.deck.slice();

    if (this.state.previous && (deck[i].value === this.state.previous.value)) {
      console.log("Great Job");
      this.setState({score: this.state.score += 1})
    }

    deck[i].faceup = !deck[i].faceup;
    this.setState({
      deck: deck,
      numberFaceup: this.state.numberFaceup += 1,
      cardValue: deck[i].value,
      previous: deck[i]
    });

    if (this.state.numberFaceup === 2) {
      deck[i].faceup = false;
      previous.faceup = false;
      this.setState({deck: deck})
      return;
    }

    if (this.state.numberFaceup === 2) {
      this.setState({previous: null, cardValue: null, numberFaceup: 0})
      return;
    }
  }

  renderCard(card, key) {
    return <Card value={card.value} suit={card.suit} faceup={card.faceup} key={key} onClick={() => this.handleClick(key)}/>
  }

  render() {
    return (
      <div>
        <p>Score: {this.state.score}</p>
        {this.state.deck.map((card, key) => (
          this.renderCard(card, key)
        ))}
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
    'hearts'
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
      deck.push({value: values[i], suit: suits[j], faceup: false});
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i --) {
    let j = Math.floor(Math.random() * i);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}
