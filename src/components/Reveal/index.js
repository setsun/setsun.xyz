import React from 'react';
import styled from 'styled-components';
import { Absolute } from 'rebass';
import transitionFactory, {
  opacity,
  translate,
} from 'react-transition-factory';

const RevealContainer = styled.div`
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

const Reveal = ({ children, size }) => (
  <RevealContainer size={size}>
    <SlideUpTransition timeout={500} delay={250}>
      {children}
    </SlideUpTransition>
  </RevealContainer>
);

export default Reveal;
