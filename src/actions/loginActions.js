export const FEZ_LOGIN = 'FEZ_LOGIN';
export const FETCH_GRAVATAR = 'FETCH_GRAVATAR';
export const FAZ_O_FETCH = 'FAZ_O_FETCH';
export const SUCCESS_FETCH = 'SUCCESS_FETCH';
export const ERROR_FETCH = 'ERROR_FETCH';
export const SAVE_SCORE = 'SAVE_SCORE';
export const ACERTOU = 'ACERTOU';
export const SAVE_ASSERTIONS = 'SAVE_ASSERTIONS';
const difficultyDict = {
  hard: 3,
  medium: 2,
  easy: 1,
};

export const clickLogin = (payload) => ({
  type: FEZ_LOGIN,
  payload,
});

export const successFetchImage = (payload) => ({
  type: FETCH_GRAVATAR,
  payload,
});

export const fazOFetch = () => ({
  type: FAZ_O_FETCH,
});

export const errorFetch = () => ({
  type: ERROR_FETCH,
});

export const saveScore = (score, difficulty, timer, state) => (dispatch) => {
  const difficultyValue = difficultyDict[difficulty];
  const BASE_SCORE = 10;
  const calc = BASE_SCORE + (difficultyValue * timer);
  const payload = score + calc;
  const localStorageObject = {
    player: {
      ...state,
      score: payload,
    },
  };

  localStorage.setItem('state', JSON.stringify(localStorageObject));
  dispatch({
    type: SAVE_SCORE,
    payload,
  });
};

export const saveAssertions = (asertions, state) => (dispatch) => {
  const BASE_ASSERTIONS = 1;
  const payload = BASE_ASSERTIONS + asertions;
  const localStorageObject = {
    player: {
      ...state,
      asertions: payload,
    },
  };

  localStorage.setItem('asertions', JSON.stringify(localStorageObject));
  dispatch({
    type: SAVE_ASSERTIONS,
    payload,
  });
};

export const fetchGravatar = (hash) => async (dispatch) => {
  dispatch(fazOFetch());
  try {
    const resp = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    return dispatch(successFetchImage(resp.url));
  } catch (error) {
    return dispatch(errorFetch());
  }
};

export const acertou = (payload) => ({
  type: ACERTOU,
  payload,
});
