import React, { Component } from 'react';
import InfoFeedback from '../component/InfoFeedback';

export default class FeedBack extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Aqui é o feedback</h1>
        <InfoFeedback />
      </div>
    );
  }
}
