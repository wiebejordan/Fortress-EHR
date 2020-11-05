import {createStore} from 'redux';
import patientReducer from './patientReducer';

export default createStore(patientReducer);

