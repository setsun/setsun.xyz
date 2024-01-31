import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";

const MAX_LINES = 30;

type LineParameters = [x1: number, y1: number, x2: number, y2: number];

const ScreenSaver: Sketch = (p5) => {
  const startTime = p5.millis();

  function getParametricLineOne(t: number): LineParameters {
    const x1 = p5.sin(t / 500) * 200;
    const x2 = p5.cos(t / 500) * 300;
    const y1 = p5.sin(t / 1000) * 100;
    const y2 = p5.cos(t / 2000) * 200;

    return [x1, x2, y1, y2];
  }

  function getParametricLineTwo(t: number): LineParameters {
    const x1 = p5.sin(t / 500) * 100;
    const x2 = -p5.cos(t / 500) * 300;
    const y1 = p5.sin(t / 1000) * 400;
    const y2 = -p5.cos(t / 2000) * 200;

    return [x1, x2, y1, y2];
  }

  function getParametricLineThree(t: number): LineParameters {
    const x1 = -p5.sin(t / 500) * 100;
    const x2 = p5.sin(t / 500) * 500;
    const y1 = -p5.sin(t / 1000) * 400;
    const y2 = p5.cos(t / 2000) * 100;

    return [x1, x2, y1, y2];
  }

  function getParametricLineFour(t: number): LineParameters {
    const x1 = -p5.sin(t / 500) * 100;
    const x2 = -p5.sin(t / 500) * 500;
    const y1 = -p5.sin(t / 500) * 400;
    const y2 = -p5.cos(t / 200) * 100;

    return [x1, x2, y1, y2];
  }

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
  };

  p5.draw = () => {
    const elapsedTime = p5.millis() - startTime;

    p5.background("black");

    p5.translate(p5.width / 2, p5.height / 2);

    p5.strokeWeight(1);

    for (let i = 0; i < MAX_LINES; i++) {
      const staggerFactor = -(i * 25);

      p5.stroke("#00FF00");

      p5.line(...getParametricLineOne(elapsedTime + staggerFactor));
    }

    for (let i = 0; i < MAX_LINES; i++) {
      const staggerFactor = -(i * 25);

      p5.stroke("#FFFF00");

      p5.line(...getParametricLineTwo(elapsedTime + staggerFactor));
    }

    for (let i = 0; i < MAX_LINES; i++) {
      const staggerFactor = -(i * 25);

      p5.stroke("#FF0000");

      p5.line(...getParametricLineThree(elapsedTime + staggerFactor));
    }

    for (let i = 0; i < MAX_LINES; i++) {
      const staggerFactor = -(i * 25);

      p5.stroke("#0000FF");

      p5.line(...getParametricLineFour(elapsedTime + staggerFactor));
    }

    p5.filter(p5.DILATE);
  };
};

const Visualizer = () => <ReactP5Wrapper sketch={ScreenSaver} />;

export default Visualizer;
