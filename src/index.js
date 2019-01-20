import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './App';

const history = createBrowserHistory();

const invert = keyframes`
  from {
    color: black;
    background: white;
  }

  to {
    color: white;
    background: black;
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Thasadith', serif;
    font-weight: 300;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    margin: 0;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    animation: 2.5s ${invert} ease-in-out;
    animation-fill-mode: forwards;
  }
`;

ReactDOM.render(
  <Router history={history}>
    <>
      <GlobalStyle />
      <App />
    </>
  </Router>,
  document.querySelector('#root')
);
