import { useLayoutEffect, useRef } from 'preact/hooks';
import { mapRange, degreesToRadians } from '../../utils';
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
  mouseX: undefined | number = 0,
  mouseY: undefined | number = 0,
) {
  p.background(bg);

  for (let i = 0; i < tiles.length; i++) {
    p.push();
    p.translate(tiles[i].translate.x, tiles[i].translate.y);
    p.rotate(tiles[i].rotate);

    let r = tiles[i].color.x;
    let g = tiles[i].color.y;
    let b = tiles[i].color.z;
    if (mouseX && mouseY) {
      let mousePos = p.createVector(mouseX, mouseY);
      let dist = p5.Vector.dist(mousePos, tiles[i].translate);
      if (dist > 255) dist = 255;

      r = tiles[i].color.x;
      g = tiles[i].color.y;
      b = tiles[i].color.z;
      if (
        (mouseX > tiles[i].pos.x && mouseX < tiles[i].pos.x + tileSize) ||
        (mouseY > tiles[i].pos.y && mouseY < tiles[i].pos.y + tileSize)
      ) {
        // let layerColor = p.createVector(255, 226, 168);
        let layerColor = p.createVector(172, 180, 242);

        // 360 is an arbitrary number kill this guy
        r = tiles[i].color.x * mapRange(dist, 0, 360, layerColor.x / 255, 1);
        g = tiles[i].color.y * mapRange(dist, 0, 360, layerColor.y / 255, 1);
        b = tiles[i].color.z * mapRange(dist, 0, 360, layerColor.z / 255, 1);
      }
    }
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
      let g = mapRange(Math.random(), 0, 1, 220, 248);
      let b = mapRange(Math.random(), 0, 1, 246, 255);

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
      const gap = 12;
      const tileAmount = 8;
      const tileSize = (canvasSize - gap * (tileAmount + 1)) / tileAmount;
      const tileRotate = 180;
      const bgColor = 255;

      let tiles: TileSpecs[];

      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
        p.angleMode(p.DEGREES);

        tiles = tilesGen(p, tileSize, tileAmount, gap, tileRotate);
      };

      p.draw = () => {
        // p.ellipse(p.mouseX, p.mouseY, 100, 50);
        placeTiles(p, tiles, tileSize, bgColor);
      };

      p.mouseClicked = () => {
        p.clear();
        tiles = tilesGen(p, tileSize, tileAmount, gap, tileRotate);
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

      let tiles: TileSpecs[];

      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
        p.angleMode(p.DEGREES);

        tiles = tilesGen(p, tileSize, tileAmount, gap, tileRotate);
      };

      p.draw = () => {
        placeTiles(p, tiles, tileSize, bgColor, p.mouseX, p.mouseY);
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
      const canvasSize = 480;
      const bgColor = 250;
      const lineAmount = 48;
      const outerR = (canvasSize - 64) / 2;
      const innerR = outerR * 0.08;

      let pointX = canvasSize / 2;
      let pointY = canvasSize / 2;
      let xSpeed = 1.5;
      let ySpeed = 3;

      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
        // p.angleMode(p.DEGREES);
      };

      p.draw = () => {
        p.background(bgColor, bgColor, bgColor);

        if (pointX > canvasSize - innerR || pointX < innerR) {
          xSpeed *= -1;
        }
        if (pointY > canvasSize - innerR || pointY < innerR) {
          ySpeed *= -1;
        }

        for (let i = 0; i < lineAmount; i++) {
          let angle = i * (360 / lineAmount);
          let outerX =
            canvasSize / 2 + outerR * Math.cos(degreesToRadians(angle));
          let outerY =
            canvasSize / 2 + outerR * Math.sin(degreesToRadians(angle));
          let outerPos = p.createVector(outerX, outerY);

          let centerX = pointX + innerR * Math.cos(degreesToRadians(angle));
          let centerY = pointY + innerR * Math.sin(degreesToRadians(angle));
          let centerPos = p.createVector(centerX, centerY);

          let dir = p5.Vector.sub(centerPos, outerPos);
          // p.strokeWeight(2);
          p.line(
            outerPos.x,
            outerPos.y,
            outerPos.x + dir.x,
            outerPos.y + dir.y,
          );

          // p.strokeWeight(1);
          p.circle(outerPos.x, outerPos.y, 8);
          p.circle(centerPos.x, centerPos.y, 2);
        }

        pointX += xSpeed;
        pointY += ySpeed;
      };
    }, canvasRef.current!);

    return () => instance.remove();
  }, []);

  return <div ref={canvasRef} />;
};
