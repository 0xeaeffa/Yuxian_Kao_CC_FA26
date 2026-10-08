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

export const Tree2 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      let endpoints: p5.Vector[] = [];
      let pd: number;

      function isOverlap(
        x: number,
        y: number,
        points: p5.Vector[],
        minDist: number,
      ): boolean {
        return points.some((pt) => {
          const dx = x - pt.x;
          const dy = y - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return dist < minDist;
        });
      }

      function branch(h: number, angle: number) {
        h *= 0.78;
        if (h < 4) {
          if (Math.random() < 0.05) {
            p.push();
            p.translate(0, 12);
            const m = p.drawingContext.getTransform();
            pd = p.pixelDensity();

            if (!isOverlap(m.e / pd, m.f / pd, endpoints, 10)) {
              endpoints.push(p.createVector(m.e / pd, m.f / pd));
            }
            p.pop();
          }
          return;
        } else if (h < 32) {
          if (Math.random() < 0.1) {
            if (h > 16) {
              const m = p.drawingContext.getTransform();
              pd = p.pixelDensity();

              endpoints.push(p.createVector(m.e / pd, m.f / pd));
            }
            return;
          }
        }

        p.push();
        let rotateL = p.map(Math.random(), 0, 1, angle * 0.8, angle * 1.1);
        let randomL = p.map(Math.random(), 0, 1, h * 0.96, h * 1.02);

        p.rotate(rotateL);
        p.line(0, 0, 0, randomL);
        p.translate(0, randomL);
        branch(randomL, rotateL - 2);
        p.pop();

        p.push();
        let rotateR = p.map(Math.random(), 0, 1, angle * 0.8, angle * 1.1);
        let randomR = p.map(Math.random(), 0, 1, h * 0.96, h * 1.02);

        p.rotate(-rotateR);
        p.line(0, 0, 0, randomR);
        p.translate(0, randomR);
        branch(randomR, rotateR - 2);
        p.pop();
      }

      function drawTree() {
        endpoints = [];
        p.translate(p.width / 2, p.height / 2);

        p.push();
        p.line(0, 0, 0, 18);
        p.translate(0, 18);
        branch(60, 35);
        p.pop();

        p.push();
        p.rotate(180);
        p.line(0, 0, 0, 18);
        p.translate(0, 18);
        branch(60, 35);
        p.pop();

        p.ellipse(0, 0, 10, 10);
        p.ellipse(0, 0, 5, 5);

        p.resetMatrix();
        for (let i = 0; i < endpoints.length; i++) {
          p.ellipse(endpoints[i].x, endpoints[i].y, 5, 5);
        }
      }

      p.setup = () => {
        p.pixelDensity(1);
        p.createCanvas(384, 576);
        p.angleMode(p.DEGREES);

        p.background('#f6f6f6');
        drawTree();
      };

      p.draw = () => {};

      p.mouseClicked = () => {
        p.clear();

        p.background('#f6f6f6');
        drawTree();
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

export const Tree3 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      let endpoints: p5.Vector[] = [];
      let pd: number;

      function isOverlap(
        x: number,
        y: number,
        points: p5.Vector[],
        minDist: number,
      ): boolean {
        return points.some((pt) => {
          const dx = x - pt.x;
          const dy = y - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return dist < minDist;
        });
      }

      function branch(h: number, angle: number) {
        h *= 0.78;
        if (h < 4) {
          if (Math.random() < 0.03) {
            p.push();
            p.translate(0, 16);
            const m = p.drawingContext.getTransform();
            pd = p.pixelDensity();

            if (!isOverlap(m.e / pd, m.f / pd, endpoints, 10)) {
              endpoints.push(p.createVector(m.e / pd, m.f / pd));
            }
            p.pop();
          }
          return;
        } else if (h < 36) {
          if (Math.random() < 0.1) {
            if (h > 12) {
              p.push();
              p.translate(0, 2.5);
              const m = p.drawingContext.getTransform();
              pd = p.pixelDensity();

              endpoints.push(p.createVector(m.e / pd, m.f / pd));
              p.pop();
            }
            return;
          }
        }

        p.push();
        let rotateL = p.map(Math.random(), 0, 1, angle * 0.8, angle * 1.1);
        let randomL = p.map(Math.random(), 0, 1, h * 0.96, h * 1.02);

        p.rotate(rotateL);
        p.line(0, 0, 0, randomL);
        p.translate(0, randomL);
        branch(randomL, rotateL - 2);
        p.pop();

        p.push();
        let rotateR = p.map(Math.random(), 0, 1, angle * 0.8, angle * 1.1);
        let randomR = p.map(Math.random(), 0, 1, h * 0.96, h * 1.02);

        p.rotate(-rotateR);
        p.line(0, 0, 0, randomR);
        p.translate(0, randomR);
        branch(randomR, rotateR - 2);
        p.pop();
      }

      function drawTree() {
        endpoints = [];
        p.translate(p.width / 2, p.height / 2);

        for (let i = 0; i < 3; i++) {
          p.push();
          p.rotate(i * (360 / 3));
          // p.line(0, 5, 0, 18);
          p.translate(0, 5);
          branch(52, 30);
          p.pop();
        }

        p.ellipse(0, 0, 10, 10);
        p.ellipse(0, 0, 5, 5);

        // p.resetMatrix();
        p.translate((-1 * p.width) / 2, (-1 * p.height) / 2);
        for (let i = 0; i < endpoints.length; i++) {
          p.ellipse(endpoints[i].x, endpoints[i].y, 5, 5);
        }
      }

      p.setup = () => {
        p.pixelDensity(1);
        p.createCanvas(384, 576);
        p.angleMode(p.DEGREES);

        p.background('#f6f6f6');
        p.noFill();
        drawTree();
      };

      p.draw = () => {};

      p.mouseClicked = () => {
        p.clear();

        p.background('#f6f6f6');
        drawTree();
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
