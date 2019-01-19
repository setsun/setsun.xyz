import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  display: table;
  position: relative;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: 4em;

  :before {
    content: '';
    position: absolute;
    bottom: 2%;
    width: 35%;
    height: 2px;
    background: red;
  }
`;

export default Heading;
