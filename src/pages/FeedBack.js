import React, { Component } from 'react';
import FeedbackMessage from '../component/FeedbackMessage';

export default class FeedBack extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <FeedbackMessage />
      </div>
    );
  }
}
