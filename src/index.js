import React from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import { Provider, Flex, Box, Image, Heading, Absolute } from 'rebass';
import { Router } from 'react-router';
import { FadeTransition, SlideTransition } from 'react-transition-components';
import createBrowserHistory from 'history/createBrowserHistory';

import wayfairLogo from './img/wayfair.png';
import hubspotLogo from './img/hubspot.png';
import jetLogo from './img/jet.png';
import frameLogo from './img/frame.png';
import RedEnso from './img/red_enso.svg';

import Reveal from './components/Reveal';
import PulseButton from './components/PulseButton';

const history = createBrowserHistory();

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
  height: 100%;
`;

const NameHeader = styled.h1`
  text-align: center;
  margin: 0;
`;

const Title = styled.h1`
  color: #cc0000;
  text-align: center;
  font-size: 72px;
`;

const LogoImage = Image.extend`
  position: relative;
  left: ${props => props.left || 0}px;

  &:hover {
    transition-delay: 0s !important;
    transition-duration: 0.15s !important;
    transform: scale(1.1) !important;
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
            <Reveal m={2} size={256} timeout={500} delay={250}>
              <LogoImage src={wayfairLogo} />
            </Reveal>
            <Reveal m={2} size={256} timeout={500} delay={450}>
              <LogoImage src={hubspotLogo} />
            </Reveal>
            <Reveal m={2} size={256} timeout={500} delay={650}>
              <LogoImage src={jetLogo} />
            </Reveal>
            <Reveal m={2} size={256} timeout={500} delay={850}>
              <LogoImage src={frameLogo} left={12} />
            </Reveal>
          </Flex>
          <CenterContainer>
            <Reveal m={2} size={400} timeout={500} delay={1250}>
              <div />
            </Reveal>
            <SlideTransition direction="bottom" timeout={500} delay={1250} style={{ height: '100%' }}>
              <Absolute top={12}>
                <CenterContainer>
                  <NameHeader>Setsun</NameHeader>
                  <Title>Creative Technologist</Title>
                  <PulseButton
                    size={100}
                    children="Enter"
                  />
                </CenterContainer>
              </Absolute>
            </SlideTransition>
          </CenterContainer>
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
