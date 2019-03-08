import React from 'react';
import styled, { keyframes } from 'styled-components';

const animateSky = keyframes`
  from {
    background-position: 0 60%;
  }

  to {
    background-position: 0 10%;
  }
`;

const animateOcean = keyframes`
  from {
    background-position: 0 50%;
  }

  to {
    background-position: 0 0;
  }
`;

const animateSun = keyframes`
  from {
    top: 5%;
  }

  to {
    top: 55%;
  }
`;

const World = styled.div`
  height: ${({ size }) => `${size}`}px;
  width: ${({ size }) => `${size}`}px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const Sky = styled.div`
  background: radial-gradient(#f6c60c, #be4405);
  height: 65%;
  width: 100%;
  background-size: 100% 200%;
  background-position: 0 10%;
  animation: ${animateSky} ease-in-out;
  animation-fill-mode: forwards;
  animation-duration: ${props => (props.animate ? 2.5 : 0)}s;
`;

const Ocean = styled.div`
  position: relative;
  z-index: 1;
  background: linear-gradient(#10eac8, #006994);
  height: 35%;
  width: 100%;
  background-size: 200% 200%;
  background-position: 0 0;
  animation: ${animateOcean} ease-in-out;
  animation-fill-mode: forwards;
  animation-duration: ${props => (props.animate ? 2.5 : 0)}s;
`;

const Sun = styled.div`
  position: absolute;
  left: calc(50% - 10%); /* center on x-axis */
  top: 55%;
  width: 20%;
  height: 20%;
  border-radius: 50%;
  background: yellow;
  box-shadow: 0 0 20px rgba(242, 239, 136, 0.7);
  animation: ${animateSun} ease-in-out;
  animation-fill-mode: forwards;
  animation-duration: ${props => (props.animate ? 2.5 : 0)}s;
`;

const Sunset = props => (
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
