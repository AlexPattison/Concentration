import React from 'react';
import {render} from 'react-dom';

function Card(props) {
  return (
    <button className="card">
      {props.value}
    </button>
  )
}

class Tableau extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardValue: 'Ace'
    }
  }
  render() {
    return (
      <Card value={this.state.cardValue}/>
    )
  }
}

render (
  <Tableau />, document.getElementById('game')
)
