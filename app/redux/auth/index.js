import {
  AUTH_LOGOUT,
  AUTH_SET_EMAIL,
  AUTH_SET_PASSWORD,
  AUTH_SET_TOKEN,
} from '../consts';

const initialState = {
  email: '',
  password: '',
  token: '',
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_EMAIL: {
      return {
        ...state,
        email: action.email,
      };
    }
    case AUTH_SET_PASSWORD: {
      return {
        ...state,
        password: action.password,
      };
    }
    case AUTH_SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case AUTH_LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export const setAuthEmail = state => ({
  type: AUTH_SET_EMAIL,
  email: state,
});

export const setAuthPassword = state => ({
  type: AUTH_SET_PASSWORD,
  password: state,
});

export const setAuthToken = state => ({
  type: AUTH_SET_TOKEN,
  token: state,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export default Auth;
