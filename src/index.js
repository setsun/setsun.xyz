import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Router, Link } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './App';

const history = createBrowserHistory();

const fadeToBlack = keyframes`
  from {
    background: white;
  }

  to {
    background: black;
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Thasadith', serif;
    font-weight: 300;
  }

  ul {
    padding: 0;
  }

  a {
    text-decoration: none;
    color: white;
    transition: 0.3s color ease-in-out;
    margin: 0 0.25rem;

    &:hover {
      color: #b2b2b2;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    margin: 0;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    color: white;
    animation: 2s ${fadeToBlack} ease-in-out;
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
