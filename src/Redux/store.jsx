import {createStore} from 'redux';
import patientReducer from './patientReducer';
import languageReducer from './languageReducer';

export default createStore(patientReducer, languageReducer);

