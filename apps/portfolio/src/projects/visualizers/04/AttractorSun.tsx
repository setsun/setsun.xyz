import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Attractor } from "@react-three/rapier-addons";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Mesh } from "three";

interface Props {
  position: [number, number, number];
  color: string;
  radius?: number;
  range?: number;
  strength?: number;
}

export interface AttractorSunRefData {
  sun: Mesh;
  rigidBody: RapierRigidBody;
}

export const AttractorSun = forwardRef<AttractorSunRefData, Props>(
  ({ position, radius = 1, color, range, strength }: Props, ref) => {
    const sunRef = useRef<Mesh>(null!);
    const rigidBodyRef = useRef<RapierRigidBody>(null!);

    useImperativeHandle(ref, () => ({
      get sun() {
        return sunRef.current;
      },
      get rigidBody() {
        return rigidBodyRef.current;
      },
    }));

    return (
      <RigidBody type="fixed" ref={rigidBodyRef} position={position}>
        <Attractor type="linear" range={range} strength={strength} />

        <mesh ref={sunRef}>
          <sphereGeometry args={[radius, 36, 36]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </RigidBody>
    );
  },
);

AttractorSun.displayName = "AttractorSun";
