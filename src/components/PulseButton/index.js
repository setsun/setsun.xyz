import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ButtonCircle } from 'rebass';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.15);
  }

  100% {
    transform: scale(1);
  }
`;

const Button = ButtonCircle.extend`
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: #cc0000;
  color: #fff;
  border: 1px solid #cc0000;

  &:hover {
    background-color: #cc0000;
    color: white;
  }
`;

const Ring = styled.div`
  animation: ${pulse} 3s ease-in-out infinite;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  border-radius: 50%;
  border: 1px solid #cc0000;
`;

export default ({ ...props }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <Button {...props} />
    <Ring />
  </div>
);
