import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle, keyframes } from 'styled-components';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './routes/App';

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
    animation: 1.5s ${fadeToBlack} ease-in-out;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
  }
`;

const render = () => {
  ReactDOM.render(
    <>
      <GlobalStyle />
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </>,
    document.querySelector('#root')
  );
}

render();

export default render;