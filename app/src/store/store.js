import { createStore } from 'redux';

const INITIAL = {
  refresh: false,
  auth: {},
};

function reducer(state = INITIAL, action) {
  if (action.type === 'SET_REFRESH') {
    return {
      ...state, refresh: action.refresh,
    }
  } else if (action.type === 'SET_AUTH') {
    return {
      ...state, auth: action.auth,
    }
  }
  return state;
}

const store = createStore(reducer);

export default store;
