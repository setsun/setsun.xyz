import * as React from 'react';
import { Flipped } from 'react-flip-toolkit';
import styled, { css } from 'styled-components';

type Props = {
  children: React.ReactNode;
  fullscreen?: boolean;
  flipId?: string;
}

const fullscreenCss = css`
  z-index: 999;
  position: fixed;
  top: 7.5%;
  bottom: 7.5%;
  left: 7.5%;
  right: 7.5%;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

const BaseCard = styled.div`
  margin: 0.25rem;
  background: white;
  color: black;

  ${(props: Props) => props.fullscreen && fullscreenCss}
`;

const CardContent = styled.div`
  height: 100%;
  padding: 1rem;
  cursor: ${(props: Props) => !props.fullscreen && 'pointer'};
  width: ${(props: Props) => !props.fullscreen && '300px'};
`;

const Card = ({
  children,
  fullscreen,
  flipId,
}: Props) => (
  <Flipped flipId={flipId}>
    <BaseCard fullscreen={fullscreen}>
      <Flipped inverseFlipId={flipId} scale>
        <CardContent fullscreen={fullscreen}>
          {children}
        </CardContent>
      </Flipped>
    </BaseCard>
  </Flipped>
);

export default Card;
