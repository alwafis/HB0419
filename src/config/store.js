import { applyMiddleware, createStore, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { Platform } from 'react-native';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import createSagaMiddleware from 'redux-saga';
import listReducer from './reducers';
import listSagas from './sagas';


let composeEnhancers = compose;
const defaultState = {
};

if (__DEV__) {
  composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    require('remote-redux-devtools').composeWithDevTools)({
    name: Platform.OS,
  });
}

const persistConfig = {
  key: "sample-app",
  timeout: 5000,
  storage,
};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const composeStore = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(
  persistReducer(
    persistConfig, 
    listReducer
    ),
  defaultState,
  process.env.NODE_ENV === 'production' ? undefined : composeStore,
);

const persistor = persistStore(store);

sagaMiddleware.run(listSagas);

export { 
  persistor, 
  store 
};
