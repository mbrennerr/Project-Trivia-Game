export const FEZ_LOGIN = 'FEZ_LOGIN';
export const FETCH_GRAVATAR = 'FETCH_GRAVATAR';
export const FAZ_O_FETCH = 'FAZ_O_FETCH';
export const SUCCESS_FETCH = 'SUCCESS_FETCH';
export const ERROR_FETCH = 'ERROR_FETCH';

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

export const fetchGravatar = (hash) => async (dispatch) => {
  dispatch(fazOFetch());
  try {
    const resp = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    return dispatch(successFetchImage(resp.url));
  } catch (error) {
    return dispatch(errorFetch());
  }
};
