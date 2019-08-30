import { GET_PEOPLE } from './types';

export const getPeople = (people) => {
    return dispatch => {
        dispatch({
            type: GET_PEOPLE,
            people: people
        })
    }
}