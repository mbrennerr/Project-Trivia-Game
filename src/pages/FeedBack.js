import React, { Component } from 'react';
import PlayAgain from '../component/PlayAgain';
import Header from '../component/Header';
import InfoFeedback from '../component/InfoFeedback';
import FeedbackMessage from '../component/FeedbackMessage';

export default class FeedBack extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <FeedbackMessage />
        <InfoFeedback />
        <PlayAgain />
      </div>
    );
  }
}
