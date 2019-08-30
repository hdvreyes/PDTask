import { GET_DETAILS } from './types';

export const getPeople = (person, details) => {
    return dispatch => {
        dispatch({
            type: GET_DETAILS,
            person: person,
            details: details
        })
    }
}