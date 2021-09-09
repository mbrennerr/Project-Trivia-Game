import React from 'react';

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
    this.showAnswers = this.showAnswers.bind(this);
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
      correctAnswer: correta,
      data: questions.results,
    });
  }

  mixQuestions() {
    const { index, data } = this.state;
    const newIndex = index + 1;
    const questoesIncorretas = data[newIndex].incorrect_answers;
    const questoesCorretas = data[newIndex].correct_answer;
    const questoesAtuais = [...questoesIncorretas, questoesCorretas];
    this.setState({
      questoesAtuais: [...questoesAtuais],
    });
  }

  handleOnClick() {
    this.setState((prevState) => ({
      timer: 30,
      index: prevState.index + 1,
    }));
    this.mixQuestions();
  }

  handleOnClickResp() {
    this.setState({
      timer: 0,
    });
    this.showAnswers();
  }

  // função que mostra cores das respostas
  showAnswers() {
    const correct = document.getElementsByClassName('correct');
    const incorrect = document.getElementsByClassName('incorrect');
    console.log(incorrect.length);
    correct[0].className = 'rightAnswer';
    for (let i = 0; i <= incorrect.length; i += 1) {
      incorrect[i].className = 'wrongAnswer';
      console.log(i);
    }
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
              <h2 data-testid="question-category">{data[index].category}</h2>
              <h2 data-testid="question-text">{data[index].question}</h2>
            </div>)
          : ''}
        {questoesAtuais.sort().map((answer) => (
          (answer === correctAnswer ? (
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
                onClick={ this.handleOnClickResp }
                data-testid="wrong-answer-index"
                type="button"
                key={ answer }
                disabled={ disabled }
                className="incorrect"
              >
                { answer }
              </button>))
        ))}
        { nextQuestion === true ? (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleOnClick }
          >
            Proxíma
          </button>)
          : ''}
      </div>
    );
  }
}

export default GamePage;
