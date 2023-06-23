import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shuffleArray } from '../services/shuffleArray';

class GameSection extends Component {
  render() {
    const { questionInfo = { correct_answer: '', incorrect_answers: [] } } = this.props;
    const
      {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questionInfo;

    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const shuffledAnswers = shuffleArray(allAnswers);

    return (
      <>
        <h2 data-testid="question-category">{questionInfo.category}</h2>
        <p data-testid="question-text">{questionInfo.question}</p>
        <div data-testid="answer-options">
          {shuffledAnswers.map((answer, index) => (
            incorrectAnswers.includes(answer)
              ? (
                <button
                  key={ index }
                  data-testid={ `wrong-answer-${incorrectAnswers.indexOf(answer)}` }
                  type="button"
                >
                  {answer}
                </button>
              )
              : (
                <button
                  key={ index }
                  data-testid="correct-answer"
                  type="button"
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
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired }).isRequired,
};

export default GameSection;
