import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import App from './routes/App';

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
    color: inherit;
    text-decoration: none;
    transition: 0.3s color ease-in-out;
    margin: 0 0.25rem;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;

    &:hover {
      color: #808080;
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
    animation: 1.5s lightsOff ease-in-out;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes lightsOff {
    from { background: white; }
    to { background: black; }
  }
`;

const render = () => {
  ReactDOM.render(
    <>
      <GlobalStyle />
      <App />
    </>,
    document.querySelector('#root')
  );
}

render();

export default render;
