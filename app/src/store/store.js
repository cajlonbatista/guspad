import { createStore } from 'redux';

const INITIAL = {
  refresh: false
};

function reducer(state = INITIAL, action) {
  if (action.type === 'SET_REFRESH') {
    return {
      ...state, refresh: action.refresh,
    }
  }
  return state;
}

const store = createStore(reducer);

export default store;
