import { FEZ_LOGIN } from '../actions/loginActions';

const initialState = {
  olá: '',
};

function reducerLogin(state = initialState, action) {
  switch (action.type) {
  case FEZ_LOGIN:
    return {
      ...state,
    };
  default:
    return state;
  }
}

export default reducerLogin;
