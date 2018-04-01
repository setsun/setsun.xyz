import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { Provider, Flex, Box, Image, Heading } from 'rebass';
import { Router } from 'react-router';
import transitionFactory, { opacity } from 'react-transition-factory';
import createBrowserHistory from 'history/createBrowserHistory';

import wayfairLogo from './img/wayfair.png';
import hubspotLogo from './img/hubspot.png';
import jetLogo from './img/jet.png';
import frameLogo from './img/frame.png';

import Reveal from './components/Reveal';

const history = createBrowserHistory();

const FadeTransition = transitionFactory(opacity);

injectGlobal`
  * {
    box-sizing: border-box;
    font-family: 'Slabo 27px', serif;
  }

  html, body {
    height: 100%;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FadeTransition>
        <div style={{ height: '100%' }}>
          <Flex
            flexWrap="wrap"
            alignContent="space-around"
            justifyContent="center"
          >
            <Box m={2}>
              <Reveal size={256} delay={250}>
                <Image width={128} src={wayfairLogo} />
              </Reveal>
            </Box>
            <Box m={2}>
              <Reveal size={256} delay={350}>
                <Image width={128} src={hubspotLogo} />
              </Reveal>
            </Box>
            <Box m={2}>
              <Reveal size={256} delay={450}>
                <Image width={128} src={jetLogo} />
              </Reveal>
            </Box>
            <Box m={2}>
              <Reveal size={256} delay={550}>
                <Image width={128} src={frameLogo} />
              </Reveal>
            </Box>
          </Flex>
          <FadeTransition delay={1100}>
            <h1 style={{ textAlign: 'center' }}>Coming Soon</h1>
          </FadeTransition>
        </div>
      </FadeTransition>
    );
  }
}

ReactDOM.render(
  <Provider>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root')
);
