import { useLayoutEffect, useRef } from 'preact/hooks';
import { mapRange } from '../../utils';
import p5 from 'p5';

interface TileSpecs {
  translate: p5.Vector;
  rotate: number;
  color: p5.Vector;
  pos: p5.Vector;
}

function placeTiles(
  p: p5,
  tiles: TileSpecs[],
  tileSize: number,
  bg: number = 248,
) {
  p.background(bg);

  for (let i = 0; i < tiles.length; i++) {
    p.push();
    p.translate(tiles[i].translate.x, tiles[i].translate.y);
    p.rotate(tiles[i].rotate);

    let r = tiles[i].color.x;
    let g = tiles[i].color.y;
    let b = tiles[i].color.z;
    p.fill(r, g, b);
    p.stroke(r - 64, g - 64, b - 64);

    p.translate(-1 * tiles[i].translate.x, -1 * tiles[i].translate.y);
    p.square(tiles[i].pos.x, tiles[i].pos.y, tileSize);
    p.pop();
  }
}

function tilesGen(
  p: p5,
  tileSize: number,
  tileAmount: number,
  gap: number,
  tileRotate: number = 0,
) {
  let tiles = [];

  let tileXPos = gap;
  let tileYPos = gap;
  for (let i = 0; i < tileAmount; i++) {
    for (let j = 0; j < tileAmount; j++) {

      let r = mapRange(Math.random(), 0, 1, 220, 230);
      let g = mapRange(Math.random(), 0, 1, 220, 250);
      let b = mapRange(Math.random(), 0, 1, 230, 255);

      tiles.push({
        translate: p.createVector(
          tileXPos + tileSize / 2,
          tileYPos + tileSize / 2,
        ),
        rotate: mapRange(Math.random(), 0, 1, -1 * tileRotate, tileRotate),
        color: p.createVector(r, g, b),
        pos: p.createVector(tileXPos, tileYPos),
      });

      tileXPos += tileSize + gap;
    }
    tileXPos = gap;
    tileYPos += tileSize + gap;
  }
  return tiles;
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

      let tiles: TileSpecs[];

      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
        p.angleMode(p.DEGREES);

        tiles = tilesGen(p, tileSize, tileAmount, gap, 4);
      };

      p.draw = () => {
        // p.ellipse(p.mouseX, p.mouseY, 100, 50);
        placeTiles(p, tiles, tileSize, bgColor);
      };

      p.mouseClicked = () => {
        p.clear();
        tiles = tilesGen(p, tileSize, tileAmount, gap, 4);
        placeTiles(p, tiles, tileSize, bgColor);
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
      const canvasSize = 480;
      const gap = 8;
      const tileAmount = 8;
      const tileSize = (canvasSize - gap * (tileAmount + 1)) / tileAmount;
      const tileRotate = 4;
      const bgColor = 255;

      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
        p.angleMode(p.DEGREES);
        // p.background(248);
        // placeTiles(p, tileSize, tileAmount, gap, bgColor);
      };

      p.draw = () => {
        p.background(128, 128, 128, 128);

        p.noStroke();
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
