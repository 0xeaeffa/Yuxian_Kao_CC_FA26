import { useLayoutEffect, useRef } from 'preact/hooks';
import p5 from 'p5';
import { getDocumentRem } from '../../utils';

const rem = getDocumentRem();
function getWidth(p: p5) {
  if (p.windowWidth < 786) {
    return p.windowWidth - rem * 4.2;
  }
  return Math.min(p.windowWidth - rem * 16, 1080);
}
function getHeight(p: p5) {
  // 6.4rem is the page title height (top bar height)
  // add 1.2rem for good measures and fun
  return Math.min(p.windowHeight - rem * (6.4 + 1.2), 720 - rem * (6.4 + 1.2));
}

export const Sketch7 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const instance = new p5((p: p5) => {
      const bgcolor = '#f0f0f0';
      let width = getWidth(p);
      let height = getHeight(p);
      // 6.4rem is the top bar height (for page title)

      p.setup = () => {
        p.createCanvas(width, height);
        // p.angleMode(p.DEGREES);
        p.frameRate(30);
      };

      p.draw = () => {};

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
