import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/components/ui/input";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: (args) => <Input {...args} />,
  args: {
    type: "text",
    disabled: false,
    placeholder: "Enter text here",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "tel", "number", "password", "file"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export const FileType: Story = {
  render: (args) => <Input type="file" {...args} />,
};
