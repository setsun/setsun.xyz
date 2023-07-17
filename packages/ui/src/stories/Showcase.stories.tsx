import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import patternShader from "@/shaders/pattern.frag";
import { useMemo, useRef } from "react";
import { Mesh } from "three";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Shaders/Showcase",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = () => {
  const { size } = useThree();

  const meshRef = useRef<Mesh>(null!);

  const uniforms = useMemo(
    () => ({
      u_resolution: { value: [size.width, size.height] },
      u_time: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    // @ts-ignore
    meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[size.width, size.height]} />
      <shaderMaterial fragmentShader={patternShader} uniforms={uniforms} />
    </mesh>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: () => {
    return (
      <Canvas>
        <Demo />
      </Canvas>
    );
  },
};
