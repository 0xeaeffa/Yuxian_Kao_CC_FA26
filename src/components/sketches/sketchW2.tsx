import { useLayoutEffect, useRef } from 'preact/hooks';
import { mapRange } from '../../utils';
import p5 from 'p5';

function tilesGen(
  p: p5,
  tileSize: number,
  tileAmount: number,
  gap: number,
  rotate: number,
  bg: number = 248,
) {
  p.background(bg);

  let tileXPos = gap;
  let tileYPos = gap;
  for (let i = 0; i < tileAmount; i++) {
    for (let j = 0; j < tileAmount; j++) {
      p.push();
      p.translate(tileXPos + tileSize / 2, tileYPos + tileSize / 2);
      p.rotate(mapRange(Math.random(), 0, 1, -1 * rotate, rotate));

      let r = mapRange(Math.random(), 0, 1, 220, 230);
      let g = mapRange(Math.random(), 0, 1, 220, 250);
      let b = mapRange(Math.random(), 0, 1, 230, 255);
      p.fill(r, g, b);
      p.stroke(r - 64, g - 64, b - 64);

      p.translate(-(tileXPos + tileSize / 2), -(tileYPos + tileSize / 2));
      p.square(tileXPos, tileYPos, tileSize);

      tileXPos += tileSize + gap;
      p.pop();
    }
    tileXPos = gap;
    tileYPos += tileSize + gap;
  }
}

export const SketchW2_1 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      const canvasSize = 480;
      const gap = 8;
      const tileAmount = 8;
      const tileSize = (canvasSize - gap * (tileAmount + 1)) / tileAmount;
      const tileRotate = 4;
      const bgColor = 255;

      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
        p.angleMode(p.DEGREES);

        tilesGen(p, tileSize, tileAmount, gap, tileRotate, bgColor);
      };

      p.draw = () => {
        // p.ellipse(p.mouseX, p.mouseY, 100, 50);
      };

      p.mouseClicked = () => {
        p.clear();
        tilesGen(p, tileSize, tileAmount, gap, tileRotate, bgColor);
      };
    }, canvasRef.current!);

    return () => instance.remove();
  }, []);

  return <div ref={canvasRef} />;
};

export const SketchW2_2 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      p.setup = () => {
        p.createCanvas(400, 400);
      };

      p.draw = () => {
        p.background(220);
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
      };
    }, canvasRef.current!);

    return () => instance.remove();
  }, []);

  return <div ref={canvasRef} />;
};

export const SketchW2_3 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      p.setup = () => {
        p.createCanvas(400, 400);
      };

      p.draw = () => {
        p.background(220);
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
      };
    }, canvasRef.current!);

    return () => instance.remove();
  }, []);

  return <div ref={canvasRef} />;
};
