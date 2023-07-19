import type { Meta, StoryObj } from "@storybook/react";

import { Html, Icosahedron, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Spatial/Showcase",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const HeadsUpDisplay = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { toast } = useToast();

  return (
    <Html transform>
      <div>
        <Button
          size="lg"
          className="mr-4"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            });
          }}
        >
          Open Toast
        </Button>

        <Dialog>
          <DialogTrigger>
            <Button size="lg">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="mt-4 block rounded-md border"
        />
      </div>

      <Toaster />
    </Html>
  );
};

const Demo = () => {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{
        type: "PerspectiveCamera",
        fov: 75,
        position: [0, 0, 20],
      }}
    >
      <color attach="background" args={["#000"]} />

      <Icosahedron args={[10, 10]}>
        <meshNormalMaterial wireframe />
        <HeadsUpDisplay />
      </Icosahedron>

      <OrbitControls />
    </Canvas>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: () => <Demo />,
};
