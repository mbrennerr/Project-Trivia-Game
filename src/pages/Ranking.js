import React, { Component } from 'react';
// import logo from '../trivia.png';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    return (
      <div data-testid="ranking-title">
        <h1>Sou o ranking</h1>
        <Link to="/ranking">
          <button type="button" data-testid="btn-go-home">
            Home!
          </button>
        </Link>
      </div>
    );
  }
}
