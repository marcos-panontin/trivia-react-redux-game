import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import GameSection from '../components/GameSection';
import {
  restartTimer,
  disableAlternatives, enableAlternativesButtons,
} from '../redux/actions';

class Game extends Component {
  state = {
    results: [{
      correct_answer: '',
      incorrect_answers: [],
      category: '',
      question: '',
      difficulty: '' }],
    index: 0,
    loading: false,
    seconds: 30,
  };

  async componentDidMount() {
    const { history, quantity, type, difficulty, categoryId } = this.props;
    this.setState({
      loading: true,
    });
    const results = await getQuestions(quantity, type, difficulty, categoryId);
    this.setState({ results: results.results, loading: false });

    const magicNum = 3;
    if (results.response_code === magicNum) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.startTimer();
  }

  componentDidUpdate() {
    const { clearTimer } = this.props;

    if (clearTimer) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    const { dispatch } = this.props;
    const second = 1000;
    this.timer = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState({
          seconds: seconds - 1,
        });
      } else {
        clearInterval(this.timer);
        dispatch(disableAlternatives());
      }
    }, second);
  };

  handleClick = () => {
    const { results, index } = this.state;
    const { history, dispatch } = this.props;

    // DEALING WITH THE TIMER

    dispatch(restartTimer());
    this.setState({
      seconds: 30,
    });
    clearInterval(this.timer);
    this.startTimer();

    if (index === results.length - 1) {
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }));
    }

    // ENABLING BUTTONS
    dispatch(enableAlternativesButtons());
  };

  render() {
    const { results, index, loading, seconds } = this.state;
    const { clearTimer } = this.props;
    return (
      <>
        <Header />
        <div className="wrapper">

          { !loading && <GameSection
            questionInfo={ results[index] }
            seconds={ seconds }
          />}
          {(clearTimer || seconds === 0) && (
            <button
              className="button next-button"
              data-testid="btn-next"
              onClick={ this.handleClick }
            >
              {seconds === 0 ? 'Time is over. Next question >' : 'Next' }
            </button>
          )}
          <p className="timer" data-testid="timer">{seconds}</p>
        </div>
      </>

    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  clearTimer: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ player, settings }) => ({
  clearTimer: player.clearTimer,
  categoryId: settings.categoryId,
  difficulty: settings.difficulty,
  type: settings.type,
  quantity: settings.quantity,
});

export default connect(mapStateToProps)(Game);
