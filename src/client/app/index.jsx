import React from 'react';
import {render} from 'react-dom';

function Card(props) {
  const path = "../assets/cards/SVG-cards-1.3/";
  const faceup = props.value + '_of_' + props.suit + '.svg';

  if (props.blank) {
    return (
      <span className="card">
        <img src={path + (props.faceup ? faceup : 'back.svg')} style={{visibility: 'hidden'}}></img>
      </span>
    )
  }

  return (
    <span className="card" onClick={() => props.onClick()}>
      <img src={path + (props.faceup ? faceup : 'back.svg')}></img>
    </span>
  )
}

class Tableau extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'playerOne',
      playerOne: [],
      playerTwo: [],
      deck: createDeck(),
      numberFaceup: 0,
      prevIdx: null,
    }
  }

  handleClick(i) {
    if (this.state.numberFaceup === 2 || this.state.prevIdx === i) {
      return;
    }

    this.handleFlip(this.state, i);
  }

  handleFlip(state, i) {
    const deck = state.deck.slice();
    const prev = deck[this.state.prevIdx];
    const cur = deck[i];

    cur.faceup = !cur.faceup;
    this.setState({
      deck: deck,
      numberFaceup: this.state.numberFaceup += 1
    });

    if (!prev) {
      this.setState({prevIdx: i})
    } else {
      if (cur.value === prev.value) {
        setTimeout(() => this.handleMatch(deck, i), 1000);
      } else {
        setTimeout(() => this.handleMismatch(deck, i), 3000);
      }
    }
  }

  handleMismatch(deck, i) {
    [deck[i].faceup, deck[this.state.prevIdx].faceup] = [false, false];

    this.setState({
      deck: deck,
      numberFaceup: 0,
      prevIdx: null,
      currentPlayer: this.state.currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne'
    })
  }

  handleMatch(deck, i) {
    const match = [deck[i], deck[this.state.prevIdx]];
    const dup = match.map((card) => JSON.parse(JSON.stringify(card)));
    [match[0].blank, match[1].blank] = [true, true];

    this.setState({
      [this.state.currentPlayer]: this.state[this.state.currentPlayer].concat(dup),
      deck: deck,
      numberFaceup: 0,
      prevIdx: null,
    })
  }

  renderCard(card, key) {
    return <Card value={card.value} suit={card.suit} faceup={card.faceup} key={key} onClick={() => this.handleClick(key)} blank={card.blank}/>
  }

  render() {
    return (
      <div>
        <p>Player One Score: {this.state.playerOne.length / 2}</p>
        <p>Player Two Score: {this.state.playerTwo.length / 2}</p>
        {this.state.deck.map((card, key) => (
          this.renderCard(card, key)
        ))}
        <p>Player One Matches: </p>
        <div>
          {this.state.playerOne.map((card, key) => (
            this.renderCard(card, key)
          ))}
        </div>
        <p>Player Two Matches: </p>
        <div>
          {this.state.playerTwo.map((card, key) => (
            this.renderCard(card, key)
          ))}
        </div>
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
      deck.push({
        value: values[i],
        suit: suits[j],
        faceup: false,
        blank: false
      });
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
