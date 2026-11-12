import { useLayoutEffect, useRef } from 'preact/hooks';
import p5 from 'p5';

import { getDocumentRem } from '../../utils';
const rem = getDocumentRem();
function getWidth(p: p5) {
  if (p.windowWidth < 640) {
    // 4.2rem might be the sidebar i don't think i like this sidebar anymore
    // 2.4rem is the px of the parent
    return p.windowWidth - rem * (4.2 + 2.4);
  }
  return Math.min(p.windowWidth - rem * 16, 640);
}
function getHeight(p: p5) {
  // 6.4rem is the page title height (top bar height)
  const w = getWidth(p);
  return w * 0.75;
}

class Guy {
  p: p5;
  pos: p5.Vector;
  rot: number;
  speed: p5.Vector;
  lerp: number;

  constructor(p: p5, lerp?: number) {
    this.p = p;

    const w = getWidth(p);
    const h = getHeight(p);
    this.pos = p.createVector(w / 2, h / 2);
    this.rot = 0;
    this.speed = p.createVector(1, 1);
    this.lerp = lerp ? lerp : 0.1;
  }

  render() {
    this.p.triangle(-10, 40, 0, 0, 10, 40);
  }

  update(isPointed: boolean, pos: p5.Vector, w: number, h: number) {
    let p = this.p;

    const padding = 24;
    if (this.pos.x > w - padding || this.pos.x < padding) {
      this.speed.mult(-1, 1);
    }
    if (this.pos.y > h - padding || this.pos.y < padding) {
      this.speed.mult(1, -1);
    }

    let x, y;
    if (isPointed) {
      x = p.lerp(this.pos.x, pos.x, this.lerp);
      y = p.lerp(this.pos.y, pos.y, this.lerp);
    } else {
      x = this.pos.x += this.speed.x;
      y = this.pos.y += this.speed.y;
    }
    this.pos.set(x, y);

    let dx = this.pos.x - pos.x;
    let dy = this.pos.y - pos.y;
    let rot = Math.atan2(dy, dx) - p.PI/2;
    this.rot = p.lerp(this.rot, rot, this.lerp);

    p.push();
    p.translate(this.pos.x, this.pos.y);
    p.rotate(this.rot);
    this.render();
    p.pop();
  }
}

export const Sketch9 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      const bgcolor = '#f0f0f0';
      const greyscaleThreshold = 80;

      let width = getWidth(p);
      let height = getHeight(p);

      let video: p5.Element;
      let handPose;
      let hands: any[] = [];

      let isPointer = false;
      let pointerPos = p.createVector(width / 2, height / 2);
      let guy:Guy;

      p.setup = async () => {
        p.createCanvas(width, height);
        p.frameRate(30);

        // @types/p5 is outdated and does not support the flipped flag
        // as any bypasses typescript's check for flipped
        video = p.createCapture('video', { flipped: true } as any);
        video.hide();

        handPose = await ml5.handPose({ flipped: true });
        handPose.detectStart(video, (results: []) => {
          hands = results;
        });

        guy = new Guy(p);
      };

      p.draw = () => {
        p.background(bgcolor);

        let g = p.createGraphics(width, height);
        g.image(video, 0, 0, width, height);
        g.loadPixels();

        let px = g.pixels;
        for (let i = 0; i < px.length; i += 4) {
          let grey = (px[i] + px[i + 1] + px[i + 2]) / 3;
          let value = 48;
          if (grey > greyscaleThreshold) value = 248;

          for (let j = 0; j < 3; j++) {
            g.pixels[i + j] = value;
          }
        }
        g.updatePixels();
        p.image(g, 0, 0, width, height);

        if (hands.length < 1) {
          isPointer = false;
        }

        for (let i = 0; i < hands.length; i++) {
          if (i > 0) break; // just one hand pls

          let hand = hands[i];
          for (let j = 0; j < hand.keypoints.length; j++) {
            let keypoint = hand.keypoints[j];

            let xScale = width / video.elt.videoWidth;
            let yScale = height / video.elt.videoHeight;

            if (j == 8) {
              p.fill(255, 0, 0);
              p.noStroke();
              p.circle(keypoint.x * xScale, keypoint.y * yScale, 8);

              isPointer = true;
              pointerPos.set(keypoint.x * xScale, keypoint.y * yScale);
            } 
            // else if (j % 4 == 0 && j != 0) {
            //   p.fill('#fff');
            //   p.stroke(0);
            //   p.strokeWeight(1);
            //   p.circle(keypoint.x * xScale, keypoint.y * yScale, 8);
            // }
          }
        }

        guy.update(isPointer, pointerPos, width, height);
      };

      p.windowResized = () => {
        width = getWidth(p);
        height = getHeight(p);
        p.resizeCanvas(width, height);
        p.background(bgcolor);
      };
    }, canvasRef.current!);
    return () => instance.remove();
  }, []);

  return <div ref={canvasRef} style={{ padding: 0 }} />;
};
