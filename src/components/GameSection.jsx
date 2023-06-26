import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffleArray } from '../services/shuffleArray';
import { stopTimer, disableAlternatives } from '../redux/actions';

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

  handleClick = ({ target }) => {
    const { dispatch } = this.props;
    if (target.dataset.testid === 'correct-answer') {
      console.log('correto');
    }
    this.setState({
      buttonClicked: true,
    });
    dispatch(stopTimer());
    dispatch(disableAlternatives());
  };

  render() {
    const { buttonClicked, shuffledAnswers } = this.state;

    const { questionInfo, disableAlternativesButtons } = this.props;
    const
      {
        incorrect_answers: incorrectAnswers,
      } = questionInfo;

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
                  disabled={ disableAlternativesButtons }
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
                  disabled={ disableAlternativesButtons }
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
  disableAlternativesButtons: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  questionInfo: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  disableAlternativesButtons: globalState.player.disableAlternativesButtons,
});

export default connect(mapStateToProps)(GameSection);
