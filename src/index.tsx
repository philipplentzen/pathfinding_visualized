import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";
import {GlobalStyle} from "./styles/GlobalStyle";
import * as serviceWorker from "./serviceWorker";
import {AlgorithmPage} from "./pages/AlgorithmPage";

ReactDOM.render(
  <React.StrictMode>
      <GlobalStyle />
      <AlgorithmPage />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
