import { Canvas } from "@react-three/fiber";
import type { Meta, StoryObj } from "@storybook/react";

import { ShaderPreview } from "@/components/shaders/shader-preview";
import practiceFrag from "@/shaders/practice.frag";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Shaders/Showcase",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: () => (
    <Canvas style={{ width: "512px", height: "512px" }}>
      <ShaderPreview vertexShader={practiceFrag} />
    </Canvas>
  ),
};
