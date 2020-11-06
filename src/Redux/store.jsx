import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import patientReducer from './patientReducer';
import languageReducer from './languageReducer';

const rootReducer = combineReducers({
  patientReducer,
  languageReducer
  
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));

