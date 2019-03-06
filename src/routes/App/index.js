import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { useSpring, useTransition, animated } from 'react-spring';
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
  const spring = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  });

  return (
    <LoadingContainer>
      <animated.div style={spring}>
        <Flipped flipId="sunset">
          <Sunset />
        </Flipped>
      </animated.div>
    </LoadingContainer>
  );
};

const Main = () => {
  const items = [
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
  ];
  const transitionSprings = useTransition(items, item => item.heading, {
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    trail: 250,
  });
  const headerSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 100,
  });
  const contentSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <MainContainer>
      <HeaderContainer>
        <Flipped flipId="sunset">
          <Sunset animate={false} size={64} style={{ marginRight: '1rem' }} />
        </Flipped>

        <Heading style={headerSpring} fontSize={3}>
          I am Setsun.
        </Heading>
      </HeaderContainer>

      <animated.div style={contentSpring}>
        <FlexContainer>
          <Heading fontSize={2.5}>Work</Heading>
        </FlexContainer>
        <FlexContainer style={{ maxWidth: '1150px', margin: '0 auto' }}>
          {transitionSprings.map(({ item, props, key }) => (
            <animated.div style={props} key={key}>
              <PortfolioCard>
                <Heading fontSize={1.5}>{item.heading}</Heading>
                <p>{item.text}</p>
              </PortfolioCard>
            </animated.div>
          ))}
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
      </animated.div>
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
