import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  size?: number;
  animate?: boolean;
  style?: Object;
};

const World = styled.div<Props>`
  z-index: 0;
  height: ${({ size }) => `${size}`}px;
  width: ${({ size }) => `${size}`}px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const animateSky = keyframes`
  from { background-position: 0 60%; }
  to { background-position: 0 10%; }
`;

const Sky = styled.div<Props>`
  background: radial-gradient(#f6c60c, #be4405);
  height: 65%;
  width: 100%;
  background-size: 100% 200%;
  background-position: 0 60%;
  animation: ${animateSky} ease-in-out;
  animation-duration: ${props => (props.animate ? 2 : 0)}s;
  animation-delay: ${props => (props.animate ? 0.3 : 0)}s;
  animation-fill-mode: forwards;
`;

const animateOcean = keyframes`
  from { background-position: 0 50%; }
  to { background-position: 0 0; }
`;

const Ocean = styled.div<Props>`
  z-index: 1;
  position: relative;
  background: linear-gradient(#10eac8, #006994);
  height: 35%;
  width: 100%;
  background-size: 200% 200%;
  background-position: 0 50%;
  animation: ${animateOcean} ease-in-out;
  animation-duration: ${props => (props.animate ? 2 : 0)}s;
  animation-delay: ${props => (props.animate ? 0.3 : 0)}s;
  animation-fill-mode: forwards;
`;

const animateSun = keyframes`
  from { top: 5%; }
  to { top: 55%; }
`;

const Sun = styled.div<Props>`
  position: absolute;
  left: calc(50% - 10%); /* center on x-axis */
  top: 5%;
  width: 20%;
  height: 20%;
  border-radius: 50%;
  background: yellow;
  box-shadow: 0 0 20px rgba(242, 239, 136, 0.7);
  animation: ${animateSun} ease-in-out;
  animation-duration: ${props => (props.animate ? 2 : 0)}s;
  animation-delay: ${props => (props.animate ? 0.3 : 0)}s;
  animation-fill-mode: forwards;
`;

const Sunset = (props: Props) => (
  <World {...props}>
    <Sun animate={props.animate} />
    <Sky animate={props.animate} />
    <Ocean animate={props.animate} />
  </World>
);

Sunset.defaultProps = {
  animate: true,
  size: 320,
};

export default Sunset;
