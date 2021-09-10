import React, { Component } from 'react';
import PlayAgain from '../component/PlayAgain';

export default class FeedBack extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Aqui é o feedback</h1>
        <PlayAgain />
      </div>
    );
  }
}
