import React from 'react';
import {render} from 'react-dom';

function Card(props) {
  const path = "../assets/cards/SVG-cards-1.3/";
  const faceup = props.value + '_of_' + props.suit + '.svg';

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
      deck: createDeck(),
      numberFaceup: 0,
      prevIdx: null,
      score: 0,
    }
  }

  handleClick(i) {
    console.log("We made it")
    const deck = this.state.deck.slice();
    const prev = deck[this.state.prevIdx];
    const cur = deck[i];

    if (this.state.numberFaceup === 2 || this.state.prevIdx === i) {
      return;
    }

    this.handleFlip(deck, cur, prev);

    // this.setState({
    //   deck: deck,
    //   numberFaceup: this.state.numberFaceup += 1,
    //   prevIdx: i
    // })

    // if (prev && (prev.value === cur.value)) {
    //   console.log("Great Job");
    //   [prev.value, prev.suit, cur.value, cur.suit] = [2, 'clubs', 2, 'clubs'];
    //   console.log("We're about to hit setTimeout")
    //   setTimeout(() =>
    //     this.setState({deck: deck});
    //     console.log("three seconds later"),
    //     3000);
    //
    //   // setTimeout(() => this.setState({deck: deck}), 5000)
    //   console.log("making sure")
    // }


    //
    // if (this.state.prevIdx && (deck[i].value === deck[this.state.prevIdx].value)) {
    //   deck[i]
    //   console.log("Great Job");
    //   this.setState({score: this.state.score += 1})
    // }

    // this.setState({
    //   deck: deck,
    //   numberFaceup: this.state.numberFaceup += 1,
    //   cardValue: deck[i].value,
    //   prev: deck[i]
    // });
    //
    // if (this.state.numberFaceup === 2) {
    //   deck[i].faceup = false;
    //   prev.faceup = false;
    //   this.setState({deck: deck})
    //   return;
    // }
    //
    // if (this.state.numberFaceup === 2) {
    //   this.setState({prev: null, cardValue: null, numberFaceup: 0})
    //   return;
    // }







    /****************Psuedo****************/
    // Return early if there are already two cards face up

    // flip the card that was clicked

    // If there was a previous, check for match
      // If there is a match, setTimeout to change cards to transparent

    // IT SEEMS LIKE I PROBABLY DON'T NEED A COUNTER
      // IF THERE IS A PREV, WE NEED TO FLIP THE CARDS OR REMOVE THE CARDS
      // ELSE WE JUST FLIP THE CURRENT CARD
  }

  handleFlip(deck, cur, prev) {
    cur.faceup = !cur.faceup;
    this.setState({deck: deck});
    let match = false;

    if (!prev) {
      prev = cur;
    } else if (cur.value === prev.value) {
      console.log("We have a match!");
      match = true;
    } else {
      console.log("Not a match");
    }

    setTimeout(() => console.log('match: ', match), 3000);
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
