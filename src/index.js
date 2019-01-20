import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Transition } from 'react-spring';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Heading from './components/Heading';
import PulseButton from './components/PulseButton';
import Sunset from './components/Sunset';

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
    padding: 0;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
`;

const Card = styled.div`
  background: white;
  /* box-shadow: 2px 2px 8px 6px #ccc; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 2rem;
  transition: 0.3s all ease-in-out;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNext: false,
    };
    setTimeout(() => this.setState({ showNext: true }), 3000);
  }

  render() {
    return (
      <Center>
        <Card>
          <Flipper flipKey={this.state.showNext}>
            {!this.state.showNext ? (
              <Transition
                items={[
                  <div>
                    <Flipped flipId="sunset">
                      <Sunset />
                    </Flipped>
                  </div>,
                  <div>
                    <Flipped flipId="heading">
                      <Heading>I am Setsun.</Heading>
                    </Flipped>
                  </div>,
                ]}
                keys={item => Math.random()}
                trail={300}
                from={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                leave={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
              >
                {item => style => React.cloneElement(item, { style })}
              </Transition>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Flipped flipId="sunset">
                  <Sunset animate={false} style={{ marginRight: '1rem' }} />
                </Flipped>
                ,
                <Flipped flipId="heading">
                  <Heading animate={false}>I am Setsun.</Heading>
                </Flipped>
              </div>
            )}
          </Flipper>
        </Card>
      </Center>
    );
  }
}

ReactDOM.render(
  <Router history={history}>
    <>
      <GlobalStyle />
      <App />
    </>
  </Router>,
  document.querySelector('#root')
);
