export async function getQuestions(token) {
  const requestReturn = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questions = await requestReturn.json();
  return questions;
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
