import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveScore } from '../actions/loginActions';
import { shuffleArray } from '../service/questions';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      timer: 30,
      data: [],
      questoesAtuais: [],
      nextQuestion: false,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClickResp = this.handleOnClickResp.bind(this);
    this.handleOnClickWrong = this.handleOnClickWrong.bind(this);
  }

  async componentDidMount() {
    const { infoPlayer } = this.props;
    const ONE = 1;
    const itsTrue = true;
    this.getQuestions();
    const ONE_SECOND = 1000;
    localStorage.setItem('state', JSON.stringify({ player: infoPlayer }));
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
    const incorretas = questions.results[0].incorrect_answers;
    const correta = questions.results[0].correct_answer;
    const allAnswers = [...incorretas, correta];
    this.setState({
      questoesAtuais: shuffleArray(allAnswers),
      correctAnswer: correta,
      data: questions.results,
    });
  }

  mixQuestions(nextIndex) {
    const { data } = this.state;
    const questoesIncorretas = data[nextIndex].incorrect_answers;
    const questaoCorreta = data[nextIndex].correct_answer;
    const questoesAtuais = [...questoesIncorretas, questaoCorreta];
    this.setState({
      questoesAtuais: shuffleArray(questoesAtuais),
      correctAnswer: questaoCorreta,
    });
  }

  handleOnClick() {
    const { index } = this.state;
    const nextIndex = index + 1;
    this.setState({
      timer: 30,
      index: nextIndex,
    });
    this.mixQuestions(nextIndex);
  }

  handleOnClickResp() {
    const { infoPlayer, saveScoreLocal } = this.props;
    const { score } = infoPlayer;
    const { data, index, timer } = this.state;
    saveScoreLocal(score, data[index].difficulty, timer, infoPlayer);
    this.setState({
      timer: 0,
    });
  }

  handleOnClickWrong() {
    this.setState({
      timer: 0,
    });
  }

  render() {
    const {
      timer, correctAnswer, disabled, data, index, questoesAtuais,
      nextQuestion } = this.state;
    return (
      <div>
        <h3>{ timer }</h3>
        {data.length > 0
          ? (
            <div>
              <h2 data-testid="question-category">
                {data[index] ? data[index].category : ''}
              </h2>
              <h2 data-testid="question-text">
                {data[index] ? data[index].question : ''}
              </h2>
            </div>) : ''}
        {questoesAtuais.map((answer) => (
          (answer === correctAnswer
            ? (
              <button
                onClick={ this.handleOnClickResp }
                data-testid="correct-answer"
                type="button"
                key={ answer }
                disabled={ disabled }
              >
                { answer }
              </button>)
            : (
              <button
                onClick={ this.handleOnClickWrong }
                data-testid="wrong-answer-index"
                type="button"
                key={ answer }
                disabled={ disabled }
              >
                { answer }
              </button>))
        ))}
        { nextQuestion === true
          ? (
            <button type="button" data-testid="btn-next" onClick={ this.handleOnClick }>
              Próxima
            </button>) : ''}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveScoreLocal:
  (score, difficulty, timer) => dispatch(saveScore(score, difficulty, timer)),
});

const mapStateToProps = (state) => ({
  infoPlayer: state.reducerLogin,
});

GamePage.propTypes = {
  saveScoreLocal: PropTypes.func.isRequired,
  infoPlayer: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
