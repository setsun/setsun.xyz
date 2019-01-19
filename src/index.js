import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Transition } from 'react-spring';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Heading from './components/Heading';
import PulseButton from './components/PulseButton';

const history = createBrowserHistory();

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
  }
`;

const App = () => (
  <Transition
    items={[
      <Heading>Creative Technologist.</Heading>,
      <p>This is an example body paragraph. WebXR and beyond.</p>,
      <PulseButton>Hello</PulseButton>,
    ]}
    keys={item => Math.random()}
    trail={200}
    from={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
    enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
    leave={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
  >
    {item => style => React.cloneElement(item, { style })}
  </Transition>
);

ReactDOM.render(
  <Router history={history}>
    <>
      <GlobalStyle />
      <App />
    </>
  </Router>,
  document.querySelector('#root')
);
