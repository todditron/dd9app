import { GET_ALL_USERS } from '../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      console.log(action.payload);
      return action.payload || false;
    default:
      return state;
  }
}
