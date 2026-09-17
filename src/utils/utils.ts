export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

// Do this once, before `new p5(...)` runs
export const originalGetContext = HTMLCanvasElement.prototype.getContext;
// @ts-ignore - overriding to inject willReadFrequently
HTMLCanvasElement.prototype.getContext = function (
  type: string,
  attributes?: any,
) {
  if (type === '2d') {
    attributes = { ...attributes, willReadFrequently: true };
  }
  return originalGetContext.call(this, type, attributes);
};

export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};
