export async function getToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data;
}

export async function getQuestions(quantity, type, difficulty, categoryId) {
  const generatedToken = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=${quantity}&category=${categoryId}&difficulty=${difficulty}&type=${type}&token=${generatedToken}`);
  const data = await response.json();
  return data;
}
