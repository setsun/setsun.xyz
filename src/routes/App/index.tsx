import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Icon from 'react-feather';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { useSpring, useTransition, animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import { Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Card from '../../components/Card';
import Heading from '../../components/Heading';
import Sunset from '../../components/Sunset';

import { fadeIn } from '../../animations/springs';

const AnimatedHeading = animated(Heading);

const WorkLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
`;

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

const CardHeaderContainer = styled(HeaderContainer)`
  justify-content: space-between;
`

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const Loading = () => {
  const spring = useSpring({
    ...fadeIn,
    duration: 300,
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

const WorkRoute = ({ items }) => (
  <Route
    path="/work/:id"
    exact
    render={(props) => (
      <Card fullscreen flipId={props.location.pathname}>
        <CardHeaderContainer>
          <Heading fontSize={1.5}>{items.find(i => i.heading.toLowerCase() === props.match.params.id).heading}</Heading>
          <Spring {...fadeIn} delay={1000}>
            {spring => (
              <WorkLink to="/" style={spring}>
                Close <Icon.XCircle style={{ marginLeft: '0.25rem' }} />
              </WorkLink>
            )}
          </Spring>
        </CardHeaderContainer>
        <p>{items.find(i => i.heading.toLowerCase() === props.match.params.id).text}</p>
        <h3>Selected Works</h3>
        <p>Coming soon.</p>
      </Card>
    )}
  />
);

const Main = ({
  items,
  location,
}) => {
  const transitionSprings = useTransition(items, item => item.heading, {
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    trail: 300,
  });
  const headingSpring = useSpring({
    ...fadeIn,
    delay: 100,
  });
  const contentSpring = useSpring({
    ...fadeIn,
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
          {transitionSprings.map(({ item, props, key }) => {
            const pathname = `/work/${item.heading.toLowerCase()}`;

            if (location.pathname === pathname) return null;

            return (
              <animated.div style={props} key={key}>
                <WorkLink to={pathname}>
                  <Card flipId={pathname}>
                    <Heading fontSize={1.5}>{item.heading}</Heading>
                    <p>{item.text}</p>
                  </Card>
                </WorkLink>
              </animated.div>
            );
          })}
        </FlexContainer>

        <FlexContainer>
          <Heading fontSize={2.5}>Projects</Heading>
        </FlexContainer>
        <FlexContainer style={{ maxWidth: '1150px', margin: '0 auto' }}>
          Coming soon.
        </FlexContainer>


        <FlexContainer>
          <Heading fontSize={2.5}>Sketches</Heading>
        </FlexContainer>
        <FlexContainer style={{ maxWidth: '1150px', margin: '0 auto' }}>
          Coming soon.
        </FlexContainer>

        <FlexContainer>
          <Heading fontSize={2.5}>Connect</Heading>
        </FlexContainer>
        <FlexContainer
          style={{
            maxWidth: '1150px',
            margin: '0 auto',
            flexDirection: 'column',
          }}
        >
          <a href="https://github.com/setsun" target="_blank">https://github.com/setsun</a>
          <a href="https://linkedin.com/in/setsun" target="_blank">
            https://linkedin.com/in/setsun
          </a>
        </FlexContainer>
      </animated.div>
    </MainContainer>
  );
};

const App = ({
  location,
  search,
  history,
}) => {
  const [loading, setLoading] = useState(true);

  const finishLoadingEffect = () => {
    if (!loading) return;

    setTimeout(() => {
      setLoading(false);
      history.push({ state: { loading: false }});
    }, 3000);
  };

  useEffect(finishLoadingEffect);

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
  ]

  return (
    <Flipper
      flipKey={loading || location}
      decisionData={{
        location,
        search
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <Main
          location={location}
          items={items}
        />
      )}

      <WorkRoute items={items} />
    </Flipper>
  );
};

export default hot(App);
