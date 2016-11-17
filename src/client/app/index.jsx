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
  render() {
    return (
      <Card />
    )
  }
}

render (
  <Tableau />, document.getElementById('game')
)
