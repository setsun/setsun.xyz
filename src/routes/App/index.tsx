import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { useSpring, useTransition, animated } from 'react-spring';
import { Link } from 'react-router-dom'
import { hot } from 'react-hot-loader/root';

import Heading from '../../components/Heading';
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

const WorkLink = styled(Link)`
  padding: 0;
  margin: 0;
`;

const AnimatedHeading = animated(Heading)

const Loading = () => {
  const spring = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    delay: 100,
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

const Main = ({ items }) => {
  const transitionSprings = useTransition(items, item => item.heading, {
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    trail: 300,
  });
  const headingSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 100,
  });
  const contentSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 300,
  });

  return (
    <MainContainer>
      <HeaderContainer>
        <Flipped flipId="sunset">
          <Sunset animate={false} size={64} style={{ marginRight: '1rem' }} />
        </Flipped>

        <AnimatedHeading style={headingSpring} fontSize={3}>
          I am Setsun.
        </AnimatedHeading>
      </HeaderContainer>

      <animated.div style={contentSpring}>
        <FlexContainer>
          <Heading fontSize={2.5}>Work</Heading>
        </FlexContainer>
        <FlexContainer style={{ maxWidth: '1150px', margin: '0 auto' }}>
          {transitionSprings.map(({ item, props, key }) => (
            <animated.div style={props} key={key}>
              <WorkLink to={`/work/${item.heading.toLowerCase()}`}>
                <PortfolioCard>
                  <Heading fontSize={1.5}>{item.heading}</Heading>
                  <p>{item.text}</p>
                </PortfolioCard>
              </WorkLink>
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
  const finishLoadingEffect = () => {
    if (loading) setTimeout(() => setLoading(false), 3000);
  };

  useEffect(finishLoadingEffect);

  return (
    <Flipper flipKey={loading}>
      {loading ? (
        <Loading />
      ) : (
        <Main
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
        />
      )}
    </Flipper>
  );
};

export default hot(App);
