import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import redux from "./redux";
import thunk from "redux-thunk";
import detectBrowserLanguage from "detect-browser-language";
//redux
import {
  setLocale,
  loadTranslations,
  syncTranslationWithStore,
} from "react-redux-i18n";
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from "history";

const middleware = applyMiddleware(thunk);
const container = document.getElementById("root");
const store = createStore(redux, middleware);
const translations = {
  en: require("assets/lang/en.json"),
  es: require("assets/lang/es.json"),
};
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale(detectBrowserLanguage().substring(0, 2)));

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  container
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

