import React, { Component } from 'react';
import InfoFeedback from '../component/InfoFeedback';
import FeedbackMessage from '../component/FeedbackMessage';

export default class FeedBack extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <FeedbackMessage />
        <InfoFeedback />
      </div>
    );
  }
}
