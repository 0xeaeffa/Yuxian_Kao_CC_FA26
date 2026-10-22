import { useLayoutEffect, useRef } from 'preact/hooks';
import p5 from 'p5';
import { getDocumentRem } from '../../utils';

const rem = getDocumentRem();

class Fish {
  p: p5;
  length: number;
  scale: number;
  speed: number;
  strokeWidth: number;
  strokeColor: p5.Color;
  fillColor: p5.Color;
  padding: number;
  buffer: p5.Graphics;
  swimRadius: number;
  swimOffset: number;

  angle: number;

  constructor(
    p: p5,
    length: number = 100,
    scale: number = 1,
    speed: number = 0.025,

    swimRadius?: number,
    swimOffset?: number,

    fillColor?: p5.Color,
    strokeColor?: p5.Color,
    strokeWidth?: number,
  ) {
    this.p = p;
    this.length = length;
    this.scale = scale;
    this.speed = speed;
    this.strokeWidth = strokeWidth ? strokeWidth : 2;
    this.strokeColor = strokeColor ? strokeColor : p.color(0);
    this.fillColor = fillColor ? fillColor : p.color(255);
    this.swimRadius = swimRadius ? swimRadius : 100;
    this.swimOffset = swimOffset ? swimOffset : 0;

    this.angle = 0;

    this.padding = 20;
    const bufferW = 60 + this.padding * 2;
    const bufferH = this.length + this.padding * 2;
    this.buffer = this.p.createGraphics(bufferW, bufferH);
    this.buffer.pixelDensity(1);
    this.renderStatic();
  }

  private shape(g: p5.Graphics) {
    g.push();
    g.scale(this.scale);
    g.fill(this.fillColor);
    g.stroke(this.strokeColor);
    g.strokeWeight(this.strokeWidth);
    g.bezier(0, 0, -20, 20, 0, 50, 0, this.length);
    g.bezier(-9, 22, -24, 48, -24, 50, -8, 34);
    g.pop();
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
  }

  swim(t: number, shift: number = 0) {
    const src = this.buffer;
    const dst = this.p.createImage(src.width, src.height);
    dst.loadPixels();

    const rPercent = this.p.map(this.swimRadius, 60, 240, 0, 1);

    for (let j = 0; j < src.height; j++) {
      const a = this.p.map(rPercent, 0, 1, 7, 10);
      const waveLength = 64;
      const freq = (j / waveLength) * Math.PI;
      const effect = Math.min(Math.max(j / this.length, 0), 1);

      // i don't rember what b is but it's like how fast its scrolling through the offset
      const b = this.p.map(rPercent, 0, 1, 0.4, 0.55);
      const offset = Math.round(effect * a * Math.sin(freq - (t * b + shift)));

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
    this.p.image(dst, 0 - src.width / 2, 0 - this.padding);
  }

  updateAngle() {
    this.angle -= this.speed;
  }
}

export const Sketch6_1 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      const bgcolor = '#f0f0f0';
      let width = Math.min(p.windowWidth - rem * 12, 1080);
      let height = Math.min(p.windowHeight, 640);

      const fish: Fish[] = [];
      const fishAmount = 18;

      p.setup = () => {
        p.createCanvas(width, height);
        // p.angleMode(p.DEGREES);
        p.frameRate(30);

        for (let i = 0; i < fishAmount; i++) {
          let scale = i * ((1 - 0.4) / fishAmount) + 0.4;
          let color = Math.round(p.map(1 - scale, 0, 1, 50, 250));

          let radius = Math.random();
          let swimR = Math.round(p.map(radius, 0, 1, 60, 240));
          let speed = p.map(1 - radius, 0, 1, 0.016, 0.05);

          let swimO = Math.round(p.map(Math.random(), 0, 1, 0, 180));

          fish.push(
            new Fish(
              p,
              110,
              scale,
              speed,
              swimR,
              swimO,
              p.color(color),
              p.color(color),
            ),
          );
        }
      };

      p.draw = () => {
        p.background(bgcolor);
        p.translate(width / 2, height / 2);

        for (let i = 0; i < fishAmount; i++) {
          p.push();
          let f = fish[i];
          p.noFill();
          p.stroke('rgba(0,0,0,0.02)');
          p.strokeWeight(6);
          p.ellipse(0, 0, f.swimRadius * 2, f.swimRadius * 2);

          p.stroke('rgba(0,0,0,0.06)');
          p.strokeWeight(1);
          p.ellipse(0, 0, f.swimRadius * 2, f.swimRadius * 2);
          p.pop();
        }

        for (let i = 0; i < fishAmount; i++) {
          p.push();
          let f = fish[i];
          const pos = f.angle + f.swimOffset;
          const x = f.swimRadius * Math.cos(pos);
          const y = f.swimRadius * Math.sin(pos);
          const rotateAngle = Math.atan2(y, x);

          p.translate(x, y);
          p.rotate(rotateAngle);
          f.swim(p.frameCount, f.swimOffset);
          f.updateAngle();
          p.pop();
        }
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
