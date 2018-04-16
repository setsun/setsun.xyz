import React from 'react';
import { Absolute, Box } from 'rebass';
import { SlideTransition } from 'react-transition-components';

const TOP_SPACING = 24;

const RevealContainer = Box.extend`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.size + TOP_SPACING}px;
  width: ${props => props.size}px;
  border-bottom-left-radius: 100vh;
  border-bottom-right-radius: 100vh;
  overflow: hidden;
`;

const CircleContainer = Box.extend`
  position: absolute;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - ${TOP_SPACING}px);
  border-radius: 100vh;
  background-color: #f2f2f2;
`;

const Reveal = ({ children, size, timeout, delay, ...rest }) => (
  <RevealContainer size={size} {...rest}>
    <CircleContainer>
      <SlideTransition direction="bottom" timeout={timeout} delay={delay}>
        {children}
      </SlideTransition>
    </CircleContainer>
  </RevealContainer>
);

export default Reveal;
