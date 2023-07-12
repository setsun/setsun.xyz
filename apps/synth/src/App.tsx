import { Hydra, generators } from 'hydra-ts';
import REGL from 'regl';
import { useState, useLayoutEffect } from "react";

const regl = REGL();

function App() {
  const [hydra, setHydra] = useState<Hydra>();

  useLayoutEffect(() => {
    const hydra = new Hydra({ regl, width: window.innerWidth, height: window.innerHeight });

    const { sources, outputs, loop } = hydra;

    const { osc } = generators;

    const [o0] = outputs;

    setHydra(hydra);

    osc(4, 0.1, 1.2).out(o0)

    loop.start();
  }, []);

  return null;
}

export default App;
