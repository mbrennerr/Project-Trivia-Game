import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { acertou, saveScore, saveAssertions } from '../actions/loginActions';
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
      link: false,
      questions: 0,
      acertos: 1,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClickResp = this.handleOnClickResp.bind(this);
    this.handleOnClickWrong = this.handleOnClickWrong.bind(this);
    this.showAnswers = this.showAnswers.bind(this);
    this.sendToLocalStorage = this.sendToLocalStorage.bind(this);
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

  mixQuestions() {
    const { data, questions } = this.state;
    const newIndex = questions + 1;
    const questoesIncorretas = data[newIndex].incorrect_answers;
    const questaoCorreta = data[newIndex].correct_answer;
    const questoesAtuais = [...questoesIncorretas, questaoCorreta];
    this.setState({
      questoesAtuais: shuffleArray(questoesAtuais),
      correctAnswer: questaoCorreta,
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

  // função que mostra cores das respostas
  showAnswers() {
    const correct = document.getElementsByClassName('correct');
    const incorrect = document.getElementsByClassName('incorrect');
    correct[0].className = 'rightAnswer';
    for (let i = 0; i <= incorrect.length; i += 1) {
      incorrect[i].className = 'wrongAnswer';
    }
  }

  sendToLocalStorage() {
    const { acertos } = this.state;
    const state = localStorage.getItem('state');
    const objState = JSON.parse(state);
    /* console.log(objState); */
    const playerAtualizado = { player:
       { ...objState.player, assertions: acertos === 0 ? 1 : acertos } };
    console.log(playerAtualizado);
    localStorage.setItem('state', JSON.stringify(playerAtualizado));
  }

  handleOnClickResp() {
    const { infoPlayer, saveScoreLocal, saveAssertionsLocal } = this.props;
    const { score, assertions } = infoPlayer;
    const { data, index, timer } = this.state;
    saveAssertionsLocal(assertions);
    saveScoreLocal(score, data[index].difficulty, timer, infoPlayer);
    this.setState((prevState) => ({
      timer: 0,
      acertos: prevState.acertos + 1,
    }));
    this.showAnswers();
    this.sendToLocalStorage();
  }

  handleOnClickWrong() {
    this.setState({
      timer: 0,
    });
    this.showAnswers();
    /* this.sendToLocalStorage(); */
  }

  render() {
    const {
      timer, correctAnswer, disabled, data, index, questoesAtuais,
      nextQuestion, link } = this.state;
    return (
      <div>
        <h3>{ timer }</h3>
        { link ? <Redirect to="/feedback" /> : ''}
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
        {questoesAtuais.map((answer, i) => ((answer === correctAnswer
          ? (
            <button
              onClick={ this.handleOnClickResp }
              data-testid="correct-answer"
              type="button"
              key={ answer }
              disabled={ disabled }
              className="correct"
            >
              { answer }
            </button>)
          : (
            <button
              onClick={ this.handleOnClickWrong }
              data-testid={ `wrong-answer-${i}` }
              type="button"
              key={ answer }
              disabled={ disabled }
              className="incorrect"
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
  assertions: (payload) => dispatch(acertou(payload)),
  saveAssertionsLocal: (assertions) => dispatch(saveAssertions(assertions)),
});

const mapStateToProps = (state) => ({
  infoPlayer: state.reducerLogin,
});

GamePage.propTypes = {
  saveScoreLocal: PropTypes.func.isRequired,
  saveAssertionsLocal: PropTypes.func.isRequired,
  infoPlayer: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
