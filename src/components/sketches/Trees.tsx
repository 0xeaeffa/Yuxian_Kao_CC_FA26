import { useLayoutEffect, useRef } from 'preact/hooks';
import p5 from 'p5';

export const Tree1 = ({ canvasSize = 480 }: { canvasSize?: number }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
			
      function branch(h: number, angle: number) {
        h *= 0.7;
        if (h < 2) {
          return;
        } else if (h < 48) {
          if (Math.random() < 0.1) {
            return;
          }
        }

        p.push();
        let rotateL = p.map(Math.random(), 0, 1, angle * 0.8, angle * 1.2);
        let randomL = p.map(Math.random(), 0, 1, h * 0.9, h * 1.05);

        p.rotate(rotateL);
        p.line(0, 0, 0, randomL);
        p.translate(0, randomL);
        branch(randomL, rotateL - 2);
        p.pop();

        p.push();
        let rotateR = p.map(Math.random(), 0, 1, angle * 0.8, angle * 1.2);
        let randomR = p.map(Math.random(), 0, 1, h * 0.9, h * 1.05);

        p.rotate(-rotateR);
        p.line(0, 0, 0, randomR);
        p.translate(0, randomR);
        branch(randomR, rotateR - 2);
        p.pop();
      }

      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
        p.angleMode(p.DEGREES);

        p.background('#f6f6f6');

        p.translate(p.width / 2, 0);
        p.line(0, 0, 0, 64);
        p.translate(0, 64);
        branch(180, 21);
      };

      p.draw = () => {};

      p.mouseClicked = () => {
        p.clear();
        p.background('#f6f6f6');

        p.translate(p.width / 2, 0);
        p.line(0, 0, 0, 64);
        p.translate(0, 64);
        branch(180, 21);
      };

      p.keyPressed = () => {
        if (p.key == 'p') {
          console.log('save canvas');
          p.saveCanvas('tree.png');
        }
      };
    }, canvasRef.current!);

    return () => instance.remove();
  }, []);

  return <div ref={canvasRef} />;
};

