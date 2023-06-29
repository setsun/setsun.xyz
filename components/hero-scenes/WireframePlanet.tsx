import { PerspectiveCamera } from '@react-three/drei';
import { DoubleSide } from 'three';
import { useTurntable } from '../../hooks/useTurntable';

const WireframePlanet = () => {
  const ringOneTurntable = useTurntable({ speed: 0.0001 });
  const ringTwoTurntable = useTurntable({ speed: 0.0001 });
  const planetTurntable = useTurntable({ speed: 0.0001, reverse: true });

  return (
    <>
      {/* <PerspectiveCamera
        makeDefault
        args={[75, window.innerWidth / window.innerHeight, 0.01, 5000]}
        position={[550, 325, -500]}
      /> */}

      <mesh rotation={[0, Math.PI / 2, 0]} ref={ringOneTurntable}>
        <ringGeometry args={[15.5, 16, 100, 100]} />
        <meshBasicMaterial attach="material" color="white" side={DoubleSide} />
      </mesh>

      <mesh ref={ringTwoTurntable}>
        <ringGeometry args={[15.5, 16, 100, 100]} />
        <meshBasicMaterial attach="material" color="white" side={DoubleSide} />
      </mesh>

      <mesh ref={planetTurntable}>
        <dodecahedronGeometry args={[10, 10]} />
        <meshBasicMaterial attach="material" color="#fff" wireframe />
      </mesh>
    </>
  )
}

export default WireframePlanet;