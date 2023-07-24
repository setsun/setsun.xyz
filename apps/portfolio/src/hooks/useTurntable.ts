import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface Props {
  speed?: number;
  reverse?: boolean;
  axis?: "x" | "y" | "z";
}

export function useTurntable({ speed = 0.01, reverse, axis = "y" }: Props) {
  const ref = useRef<any>(null!);

  useFrame(() => {
    const finalSpeed = reverse ? speed * -1 : speed;

    if (Number.isFinite(ref.current?.rotation?.[axis])) {
      ref.current.rotation[axis] += finalSpeed;
    }
  });

  return ref;
}
