import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import people from './reducers/people';
import details from './reducers/details';

const rootReducer = combineReducers({
    people,
    details
});

let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const storeConfiguration = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default storeConfiguration;