
import { FETCH_GRAVATAR,
  FEZ_LOGIN,
  SAVE_SCORE,
  SAVE_ASSERTIONS } from '../actions/loginActions';

const initialState = {
  nome: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatarImage: '',
};

function reducerLogin(state = initialState, action) {
  switch (action.type) {
  case FEZ_LOGIN:
    return {
      ...state, gravatarEmail: action.payload.email, name: action.payload.name,
    };
  case FETCH_GRAVATAR:
    return {
      ...state, gravatarImage: action.payload,
    };
  case SAVE_SCORE:
    return {
      ...state, score: action.payload,
    };
  case SAVE_ASSERTIONS:
    return {
      ...state, assertions: action.payload,
    };
  default:
    return state;
  }
}

export default reducerLogin;
