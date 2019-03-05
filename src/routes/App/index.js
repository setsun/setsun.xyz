import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Spring, Transition } from 'react-spring/renderprops';
import { hot } from 'react-hot-loader/root';

import Heading from '../../components/Heading';
import PulseButton from '../../components/PulseButton';
import Sunset from '../../components/Sunset';

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
  width: 100%;
  padding: 2rem 1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const PortfolioCard = styled.div`
  width: 300px;
  padding: 1rem;
  margin: 0.5rem;
  background: white;
  color: black;
  transition: 0.3s transform ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.025);
  }
`;

const Loading = () => {
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
};

const Main = () => {
  return (
    <MainContainer>
      <HeaderContainer>
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
      </HeaderContainer>
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {style => (
          <div style={style}>
            <FlexContainer>
              <Heading fontSize={2.5}>Work</Heading>
            </FlexContainer>
            <FlexContainer style={{ maxWidth: '1150px', margin: '0 auto' }}>
              <Transition
                items={[
                  {
                    heading: 'Kickstarter',
                    text: 'Bringing creative projects to life.',
                  },
                  {
                    heading: 'Frame.io',
                    text: 'Video review and collaboration, solved.',
                  },
                  {
                    heading: 'Jet',
                    text: 'Brands and city essentials, all in one place.',
                  },
                  {
                    heading: 'HubSpot',
                    text: 'There’s a better way to grow.',
                  },
                  {
                    heading: 'Wayfair',
                    text: 'A zillion things home.',
                  },
                ]}
                trail={250}
                keys={item => item.heading}
                from={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                leave={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
              >
                {item => style => (
                  <div style={style}>
                    <PortfolioCard>
                      <Heading fontSize={1.5}>{item.heading}</Heading>
                      <p>{item.text}</p>
                    </PortfolioCard>
                  </div>
                )}
              </Transition>
            </FlexContainer>

            <FlexContainer>
              <Heading fontSize={2.5}>Sketches</Heading>
            </FlexContainer>
            <FlexContainer style={{ maxWidth: '1150px', margin: '0 auto' }}>
              Coming Soon
            </FlexContainer>

            <FlexContainer>
              <Heading fontSize={2.5}>Social</Heading>
            </FlexContainer>
            <FlexContainer
              style={{
                maxWidth: '1150px',
                margin: '0 auto',
                flexDirection: 'column',
              }}
            >
              <a href="https://github.com/setsun">https://github.com/setsun</a>
              <a href="https://linkedin.com/in/setsun">
                https://linkedin.com/in/setsun
              </a>
            </FlexContainer>
          </div>
        )}
      </Spring>
    </MainContainer>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 3000);
    }
  });

  return (
    <Flipper flipKey={loading}>{loading ? <Loading /> : <Main />}</Flipper>
  );
};

export default hot(App);
