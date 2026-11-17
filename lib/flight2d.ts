import { COURSE_H, COURSE_W } from './course';
import { easeInOutCubic, tween } from './tween';

export type ViewBox = [number, number, number, number];

export const fullViewBox: ViewBox = [0, 0, COURSE_W, COURSE_H];

export const viewBoxString = (v: readonly number[]) =>
  v.map((n) => Math.round(n * 100) / 100).join(' ');

function readViewBox(svg: SVGSVGElement): ViewBox {
  const { x, y, width, height } = svg.viewBox.baseVal;
  return [x, y, width, height];
}

export function moveCamera2D(
  svg: SVGSVGElement,
  to: ViewBox,
  duration: number,
  signal?: AbortSignal,
) {
  const from = readViewBox(svg);
  return tween(
    duration,
    (t) => {
      const e = easeInOutCubic(t);
      svg.setAttribute(
        'viewBox',
        viewBoxString(from.map((f, i) => f + (to[i] - f) * e)),
      );
    },
    signal,
  );
}
