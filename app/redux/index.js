import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import Network from './network';
import Auth from './auth';

const rootReducer = combineReducers({
  Network: Network,
  Auth: Auth,
});

const persistConfig = {
  // Root
  key: 'root',
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['Auth'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ['Network'],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(createLogger()));
let persistor = persistStore(store);
export {store, persistor};
