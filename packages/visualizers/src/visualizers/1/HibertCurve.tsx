import { useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { GeometryUtils, Line2 } from 'three-stdlib';
import { Line, LineProps } from '@react-three/drei';
import { Vector3 } from 'three';

interface Props {
  lineProps?: Partial<LineProps>;
  size?: number;
  iterations?: number;
}

export interface HilbertCurveRefData {
  line: Line2;
  points: [number, number, number][];
  vertexColors: [number, number, number][];
}

export const HilbertCurve = forwardRef<HilbertCurveRefData, Props>(
  ({ size = 5, iterations = 1, lineProps }, forwardedRef) => {
    const line = useRef<Line2>(null!);

    const points = useMemo<[number, number, number][]>(
      () =>
        GeometryUtils.hilbert3D(new Vector3(0), size, iterations).map((p) => [
          p.x,
          p.y,
          p.z
        ]),
      [size, iterations]
    );

    const vertexColors = useMemo<[number, number, number][]>(
      () =>
        new Array(points.length)
          .fill(0)
          .map(() => [Math.random(), Math.random(), Math.random()]),
      [points.length]
    );

    // forward ref data for usage for modification, such as for animations
    useImperativeHandle(forwardedRef, () => ({
      get line() {
        return line.current;
      },
      get points() {
        return points;
      },
      get vertexColors() {
        return vertexColors;
      }
    }));

    return (
      <Line
        ref={line}
        color="white"
        lineWidth={1}
        {...lineProps}
        points={points}
        vertexColors={vertexColors}
      />
    );
  }
);

HilbertCurve.displayName = 'HilbertCurve';