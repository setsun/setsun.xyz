import React from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import { Provider, Flex, Box, Image, Heading, Absolute } from 'rebass';
import { Router } from 'react-router';
import transitionFactory, { opacity } from 'react-transition-factory';
import createBrowserHistory from 'history/createBrowserHistory';

import wayfairLogo from './img/wayfair.png';
import hubspotLogo from './img/hubspot.png';
import jetLogo from './img/jet.png';
import frameLogo from './img/frame.png';
import RedEnsoLogo from './img/red_enso.svg';

import Reveal from './components/Reveal';
import PulseButton from './components/PulseButton';

const history = createBrowserHistory();

const FadeTransition = transitionFactory(opacity);

injectGlobal`
  * {
    box-sizing: border-box;
    font-family: 'Slabo 27px', serif;
  }

  html, body {
    height: 100%;
    margin: 0;
  }
`;

const CenterContainer = Flex.extend.attrs({
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})`
  position: relative;
`;

const NameHeader = styled.h1`
  color: #cc0000;
  text-align: center;
`;

const Title = styled.p`
  text-align: center;
`;

const LogoImage = Image.extend`
  position: relative;
  left: ${props => props.left || 0}px;

  &:hover {
    transition-delay: 0s !important;
    transition-duration: 0.3s !important;
    transform: scale(1.05) !important;
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
            <Reveal m={2} size={240} delay={250}>
              <LogoImage width={204} src={wayfairLogo} />
            </Reveal>
            <Reveal m={2} size={240} delay={350}>
              <LogoImage width={256} src={hubspotLogo} />
            </Reveal>
            <Reveal m={2} size={240} delay={450}>
              <LogoImage width={256} src={jetLogo} />
            </Reveal>
            <Reveal m={2} size={240} delay={550}>
              <LogoImage width={256} src={frameLogo} left={12} />
            </Reveal>
          </Flex>
          <FadeTransition delay={1100}>
            <CenterContainer>
              <RedEnsoLogo width={600} height={600} fill={'#cc0000'} />
              <Absolute>
                <CenterContainer>
                  <NameHeader>Setsun</NameHeader>
                  <Title>Creative Technologist</Title>
                  <PulseButton size={100} children="Enter" />
                </CenterContainer>
              </Absolute>
            </CenterContainer>
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
