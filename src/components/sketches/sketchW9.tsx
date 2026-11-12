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

export const Sketch9 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      const bgcolor = '#f0f0f0';
      const greyscaleThreshold = 80;

      let width = getWidth(p);
      let height = getHeight(p);
      let video: p5.Element;

      p.setup = () => {
        p.createCanvas(width, height);
        p.frameRate(30);

        // @types/p5 is outdated and does not support the flipped flag
        // as any bypasses typescript's check for flipped
        video = p.createCapture('video', { flipped: true } as any);
        video.hide();
      };

      p.draw = () => {
        p.background(bgcolor);

        let g = p.createGraphics(width, height);
        g.image(video, 0, 0, width, height);
        g.loadPixels();

        let px = g.pixels;
        for (let i = 0; i < px.length; i += 4) {
          let grey = (px[i] + px[i + 1] + px[i + 2]) / 3;
          let value = 24;
          if (grey > greyscaleThreshold) value = 255;

          for (let j = 0; j < 3; j++) {
            g.pixels[i + j] = value;
          }
        }
        g.updatePixels();

        p.image(g, 0, 0, width, height);
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
