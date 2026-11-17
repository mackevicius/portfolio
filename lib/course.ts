import type { HoleId } from './round';

/** Course space: every shape and camera frame is authored in these units. */
export const COURSE_W = 1040;
export const COURSE_H = 900;

export type Point = { x: number; y: number };

export type Shot = {
  from: Point;
  control: Point;
  land: Point;
  rest: Point;
  apex: number;
};

export type CourseHole = {
  id: HoleId;
  fairway: string | null;
  green: { cx: number; cy: number; rx: number; ry: number } | null;
  bunkers: string[];
  tee: { x: number; y: number; angle: number } | null;
  sign: Point | null;
  pin: Point | null;
  shot: Shot | null;
  /** Tag anchor in course units, landscape map. */
  tag: Point;
  /** Number badge anchor when the map turns portrait. */
  badge: Point;
  /** 2D camera (viewBox) when the hole is open. Same aspect as the course. */
  frame: [number, number, number, number];
};

export const clubhouse = { x: 820, y: 700, w: 120, h: 70 };

export const courseHoles: CourseHole[] = [
  {
    id: 'ai-support-desk',
    fairway:
      'M140 760 C 150 600, 300 420, 470 300 C 560 240, 640 250, 640 300 C 640 350, 560 360, 500 400 C 380 480, 260 640, 230 800 Z',
    green: { cx: 590, cy: 290, rx: 70, ry: 50 },
    bunkers: [
      'M330 540 C 350 520, 380 525, 375 550 C 370 570, 335 570, 330 555 Z',
      'M548 226 C 566 210, 604 214, 606 230 C 607 244, 566 246, 550 238 Z',
      'M262 676 C 274 664, 296 668, 292 684 C 288 696, 266 696, 262 686 Z',
    ],
    tee: { x: 185, y: 832, angle: -53 },
    sign: { x: 290, y: 550 },
    pin: { x: 602, y: 282 },
    shot: {
      from: { x: 185, y: 830 },
      control: { x: 412, y: 590 },
      land: { x: 574, y: 302 },
      rest: { x: 594, y: 288 },
      apex: 150,
    },
    tag: { x: 668, y: 300 },
    badge: { x: 600, y: 372 },
    frame: [85, 123, 1352, 1170],
  },
  {
    id: 'invoice-agent',
    fairway:
      'M700 120 C 780 90, 920 90, 990 150 C 1030 190, 1000 240, 950 230 C 880 215, 790 200, 730 210 C 680 220, 650 150, 700 120 Z',
    green: { cx: 960, cy: 185, rx: 55, ry: 42 },
    bunkers: [
      'M820 135 C 840 120, 870 125, 865 145 C 860 160, 830 160, 820 150 Z',
      'M902 238 C 918 228, 944 234, 938 246 C 932 256, 906 254, 902 246 Z',
    ],
    tee: { x: 655, y: 172, angle: 3 },
    sign: { x: 820, y: 172 },
    pin: { x: 968, y: 178 },
    shot: {
      from: { x: 655, y: 172 },
      control: { x: 800, y: 150 },
      land: { x: 942, y: 190 },
      rest: { x: 960, y: 183 },
      apex: 70,
    },
    tag: { x: 820, y: 256 },
    badge: { x: 960, y: 256 },
    frame: [520, 40, 560, 485],
  },
  {
    id: 'reiz-tech',
    fairway:
      'M760 420 C 840 380, 950 420, 980 500 C 1000 560, 960 600, 910 580 C 850 555, 800 520, 760 500 C 720 480, 720 440, 760 420 Z',
    green: { cx: 940, cy: 540, rx: 55, ry: 40 },
    bunkers: [
      'M868 590 C 884 578, 910 584, 904 598 C 898 610, 872 608, 868 600 Z',
    ],
    tee: { x: 708, y: 468, angle: 17 },
    sign: { x: 850, y: 480 },
    pin: { x: 948, y: 532 },
    shot: {
      from: { x: 708, y: 468 },
      control: { x: 806, y: 530 },
      land: { x: 922, y: 546 },
      rest: { x: 940, y: 537 },
      apex: 56,
    },
    tag: { x: 760, y: 614 },
    badge: { x: 950, y: 612 },
    frame: [580, 380, 500, 433],
  },
  {
    id: 'clubhouse',
    fairway: null,
    green: null,
    bunkers: [],
    tee: null,
    sign: null,
    pin: null,
    shot: null,
    tag: { x: 668, y: 812 },
    badge: { x: 880, y: 804 },
    frame: [640, 620, 420, 364],
  },
];

export const cartPath =
  'M300 560 C 380 500, 470 520, 560 600 S 720 760, 860 720';

/** Flat tree crowns: [x, y, radius]. Drawn flat in 2D, raised in 3D. */
export const trees: [number, number, number][] = [
  [60, 420, 18],
  [88, 452, 15],
  [52, 470, 14],
  [80, 505, 17],
  [48, 540, 13],
  [96, 560, 12],
  [70, 600, 16],
  [40, 640, 14],
  [84, 650, 12],
  [58, 690, 15],
  [372, 696, 16],
  [402, 726, 13],
  [350, 744, 12],
  [428, 684, 11],
  [650, 60, 15],
  [620, 92, 12],
  [676, 96, 11],
  [560, 152, 14],
  [598, 170, 11],
  [528, 120, 12],
  [760, 300, 14],
  [800, 322, 12],
  [850, 302, 15],
  [900, 330, 12],
  [960, 302, 13],
  [1010, 322, 11],
  [690, 390, 12],
  [470, 800, 16],
  [505, 830, 13],
  [450, 852, 12],
  [540, 862, 15],
  [600, 842, 12],
  [640, 872, 14],
  [700, 852, 11],
  [990, 670, 14],
  [1018, 704, 12],
  [990, 852, 14],
  [1020, 878, 11],
];

export function getCourseHole(id: HoleId): CourseHole {
  return courseHoles.find((h) => h.id === id)!;
}

export function tracerPath(shot: Shot): string {
  const { from, control, land } = shot;
  return `M${from.x} ${from.y} Q${control.x} ${control.y} ${land.x} ${land.y}`;
}
