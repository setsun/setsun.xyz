import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Icon from 'react-feather';
import { Flipper } from 'react-flip-toolkit';
import { useTransition, animated } from 'react-spring';
import { Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { FadeTransition, TranslateTransition } from 'react-transition-components';

import Card from '../../components/Card';
import Heading from '../../components/Heading';
import Sunset from '../../components/Sunset';
import withLazy from '../../components/withLazy';

import kickstarterImg from '../../img/kickstarter.png';
import frameImg from '../../img/frame.png';
import jetImg from '../../img/jet.png';
import hubspotImg from '../../img/hubspot.png';
import wayfairImg from '../../img/wayfair.png';

const LazySketches = withLazy(() => import('../Sketches'));

LazySketches.preload();

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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const Loading = () => (
  <LoadingContainer>
    <FadeTransition>
      <Sunset flipId="sunset" />
    </FadeTransition>
  </LoadingContainer>
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

  return (
    <MainContainer>
      <HeaderContainer>
        <Sunset
          flipId="sunset"
          animate={false}
          size={64}
          style={{ marginRight: '1rem' }}
        />

        <FadeTransition>
          <Heading fontSize={3}>
            I am Setsun.
          </Heading>
        </FadeTransition>
      </HeaderContainer>

      <FadeTransition>
        <div>
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
        </div>
      </FadeTransition>
    </MainContainer>
  );
};

const App = ({
  location,
  search,
  history,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;

    setTimeout(() => {
      setLoading(false);
      history.push({ state: { loading: false }});
    }, 3000);
  });

  const isRootPath = location.pathname === '/';

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

      <Route
        exact
        path="/work/:id"
        render={(props) => {
          const item = items.find(i => i.heading.toLowerCase() === props.match.params.id);

          return (
            <Card fullscreen flipId={props.location.pathname}>
              <FadeTransition delay={150}>
                {(style) => (
                  <>
                    <CardHeaderContainer>
                      <Heading fontSize={1.5}>{item.heading}</Heading>
                      <a href={item.link} target="_blank">
                        <WorkImage src={item.image} style={style} />
                      </a>
                      <Link to="/" style={style}>
                        Close <Icon.XCircle style={{ marginLeft: '0.25rem' }} />
                      </Link>
                    </CardHeaderContainer>
                    <p>{item.text}</p>
                    <h3 style={style}>Selected Works</h3>
                    <p style={style}>Coming soon.</p>
                  </>
                )}
              </FadeTransition>
            </Card>
          );
        }}
      />

      <Route
        exact
        path="/sketches/:id"
        render={(props) => (
          <Card fullscreen flipId={props.location.pathname}>
            <LazySketches id={parseInt(props.match.params.id, 10)}/>
          </Card>
        )}
      />

      <FadeTransition delay={100} in={!isRootPath}>
        <Overlay onClick={() => history.push('/')} />
      </FadeTransition>
    </Flipper>
  );
};

export default hot(App);
