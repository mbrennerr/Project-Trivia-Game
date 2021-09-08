export default async function getQuestions(token) {
  const requestReturn = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questions = await requestReturn.json();
  return questions;
}
