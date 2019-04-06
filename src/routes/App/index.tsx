import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Icon from 'react-feather';
import { Flipper } from 'react-flip-toolkit';
import { useSpring, useTransition, animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import { Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Card from '../../components/Card';
import Heading from '../../components/Heading';
import Sunset from '../../components/Sunset';

import Sketches from '../Sketches';

import { fadeIn } from '../../animations/springs';

import kickstarterImg from '../../img/kickstarter.png';
import frameImg from '../../img/frame.png';
import jetImg from '../../img/jet.png';
import hubspotImg from '../../img/hubspot.png';
import wayfairImg from '../../img/wayfair.png';

const AnimatedHeading = animated(Heading);

const WorkImage = styled.img`
  height: 24px;
  width: auto;
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

const Overlay = animated(
  styled.div`
    z-index: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  `
);

const slideTransition = {
  from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
  enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
};

const Loading = () => {
  const spring = useSpring({
    ...fadeIn,
    duration: 300,
  });

  return (
    <LoadingContainer>
      <animated.div style={spring}>
        <Sunset flipId="sunset" />
      </animated.div>
    </LoadingContainer>
  );
};

const SketchesRoute = () => (
  <Route
    path="/sketches/:id"
    exact
    render={(props) => {
      return (
        <Card fullscreen flipId={props.location.pathname}>
          <Sketches />
        </Card>
      );
    }}
  />
);

const WorkRoute = ({ items }) => (
  <Route
    path="/work/:id"
    exact
    render={(props) => {
      const item = items.find(i => i.heading.toLowerCase() === props.match.params.id);

      return (
        <Card fullscreen flipId={props.location.pathname}>
          <Spring {...fadeIn} delay={600}>
            {spring => (
              <>
                <CardHeaderContainer>
                  <Heading fontSize={1.5}>{item.heading}</Heading>
                  <a href={item.link} target="_blank">
                    <WorkImage src={item.image} style={spring} />
                  </a>
                  <Link to="/" style={spring}>
                    Close <Icon.XCircle style={{ marginLeft: '0.25rem' }} />
                  </Link>
                </CardHeaderContainer>
                <p>{item.text}</p>
                <h3 style={spring}>Selected Works</h3>
                <p style={spring}>Coming soon.</p>
              </>
            )}
          </Spring>
        </Card>
      );
    }}
  />
);

const Main = ({
  items,
  location,
}) => {
  const transitionSprings = useTransition(items, item => item.heading, {
    ...slideTransition,
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
        <Sunset
          flipId="sunset"
          animate={false}
          size={64}
          style={{ marginRight: '1rem' }}
        />

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
                <Link to={pathname}>
                  <Card flipId={pathname}>
                    <Heading fontSize={1.5}>{item.heading}</Heading>
                    <p>{item.text}</p>
                  </Card>
                </Link>
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

  const isRootPath = location.pathname === '/';

  const overlaySpring = useTransition(!isRootPath, null, {
    from: { opacity: 0, },
    enter: { opacity: 1 },
    leave: { opacity: 0, },
    trail: 300,
  });

  const items = [
    {
      heading: 'Kickstarter',
      text: 'Bringing creative projects to life.',
      link: 'https://kickstarter.com',
      image: kickstarterImg,
    },
    {
      heading: 'Frame.io',
      text: 'Video review and collaboration, solved.',
      link: 'https://frame.io',
      image: frameImg,
    },
    {
      heading: 'Jet',
      text: 'Brands and city essentials, all in one place.',
      link: 'https://jet.com',
      image: jetImg,
    },
    {
      heading: 'HubSpot',
      text: 'There’s a better way to grow.',
      link: 'https://hubspot.com',
      image: hubspotImg,
    },
    {
      heading: 'Wayfair',
      text: 'A zillion things home.',
      link: 'https://wayfair.com',
      image: wayfairImg,
    },
  ];

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

      <SketchesRoute />

      {overlaySpring.map(({ item, props }) => item && (
        <Overlay
          style={props}
          onClick={() => history.push('/')}
        />
      ))}
    </Flipper>
  );
};

export default hot(App);
