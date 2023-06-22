import { combineReducers } from 'redux';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const exampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({ exampleReducer });

export default rootReducer;
