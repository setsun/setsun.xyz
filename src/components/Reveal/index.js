import React from 'react';
import { Absolute, Box } from 'rebass';
import transitionFactory, {
  opacity,
  translate,
} from 'react-transition-factory';

const RevealContainer = Box.extend`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  border-radius: 50%;
  padding: 8px;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

const SlideUpTransition = transitionFactory(opacity, translate.bottom);

const Reveal = ({ children, size, delay, ...rest }) => (
  <RevealContainer size={size} {...rest}>
    <SlideUpTransition timeout={500} delay={delay}>
      {children}
    </SlideUpTransition>
  </RevealContainer>
);

export default Reveal;
