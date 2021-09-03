export default async function getToken() {
  const requestReturn = await fetch('https://opentdb.com/api_token.php?command=request');
  const categories = await requestReturn.json();
  return categories;
}
