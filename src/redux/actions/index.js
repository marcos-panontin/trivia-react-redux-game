export const SAVE_EMAIL = (email) => ({
  type: 'SAVE_EMAIL',
  email,
});

export const SAVE_NAME = (name) => ({
  type: 'SAVE_NAME',
  name,
});

export const SAVE_SCORE = (score, assertions) => ({
  type: 'SAVE_SCORE',
  score,
  assertions,
});
