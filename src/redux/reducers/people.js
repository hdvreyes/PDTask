import { GET_PEOPLE, GET_DETAILS } from '../actions/types';

const initialState = {
    people: [],
    details: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PEOPLE:
            return {
                ...state,
                people: action.people
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.details
            }
        default:
            return state;
    }
}