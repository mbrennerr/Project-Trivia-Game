import React from 'react';
import { Redirect } from 'react-router';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      timer: 30,
      data: [],
      questoesAtuais: [],
      nextQuestion: false,
      link: false,
      questions: 0,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClickResp = this.handleOnClickResp.bind(this);
  }

  async componentDidMount() {
    const ONE = 1;
    const itsTrue = true;
    this.getQuestions();
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer === 0 ? 0 : prevState.timer - ONE,
        disabled: prevState.timer === 0 ? itsTrue : false,
        nextQuestion: prevState.timer === 0 ? itsTrue : false,
      }));
    }, ONE_SECOND);
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const requestReturn = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await requestReturn.json();
    // organizando as questões pro state
    const incorretas = questions.results[0].incorrect_answers;
    const correta = questions.results[0].correct_answer;
    const allAnswers = [...incorretas, correta];
    this.setState({
      questoesAtuais: allAnswers,
      questoesCorretas: correta,
      data: questions.results,
    });
  }

  mixQuestions() {
    const { questions, data } = this.state;
    const newIndex = questions + 1;
    const questoesIncorretas = data[newIndex].incorrect_answers;
    const questoesCorretas = data[newIndex].correct_answer;
    const questoesAtuais = [...questoesIncorretas, questoesCorretas];
    this.setState({
      questoesAtuais: [...questoesAtuais],
      questoesCorretas: [questoesCorretas],
    });
  }

  handleOnClick() {
    const THREE = 3;
    const FOUR = 4;
    this.setState((prevState) => ({
      timer: 30,
      index: prevState.index >= THREE ? FOUR : prevState.index + 1,
      questions: prevState.questions >= THREE ? THREE : prevState.questions + 1,
      link: prevState.questions === THREE && prevState.index === FOUR,
    }));
    this.mixQuestions();
  }

  handleOnClickResp() {
    this.setState({
      timer: 0,
    });
  }

  render() {
    const {
      timer, questoesCorretas, disabled, data, index, questoesAtuais,
      nextQuestion, link } = this.state;
    return (
      <div>
        { link ? <Redirect to="/feedback" /> : ''}

        <h3>{ timer }</h3>
        {data.length > 0
          ? (
            <div>
              <h2 data-testid="question-category">{data[index].category}</h2>
              <h2 data-testid="question-text">{data[index].question}</h2>
            </div>)
          : ''}
        {questoesAtuais.sort().map((answer, i) => (
          <button
            onClick={ this.handleOnClickResp }
            data-testid={ answer === questoesCorretas
              ? 'correct-answer' : `wrong-answer-${i}` }
            type="button"
            key={ answer }
            disabled={ disabled }
          >
            { answer }
          </button>
        ))}
        { nextQuestion === true
          ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleOnClick }
            >
              Proxíma
            </button>)
          : '' }
      </div>
    );
  }
}

export default GamePage;
