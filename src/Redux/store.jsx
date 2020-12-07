import {createStore, combineReducers, applyMiddleware} from 'redux';
import patientReducer from './patientReducer';
import languageReducer from './languageReducer';
import authReducer from './authReducer';
import idleReducer from './idleReducer';
import visReducer from './visReducer';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['patientReducer']
}

const rootReducer = combineReducers({
  patientReducer,
  languageReducer,
  authReducer,
  idleReducer,
  visReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);


