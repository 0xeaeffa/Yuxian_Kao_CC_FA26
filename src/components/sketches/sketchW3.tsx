import { useLayoutEffect, useRef } from 'preact/hooks';
import p5 from 'p5';

function waveGen(
  p: p5,
  width: number,
  YPos: number,
  pointAmount: number,
  amplitude: number,
  waveScale: number,
  waveX: number = 0,
  waveYShift: number = 0,
) {
  const startInterval = width / pointAmount;
  const endXPos = 0 - waveScale / 2;
  const endInterval = (width + waveScale) / pointAmount;

  for (let i = 0; i <= pointAmount; i++) {
    const startPos = p.createVector(i * startInterval, YPos);
    const endPos = p.createVector(
      endXPos + i * endInterval,
      YPos + waveYShift - amplitude * Math.cos(0.3 * (i + waveX)),
    );

    p.line(startPos.x, startPos.y, endPos.x, endPos.y);
    p.ellipse(startPos.x, startPos.y, 2, 2);
    p.ellipse(endPos.x, endPos.y, 6, 6);
  }
}

export const SketchW3_1 = ({ canvasSize = 480 }: { canvasSize?: number }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      const bgColor = '#f6f6f6';
      const lineAmount = 48;
      const amplitude = 36;
      const waveScale = 36;

      let waveX = 0;

      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
      };

      p.draw = () => {
        p.background(bgColor);

        const YPos = canvasSize / 2;
        waveGen(p, canvasSize, YPos, lineAmount, amplitude, waveScale, waveX);

        const TopYPos = canvasSize * 0.2;
        waveGen(
          p,
          canvasSize,
          TopYPos,
          lineAmount,
          amplitude * 0.7,
          waveScale,
          waveX + 10,
          -20,
        );

        const BotYPos = canvasSize * 0.8;
        waveGen(
          p,
          canvasSize,
          BotYPos,
          lineAmount,
          amplitude * 0.7,
          waveScale,
          waveX + 10,
          20,
        );

        waveX += -0.25;
      };
    }, canvasRef.current!);

    return () => instance.remove();
  }, []);

  return <div ref={canvasRef} />;
};

export const SketchW3_2 = ({ canvasSize = 480 }: { canvasSize?: number }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      const bgColor = '#f0f0f0';

      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
        p.background(bgColor);
      };

      p.draw = () => {
        p.ellipse(canvasSize / 2, canvasSize / 2, 10, 10);
      };
    }, canvasRef.current!);

    return () => instance.remove();
  }, []);

  return <div ref={canvasRef} />;
};

export const SketchW3_3 = ({ canvasSize = 480 }: { canvasSize?: number }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      const bgColor = '#f0f0f0';

      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
        p.background(bgColor);
      };

      p.draw = () => {
        p.ellipse(canvasSize / 2, canvasSize / 2, 10, 10);
      };
    }, canvasRef.current!);

    return () => instance.remove();
  }, []);

  return <div ref={canvasRef} />;
};
