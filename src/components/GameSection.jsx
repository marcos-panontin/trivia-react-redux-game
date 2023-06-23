import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shuffleArray } from '../services/shuffleArray';

class GameSection extends Component {
  state = {
    correctAnswerIndex: '',
    buttonClicked: false,
    shuffledAnswers: [],
  };

  componentDidMount() {
    const { questionInfo } = this.props;
    const
      {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questionInfo;

    const allAnswers = [correctAnswer, ...incorrectAnswers];

    this.setState({
      correctAnswerIndex: Math.floor(Math.random() * allAnswers.length) + 1,
    });
  }
  // componentDidMount() {
  //   const { questionInfo } = this.props;
  //   const
  //     {
  //       correct_answer: correctAnswer,
  //       incorrect_answers: incorrectAnswers,
  //     } = questionInfo;

  //   const allAnswers = [correctAnswer, ...incorrectAnswers];
  //   const shuffledAnswers = shuffleArray(allAnswers);

  //   this.setState({
  //     shuffledAnswers,
  //   });
  // }

  // componentDidUpdate() {
  //   const { questionInfo } = this.props;
  //   const
  //     {
  //       correct_answer: correctAnswer,
  //       incorrect_answers: incorrectAnswers,
  //     } = questionInfo;

  //   const allAnswers = [correctAnswer, ...incorrectAnswers];
  //   const shuffledAnswers = shuffleArray(allAnswers);

  //   this.setState({
  //     shuffledAnswers,
  //   });
  // }

  handleClick = () => {
    this.setState({
      buttonClicked: true,
    });
  };

  render() {
    const { questionInfo } = this.props;
    const
      {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questionInfo;

    const allAnswers = [correctAnswer, ...incorrectAnswers];

    const { correctAnswerIndex } = this.state;

    return (
      <>
        <h2 data-testid="question-category">{questionInfo.category}</h2>
        <p data-testid="question-text">{questionInfo.question}</p>
        <div
          data-testid="answer-options"
          style={ { display: 'grid' } }
        >
          {allAnswers.map((answer, index) => (
            incorrectAnswers.includes(answer)
              ? (
                <button
                  // style={ buttonClicked ? { border: '3px solid red ' } : { border: '1px solid black ' } }
                  // style={ buttonClicked ? { border: '3px solid red ' } : null }
                  style={ { order: index, border: '3px solid red' } }
                  key={ index }
                  data-testid={ `wrong-answer-${incorrectAnswers.indexOf(answer)}` }
                  type="button"
                  onClick={ this.handleClick }
                >
                  {answer}
                </button>
              )
              : (
                <button
                  // style={ buttonClicked && { border: '3px solid rgb(6, 240, 15)' } }
                  style={ { order: correctAnswerIndex } }
                  key={ index }
                  data-testid="correct-answer"
                  type="button"
                  onClick={ this.handleClick }
                >
                  {answer}
                </button>
              )
          ))}
        </div>
      </>
    );
  }
}

GameSection.propTypes = {
  questionInfo: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default GameSection;
