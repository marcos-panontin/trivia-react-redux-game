import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameSection extends Component {
  state = {
    buttonClicked: false,
  };

  handleClick = () => {
    this.setState({
      buttonClicked: true,
    });
  };

  render() {
    const { questionInfo, correctAnswerIndex } = this.props;
    const { buttonClicked } = this.state;
    const
      {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questionInfo;

    const allAnswers = [correctAnswer, ...incorrectAnswers];

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
                  className={ buttonClicked ? 'red' : null }
                  style={ { order: incorrectAnswers.indexOf(answer) } }
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
  correctAnswerIndex: PropTypes.number.isRequired,
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
