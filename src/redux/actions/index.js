import { SAVE_EMAIL, SAVE_NAME, SAVE_SCORE } from './actionsName';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveName = (name) => ({
  type: SAVE_NAME,
  name,
});

export const saveScore = (score, assertions) => ({
  type: SAVE_SCORE,
  score,
  assertions,
});
