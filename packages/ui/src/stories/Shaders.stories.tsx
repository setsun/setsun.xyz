import type { Meta, StoryObj } from "@storybook/react";

import { Canvas } from '@react-three/fiber';

import { ShaderPreview } from "@/components/shaders/shader-preview";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Shaders/Showcase",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: () => (
    <Canvas style={{ width: '512px', height: '512px' }}>
      <ShaderPreview />
    </Canvas>
  ),
};
