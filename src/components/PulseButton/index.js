import React from 'react';
import styled from 'styled-components';

const PulseButton = styled.button`
  position: relative;
  background: red;
  color: white;
  padding: 0;
  border: 0;
  height: ${props => `${props.size}rem`};
  width: ${props => `${props.size}rem`};
  border-radius: 50%;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 1px solid red;
    border-radius: 50%;
    background: transparent;
    transition: 0.3s transform ease-in-out;
  }

  &:hover:before {
    transform: scale(1.1);
  }
`;

PulseButton.defaultProps = {
  size: 6,
};

export default PulseButton;
