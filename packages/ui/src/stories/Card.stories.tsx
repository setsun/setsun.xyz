import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Rules</CardTitle>
        <CardDescription>What are the rules?</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="text-sm">
          <li>1. Read the rules</li>
          <li>2. ???</li>
          <li>3. Profit</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button>Close</Button>
      </CardFooter>
    </Card>
  ),
};
