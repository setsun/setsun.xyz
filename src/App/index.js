import React from 'react';
import styled from 'styled-components';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Spring } from 'react-spring';
import { hot } from 'react-hot-loader/root';

import Heading from '../components/Heading';
import PulseButton from '../components/PulseButton';
import Sunset from '../components/Sunset';

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 2rem;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNext: false,
    };
    setTimeout(() => this.setState({ showNext: true }), 3000);
  }

  renderLoadingState() {
    return (
      <LoadingContainer>
        <Spring
          from={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
          to={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
        >
          {style => (
            <div style={style}>
              <Flipped flipId="sunset">
                <Sunset />
              </Flipped>
            </div>
          )}
        </Spring>
      </LoadingContainer>
    );
  }

  renderMain() {
    return (
      <MainContainer>
        <Flipped flipId="sunset">
          <Sunset animate={false} size={64} style={{ marginRight: '1rem' }} />
        </Flipped>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} delay={100}>
          {style => (
            <Heading style={style} fontSize={3}>
              I am Setsun.
            </Heading>
          )}
        </Spring>
      </MainContainer>
    );
  }

  render() {
    return (
      <Flipper flipKey={this.state.showNext}>
        {!this.state.showNext ? this.renderLoadingState() : this.renderMain()}
      </Flipper>
    );
  }
}

export default hot(App);
