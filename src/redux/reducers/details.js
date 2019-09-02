import { GET_DETAILS } from '../actions/types';

const initialState = {
  details: {},
  next_page_available: false,
  next_page_start: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...state,
        details: action.details,
        next_page_available: action.next_page_available,
        next_page_start: action.next_page_start
      }
    default:
      return state;
  }
}