import {
  PUSH_ANSWERS_TO_GLOBAL_STATE,
  SAVE_EMAIL, SAVE_NAME, SAVE_SCORE, STOP_TIMER, RESTART_TIMER,
  DISABLE_ALTERNATIVES_BUTTONS, ENABLE_ALTERNATIVES_BUTTONS, INCREMENT_SCORE,
}
  from '../actions/actionsName';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  correctAnswerIndex: 0,
  allAnswersLength: 0,
  clearTimer: false,
  disableAlternativesButtons: false,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_NAME:
    return {
      ...state,
      name: action.name,
    };
  case SAVE_EMAIL:
    return {
      ...state,
      gravatarEmail: action.email,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  // case PUSH_ANSWERS_TO_GLOBAL_STATE:
  //   return {
  //     ...state,
  //     allAnswersLength: action.payload && action.payload.incorrect_answers.length + 1,
  //   };
  case STOP_TIMER:
    return {
      ...state,
      clearTimer: true,
    };
  case RESTART_TIMER:
    return {
      ...state,
      clearTimer: false,
    };
  case DISABLE_ALTERNATIVES_BUTTONS:
    return {
      ...state,
      disableAlternativesButtons: true,
    };
  case ENABLE_ALTERNATIVES_BUTTONS:
    return {
      ...state,
      disableAlternativesButtons: false,
    };
  case INCREMENT_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
