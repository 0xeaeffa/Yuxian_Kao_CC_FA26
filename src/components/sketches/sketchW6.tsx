import { useLayoutEffect, useRef } from 'preact/hooks';
import p5 from 'p5';
import { getDocumentRem } from '../../utils';

const rem = getDocumentRem();

class Fish {
  p: p5;
  length: number;
  strokeWidth: number;
  strokeColor: p5.Color;
  fillColor: p5.Color;
  padding: number;
  buffer: p5.Graphics;

  constructor(
    p: p5,
    length: number = 100,
    strokeWidth: number = 2,
    strokeColor?: p5.Color,
    fillColor?: p5.Color,
  ) {
    this.p = p;
    this.length = length;
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor ? strokeColor : p.color(0);
    this.fillColor = fillColor ? fillColor : p.color(255);

    this.padding = 20;
    const bufferW = 60 + this.padding * 2;
    const bufferH = this.length + this.padding * 2;
    this.buffer = this.p.createGraphics(bufferW, bufferH);
    this.buffer.pixelDensity(1);
    this.renderStatic();
  }

  private shape(g: p5.Graphics) {
    g.fill(this.fillColor);
    g.stroke(this.strokeColor);
    g.strokeWeight(this.strokeWidth);
    g.bezier(0, 0, -20, 20, 0, 50, 0, this.length);
    g.bezier(-9, 22, -24, 48, -24, 50, -8, 34);
  }

  renderStatic() {
    const g = this.buffer;

    g.clear();
    // g.background('red');
    g.push();
    g.translate(g.width / 2, this.padding);
    this.shape(g);
    g.scale(-1, 1);
    this.shape(g);
    g.pop();

    g.loadPixels();
    // this.p.image(g, -1 * (g.width / 2), -this.padding);
  }

  update(
    x: number,
    y: number,
    t: number,
    rotate: number = 0,
    shift: number = 0,
  ) {
    const src = this.buffer;
    const dst = this.p.createImage(src.width, src.height);
    dst.loadPixels();

    for (let j = 0; j < src.height; j++) {
      const a = 7;
      const waveLength = 84;
      const freq = (j / waveLength) * Math.PI;
      const effect = Math.min(Math.max(j / this.length, 0), 1);

      const offset = Math.round(
        effect * a * Math.sin(freq - (t * 0.3 + shift)),
      );
      // console.log(offset);

      for (let i = 0; i < src.width; i++) {
        const srcCol = i - offset; // reference the offset pixel from src
        const sIndex = (srcCol + j * src.width) * 4;
        const dIndex = (i + j * src.width) * 4;

        if (srcCol < 0 || srcCol >= src.width) {
          for (let k = 0; k < 4; k++) {
            dst.pixels[dIndex + k] = src.pixels[dIndex + k];
          }
          continue;
        }

        for (let k = 0; k < 4; k++) {
          dst.pixels[dIndex + k] = src.pixels[sIndex + k];
        }
      }
    }
    dst.updatePixels();
    this.p.rotate(rotate);
    this.p.image(dst, x - src.width / 2, y - this.padding);
  }
}

export const Sketch6_1 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      const bgcolor = '#f0f0f0';
      let width = Math.min(p.windowWidth - rem * 12, 1080);
      let height = Math.min(p.windowHeight, 640);

      let fih: Fish;
      let r = 0;

      p.setup = () => {
        p.createCanvas(width, height);
        p.angleMode(p.DEGREES);
        p.background(bgcolor);
        p.frameRate(30);

        fih = new Fish(p, 110, 2, p.color('#444'), p.color('#444'));
      };

      p.draw = () => {
        p.background(220);
        p.translate(width / 2, height / 2);

        p.push();
        fih.update(0, 0, p.frameCount, (p.frameCount * 1)%360);
        p.pop();
      };

      p.windowResized = () => {
        width = Math.min(p.windowWidth - rem * 12, 1080);
        height = Math.min(p.windowHeight, 640);
        p.resizeCanvas(width, height);
        p.background(bgcolor);
      };
    }, canvasRef.current!);

    return () => instance.remove();
  }, []);

  return <div ref={canvasRef} style={{ padding: 0 }} />;
};
