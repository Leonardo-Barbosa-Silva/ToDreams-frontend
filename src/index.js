import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';
import {
  persistStore,
  persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import authReducer from './features/auth/authSlice';
import goalsReducer from './features/goals/goalSlice';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'


const persistConfigAuth = { key: 'auth', storage, version: 1 }
const persistConfigGoals = { key: 'goals', storage, version: 1 }
const authReducerPersisted = persistReducer(persistConfigAuth, authReducer)
const goalsReducerPersisted = persistReducer(persistConfigGoals, goalsReducer)

const storePersisted = store(authReducerPersisted, goalsReducerPersisted)

disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={storePersisted}>
      <PersistGate loading={null} persistor={persistStore(storePersisted)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
