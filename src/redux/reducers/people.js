import { GET_PEOPLE } from '../actions/types';

const initialState = {
  people: [],
  next_page_available: false,
  next_page_start: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PEOPLE:
      return {
        ...state,
        people: action.people,
        next_page_available: action.next_page_available,
        next_page_start: action.next_page_start
      }
    default:
      return state;
  }
}