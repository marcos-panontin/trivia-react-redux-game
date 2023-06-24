import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffleArray } from '../services/shuffleArray';

class GameSection extends Component {
  state = {
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
    const shuffledAnswers = shuffleArray(allAnswers);
    this.setState({
      shuffledAnswers,
    });
  }

  componentDidUpdate(prevProps) {
    const { questionInfo } = this.props;
    const
      {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questionInfo;

    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const shuffledAnswers = shuffleArray(allAnswers);
    if (prevProps.questionInfo !== questionInfo) {
      this.setState({
        buttonClicked: false,
        shuffledAnswers,
      });
    }
  }

  handleClick = () => {
    this.setState({
      buttonClicked: true,
    });
  };

  render() {
    const { buttonClicked, shuffledAnswers } = this.state;

    const { questionInfo } = this.props;
    // const { buttonClicked } = this.state;
    const
      {
        incorrect_answers: incorrectAnswers,
      } = questionInfo;

    // const allAnswers = [correctAnswer, ...incorrectAnswers];

    return (
      <>
        <h2 data-testid="question-category">{questionInfo.category}</h2>
        <p data-testid="question-text">{questionInfo.question}</p>
        <div
          data-testid="answer-options"
          style={ { display: 'grid' } }
        >
          {shuffledAnswers.map((answer, index) => (
            incorrectAnswers.includes(answer)
              ? (
                <button
                  className={ buttonClicked ? 'red' : null }
                  // style={ { order: incorrectAnswers.indexOf(answer) } }
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
                  // style={ { order: correctAnswerIndex } }
                  className={ buttonClicked ? 'green' : null }
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
  // correctAnswerIndex: PropTypes.number.isRequired,
  questionInfo: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  correctAnswerIndex: globalState.player.correctAnswerIndex,
});

export default connect(mapStateToProps)(GameSection);
