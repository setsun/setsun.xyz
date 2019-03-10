import styled, { keyframes } from 'styled-components';

type Props = {
  fontSize?: number;
  animate?: boolean;
}

const animateUnderline = keyframes`
  from {
    width: 0
  }

  to {
    width: 35%;
  }
`;

const Heading = styled.h1<Props>`
  display: table;
  position: relative;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: ${({ fontSize }) => fontSize}rem;
  overflow: hidden;

  :before {
    content: '';
    position: absolute;
    bottom: 2%;
    height: 2px;
    background: red;
    animation: ${animateUnderline} ease-in-out;
    animation-duration: ${props => (props.animate ? 2 : 0)}s;
    animation-fill-mode: forwards;
  }
`;

Heading.defaultProps = {
  animate: true,
  fontSize: 3,
};

export default Heading;
