import { DoubleSide } from "three";

import { useTurntable } from "@/hooks/useTurntable";

const WireframePlanet = () => {
  const ringOneTurntable = useTurntable({ speed: 0.001, axis: "x" });
  const ringTwoTurntable = useTurntable({
    speed: 0.001,
    axis: "x",
    reverse: true,
  });
  const ringThreeTurntable = useTurntable({ speed: 0.001, axis: "y" });
  const ringFourTurntable = useTurntable({
    speed: 0.001,
    axis: "y",
    reverse: true,
  });
  const planetTurntable = useTurntable({
    speed: 0.0025,
    axis: "x",
    reverse: true,
  });

  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]} ref={ringOneTurntable}>
        <ringGeometry args={[15.95, 16, 100, 100]} />
        <meshBasicMaterial attach="material" color="white" side={DoubleSide} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={ringTwoTurntable}>
        <ringGeometry args={[15.95, 16, 100, 100]} />
        <meshBasicMaterial attach="material" color="white" side={DoubleSide} />
      </mesh>

      <mesh rotation={[0, -Math.PI / 2, 0]} ref={ringThreeTurntable}>
        <ringGeometry args={[15.95, 16, 100, 100]} />
        <meshBasicMaterial attach="material" color="white" side={DoubleSide} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]} ref={ringFourTurntable}>
        <ringGeometry args={[15.95, 16, 100, 100]} />
        <meshBasicMaterial attach="material" color="white" side={DoubleSide} />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <ringGeometry args={[15.95, 16, 100, 100]} />
        <meshBasicMaterial attach="material" color="white" side={DoubleSide} />
      </mesh>

      <mesh ref={planetTurntable}>
        <dodecahedronGeometry args={[10, 10]} />
        <meshNormalMaterial attach="material" wireframe />
      </mesh>
    </>
  );
};

export default WireframePlanet;
