import { FETCH_GRAVATAR, FEZ_LOGIN } from '../actions/loginActions';

const initialState = {
  nome: '',
  assertions: '',
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
  default:
    return state;
  }
}

export default reducerLogin;
