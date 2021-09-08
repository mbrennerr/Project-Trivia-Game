import React from 'react';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      index: 0,
    };
    this.sortAnswers = this.sortAnswers.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
  }

  async componentDidMount() {
    this.getQuestions();
    // const token = localStorage.getItem('token');
    // const requestReturn = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    // const questions = await requestReturn.json();
    // this.setState({
    //   questions,
    // });
    // console.log(questions.results[0]);
    // return questions;
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const requestReturn = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await requestReturn.json();
    this.setState({
      questions,
    });
  }

  sortAnswers(results) {
    // console.log(results);
    const { index } = this.state;
    const correctAnswer = results[index].correct_answer;
    const allAnswers = results[index].incorrect_answers;
    allAnswers.push(correctAnswer);
    allAnswers.sort();
    return (
      <div>
        <h2 data-testid="question-category">{results[index].category}</h2>
        <h2 data-testid="question-text">{results[index].question}</h2>
        {allAnswers.map((answer) => (
          (answer === correctAnswer
            ? (
              <button data-testid="correct-answer" type="button" key={ answer }>
                { answer }
              </button>)
            : (
              <button data-testid="wrong-answer-index" type="button" key={ answer }>
                { answer }
              </button>))
        ))}
      </div>);
    // <h2>{allAnswers[0]}</h2>
  }

  render() {
    const { questions } = this.state;
    // console.log(questions);
    return (
      <div>
        <h1>GamePage</h1>
        { questions.results !== undefined
          ? this.sortAnswers(questions.results)
        // <div>
        //   <h2 data-testid="question-category">{questions.results[0].category}</h2>
        //   {/* <h2 data-testid="question-text">{questions.results[0].question}</h2>
        //   <h4 data-testid="correct-answer">{questions.results[0].correct_answer}</h4>
        //   <h4 data-testid="wrong-answer-0">{questions.results[0].incorrect_answers[0]}</h4>
        //   <h4 data-testid="wrong-answer-1">{questions.results[0].incorrect_answers[1]}</h4>
        //   <h4 data-testid="wrong-answer-2">{questions.results[0].incorrect_answers[2]}</h4> */}
        // </div>
          : '' }
      </div>
    );
  }
}

export default GamePage;
