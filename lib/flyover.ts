import {
  BoxGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DataTexture,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  Fog,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  InstancedMesh,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshToonMaterial,
  NearestFilter,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  RedFormat,
  RepeatWrapping,
  Scene,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from 'three';
import {
  COURSE_H,
  COURSE_W,
  clubhouse,
  courseHoles,
  getCourseHole,
  trees,
  type Point,
  type Shot,
} from './course';
import { palette } from './palette';
import type { HoleId } from './round';
import { easeInOutCubic, tween } from './tween';

export type Flyover = {
  canvas: HTMLCanvasElement;
  /** Tilt from wherever the camera is into the hole (or glide to the clubhouse). */
  playHole(id: HoleId, signal?: AbortSignal): Promise<void>;
  /** Lift back to the exact top-down framing of the 2D map. */
  returnToOverview(signal?: AbortSignal): Promise<void>;
  trackPoint(point: Point, onPosition: (position: Point) => void): () => void;
  dispose(): void;
};

type CamState = {
  pos: Vector3;
  target: Vector3;
  up: Vector3;
  fov: number;
  shiftX: number;
  shiftY: number;
};

const OUTER_GROUND_SIZE = 14000;
const HAZE = new Color('#14452b');
const GROUND = new Color(palette.ground);
const WALL = new Color(palette.clubWall);
const ROOF = new Color(palette.clubRoof);

const toWorld = (p: Point, y = 0) =>
  new Vector3(p.x - COURSE_W / 2, y, p.y - COURSE_H / 2);
const lerp = MathUtils.lerp;
const CLUBHOUSE_VIEW = new Vector3(0.55, 0, -0.83).normalize();
/** Yaw that turns a flag's +x to the camera's right, so it faces a camera looking along `dir`. */
const yawFacing = (dir: Vector3) => Math.atan2(-dir.x, -dir.z);
const lerpAngle = (a: number, b: number, t: number) => {
  const d =
    ((((b - a) % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
  return a + d * t;
};

function mixState(a: CamState, b: CamState, t: number): CamState {
  return {
    pos: a.pos.clone().lerp(b.pos, t),
    target: a.target.clone().lerp(b.target, t),
    up: a.up.clone().lerp(b.up, t).normalize(),
    fov: lerp(a.fov, b.fov, t),
    shiftX: lerp(a.shiftX, b.shiftX, t),
    shiftY: lerp(a.shiftY, b.shiftY, t),
  };
}

async function courseTexture(
  svg: SVGSVGElement,
  renderer: WebGLRenderer,
  scale: number,
) {
  const w = Math.round(COURSE_W * scale);
  const h = Math.round(COURSE_H * scale);
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone
    .querySelectorAll('[data-layer]:not([data-layer="base"])')
    .forEach((n) => n.remove());
  const grassTile = clone.querySelector<SVGImageElement>('[data-ground-tile]');
  if (grassTile) {
    const response = await fetch(grassTile.href.baseVal);
    if (!response.ok) throw new Error('Could not load the grass texture');
    grassTile.setAttribute(
      'href',
      `data:image/svg+xml,${encodeURIComponent(await response.text())}`,
    );
  }
  clone.setAttribute('viewBox', `0 0 ${COURSE_W} ${COURSE_H}`);
  clone.setAttribute('width', `${w}`);
  clone.setAttribute('height', `${h}`);
  clone.removeAttribute('class');
  const url = URL.createObjectURL(
    new Blob([new XMLSerializer().serializeToString(clone)], {
      type: 'image/svg+xml',
    }),
  );
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return texture;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function createFlyover(
  container: HTMLElement,
  svg: SVGSVGElement,
): Promise<Flyover> {
  const renderer = new WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');

  const scene = new Scene();
  scene.background = GROUND.clone();
  const fog = new Fog(HAZE, 1e5, 2e5);
  scene.fog = fog;
  const camera = new PerspectiveCamera(35, 1, 2, 9000);

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const maxScale = renderer.capabilities.maxTextureSize / COURSE_W;
  const [texture, roughTexture] = await Promise.all([
    courseTexture(svg, renderer, Math.min(coarse ? 2 : 3, maxScale)),
    new TextureLoader().loadAsync('/rough-grass.svg'),
  ]);
  roughTexture.colorSpace = SRGBColorSpace;
  roughTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  roughTexture.wrapS = roughTexture.wrapT = RepeatWrapping;
  roughTexture.repeat.set(
    OUTER_GROUND_SIZE / roughTexture.image.width,
    OUTER_GROUND_SIZE / roughTexture.image.height,
  );
  roughTexture.offset.set(
    (COURSE_W - OUTER_GROUND_SIZE) / (2 * roughTexture.image.width),
    -(COURSE_H + OUTER_GROUND_SIZE) / (2 * roughTexture.image.height),
  );

  const disposables: { dispose(): void }[] = [renderer, texture, roughTexture];
  const track = <T extends { dispose(): void }>(d: T) => (
    disposables.push(d),
    d
  );

  const groundGeo = track(new PlaneGeometry(COURSE_W, COURSE_H));
  groundGeo.rotateX(-Math.PI / 2);
  scene.add(
    new Mesh(groundGeo, track(new MeshBasicMaterial({ map: texture }))),
  );
  // Ground runs on past the course so a tilted camera sees a horizon, not a plane edge.
  const outerGeo = track(new PlaneGeometry(OUTER_GROUND_SIZE, OUTER_GROUND_SIZE));
  outerGeo.rotateX(-Math.PI / 2);
  outerGeo.translate(0, -0.4, 0);
  scene.add(
    new Mesh(
      outerGeo,
      track(
        new MeshBasicMaterial({
          map: roughTexture,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        }),
      ),
    ),
  );

  // Spotlight: a ground-coloured veil over the course with the played hole cut out, so neighbours recede.
  const veil = document.createElement('canvas');
  const VEIL_SCALE = 0.5;
  veil.width = COURSE_W * VEIL_SCALE;
  veil.height = COURSE_H * VEIL_SCALE;
  const veilTexture = track(new CanvasTexture(veil));
  veilTexture.colorSpace = SRGBColorSpace;
  const veilMat = track(
    new MeshBasicMaterial({
      map: veilTexture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    }),
  );
  const veilGeo = track(new PlaneGeometry(COURSE_W, COURSE_H));
  veilGeo.rotateX(-Math.PI / 2);
  veilGeo.translate(0, 0.25, 0);
  const veilMesh = new Mesh(veilGeo, veilMat);
  veilMesh.visible = false;
  scene.add(veilMesh);

  function paintSpotlight(id: HoleId) {
    const ctx = veil.getContext('2d')!;
    ctx.save();
    ctx.clearRect(0, 0, veil.width, veil.height);
    ctx.fillStyle = 'rgb(15 61 36 / 0.74)';
    ctx.fillRect(0, 0, veil.width, veil.height);
    ctx.scale(VEIL_SCALE, VEIL_SCALE);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.filter = 'blur(14px)';
    ctx.fillStyle = ctx.strokeStyle = '#000';
    const hole = getCourseHole(id);
    if (hole.fairway) {
      const fairway = new Path2D(hole.fairway);
      ctx.lineWidth = 70;
      ctx.lineJoin = 'round';
      ctx.fill(fairway);
      ctx.stroke(fairway);
    }
    if (hole.green) {
      ctx.beginPath();
      ctx.ellipse(
        hole.green.cx,
        hole.green.cy,
        hole.green.rx + 40,
        hole.green.ry + 40,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    if (hole.tee) {
      ctx.beginPath();
      ctx.arc(hole.tee.x, hole.tee.y, 48, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!hole.shot) {
      ctx.beginPath();
      ctx.ellipse(
        clubhouse.x + clubhouse.w / 2,
        clubhouse.y + clubhouse.h / 2,
        120,
        90,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    ctx.restore();
    veilTexture.needsUpdate = true;
  }
  let houseInFocus = false;
  function setVeil(value: number) {
    veilMat.opacity = value;
    veilMesh.visible = value > 0.001;
    const recede = houseInFocus ? 0 : value * 0.9;
    wall.color.copy(WALL).lerp(GROUND, recede);
    roofMat.color.copy(ROOF).lerp(GROUND, recede);
  }
  /** Tween helper: fade the veil in on a new hole; between holes, out and back in around a repaint. */
  function veilFader(id: HoleId) {
    const start = veilMat.opacity;
    let painted = start === 0;
    if (painted) paintSpotlight(id);
    return (e: number) => {
      if (!painted && e >= 0.5) {
        paintSpotlight(id);
        painted = true;
      }
      setVeil(start === 0 ? e : e < 0.5 ? (1 - 2 * e) * start : 2 * e - 1);
    };
  }

  scene.add(new HemisphereLight(0xffffff, palette.ground, 1.5));
  const sun = new DirectionalLight(0xffffff, 1.8);
  sun.position.set(-300, 600, 250);
  scene.add(sun);

  // Trees: two-tone like the 2D crowns, flat at the overview, raised as the camera tilts.
  const steps = track(
    new DataTexture(new Uint8Array([120, 255]), 2, 1, RedFormat),
  );
  steps.minFilter = steps.magFilter = NearestFilter;
  steps.needsUpdate = true;
  const treeMesh = new InstancedMesh(
    track(new IcosahedronGeometry(1, 3)),
    track(new MeshToonMaterial({ color: palette.treeLit, gradientMap: steps })),
    trees.length,
  );
  scene.add(treeMesh);
  const dummy = new Object3D();

  // Flags lie flat (pointing north, like the 2D map) and stand up with the tilt.
  const pinGeo = track(new CylinderGeometry(0.9, 0.9, 45, 8));
  pinGeo.rotateX(-Math.PI / 2);
  pinGeo.translate(0, 0, -22.5);
  const flagShape = new Shape();
  flagShape.moveTo(0, 45);
  flagShape.lineTo(27, 36);
  flagShape.lineTo(0, 27);
  flagShape.closePath();
  const flagGeo = track(new ShapeGeometry(flagShape));
  flagGeo.rotateX(-Math.PI / 2);
  const pinMat = track(new MeshBasicMaterial({ color: palette.white }));
  const flagMat = track(
    new MeshBasicMaterial({ color: palette.tracer, side: DoubleSide }),
  );
  const flags = new Map<HoleId, Group>();
  for (const hole of courseHoles) {
    if (!hole.pin) continue;
    const g = new Group();
    g.position.copy(toWorld(hole.pin, 0.5));
    g.add(new Mesh(pinGeo, pinMat), new Mesh(flagGeo, flagMat));
    flags.set(hole.id, g);
    scene.add(g);
  }
  const flagScale = new Map<HoleId, number>(
    [...flags.keys()].map((id) => [id, 1]),
  );
  /** Tween helper: only the hole in play keeps its flag once the camera is down on the course. */
  function flagFader(keep: (id: HoleId) => boolean) {
    const start = new Map(flagScale);
    return (e: number) => {
      for (const [id, flag] of flags) {
        const s = lerp(start.get(id)!, keep(id) ? 1 : 0, e);
        flagScale.set(id, s);
        flag.scale.setScalar(Math.max(0.001, s));
      }
    };
  }

  const wall = track(new MeshLambertMaterial({ color: palette.clubWall }));
  const house = new Mesh(
    track(new BoxGeometry(clubhouse.w, 1, clubhouse.h)),
    wall,
  );
  const gable = new Shape();
  gable.moveTo(-0.5, 0);
  gable.lineTo(0.5, 0);
  gable.lineTo(0, 1);
  gable.closePath();
  const roofGeo = track(
    new ExtrudeGeometry(gable, { depth: 1, bevelEnabled: false }),
  );
  roofGeo.translate(0, 0, -0.5);
  roofGeo.rotateY(Math.PI / 2);
  const roofMat = track(new MeshLambertMaterial({ color: palette.clubRoof }));
  const roof = new Mesh(roofGeo, roofMat);
  const houseAt = toWorld({
    x: clubhouse.x + clubhouse.w / 2,
    y: clubhouse.y + clubhouse.h / 2,
  });
  house.position.copy(houseAt);
  roof.position.copy(houseAt);
  roof.scale.set(clubhouse.w, 1, clubhouse.h);
  scene.add(house, roof);

  let raise = -1;
  let yaw = 0;
  function setRaise(value: number, nextYaw = yaw) {
    if (value === raise && nextYaw === yaw) return;
    raise = value;
    yaw = nextYaw;
    trees.forEach(([x, y, r], i) => {
      const height = Math.max(0.02, r * 1.25 * value);
      dummy.position.copy(toWorld({ x, y }, height * 0.8));
      dummy.scale.set(r, height, r);
      dummy.updateMatrix();
      treeMesh.setMatrixAt(i, dummy.matrix);
    });
    treeMesh.instanceMatrix.needsUpdate = true;
    // Stand up first, then turn broadside to the camera; flat at the overview to match the 2D map.
    for (const flag of flags.values())
      flag.rotation.set((value * Math.PI) / 2, yaw * value, 0, 'YXZ');
    house.scale.y = 0.4 + 16 * value;
    house.position.y = house.scale.y / 2;
    roof.scale.y = 0.2 + 14 * value;
    roof.position.y = house.scale.y;
    fog.near = lerp(1e5, 1100, value);
    fog.far = lerp(2e5, 3600, value);
    (scene.background as Color).copy(GROUND).lerp(HAZE, value);
  }
  setRaise(0);

  // Sizing, camera and on-demand rendering.
  let width = 1;
  let height = 1;
  let state: CamState;
  let atOverview = true;
  let frame = 0;
  const viewListeners = new Set<() => void>();

  function render() {
    frame = 0;
    renderer.render(scene, camera);
  }
  function invalidate() {
    if (!frame) frame = requestAnimationFrame(render);
  }
  function apply(s: CamState) {
    state = s;
    camera.aspect = width / height;
    camera.fov = s.fov;
    camera.position.copy(s.pos);
    camera.up.copy(s.up);
    camera.lookAt(s.target);
    camera.setViewOffset(
      width,
      height,
      -s.shiftX * width,
      -s.shiftY * height,
      width,
      height,
    );
    camera.updateProjectionMatrix();
    for (const update of viewListeners) update();
    invalidate();
  }

  /** The CSS container query that turns the 2D map also flags it here, so both agree. */
  const isPortrait = () =>
    getComputedStyle(container).getPropertyValue('--portrait').trim() === '1';

  function overviewState(): CamState {
    const fov = 35;
    const aspect = width / height;
    const portrait = isPortrait();
    const span = portrait
      ? Math.max(COURSE_W, COURSE_H / aspect)
      : Math.max(COURSE_H, COURSE_W / aspect);
    const distance = span / 2 / Math.tan(MathUtils.degToRad(fov / 2));
    return {
      pos: new Vector3(0, distance, 0),
      target: new Vector3(0, 0, 0),
      up: portrait ? new Vector3(1, 0, 0) : new Vector3(0, 0, -1),
      fov,
      shiftX: 0,
      shiftY: 0,
    };
  }

  /** Leave the fairway in the open lane between the lower third and the green-side card. */
  function settleShift() {
    if (width < 700 || isPortrait()) return { shiftX: 0, shiftY: 0.02 };
    return width >= 940
      ? { shiftX: -0.03, shiftY: -0.15 }
      : { shiftX: -0.1, shiftY: -0.04 };
  }

  function playDirection(shot: Shot) {
    return toWorld(shot.land).sub(toWorld(shot.from)).setY(0).normalize();
  }

  /** Settled camera sits off the right of the line and a little behind it: tee left, green right. */
  function settleView(shot: Shot) {
    const dir = playDirection(shot);
    return new Vector3(-dir.z, 0, dir.x)
      .multiplyScalar(0.87)
      .addScaledVector(dir, -0.5)
      .normalize();
  }

  /** Settled view of a hole: a three-quarter side view of the fairway and green. */
  function greenState(id: HoleId): CamState {
    const hole = getCourseHole(id);
    const base = { up: new Vector3(0, 1, 0), fov: 38, ...settleShift() };
    if (!hole.shot) {
      const target = houseAt.clone();
      return {
        ...base,
        pos: target.clone().addScaledVector(CLUBHOUSE_VIEW, -560).setY(500),
        target,
      };
    }
    const shot = hole.shot;
    const from = toWorld(shot.from);
    const land = toWorld(shot.land);
    const carry = from.distanceTo(land);
    const target = from
      .clone()
      .lerp(land, 0.55)
      .setY(shot.apex * 0.3);
    const distance = carry * 1.75 + 120;
    const pitch = MathUtils.degToRad(24);
    const pos = target
      .clone()
      .addScaledVector(settleView(shot), distance * Math.cos(pitch))
      .setY(target.y + distance * Math.sin(pitch));
    return { ...base, pos, target };
  }

  let settled = false;
  function resize() {
    const rect = container.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    renderer.setSize(width, height, false);
    if (atOverview) apply(overviewState());
    else apply(settled ? { ...state, ...settleShift() } : state);
  }

  const observer = new ResizeObserver(resize);
  observer.observe(container);
  container.appendChild(canvas);
  resize();
  render();

  async function playHole(id: HoleId, signal?: AbortSignal) {
    const hole = getCourseHole(id);
    const from = state;
    const startRaise = Math.max(raise, 0);
    const startYaw = yaw;
    const faceYaw = yawFacing(
      hole.shot ? settleView(hole.shot).negate() : CLUBHOUSE_VIEW,
    );
    const fadeFlags = flagFader((flagId) => flagId === id);
    houseInFocus = !hole.shot;
    const fadeVeil = veilFader(id);
    atOverview = false;
    settled = false;

    const to = greenState(id);
    await tween(
      hole.shot ? 1500 : 1700,
      (t) => {
        const e = easeInOutCubic(t);
        setRaise(lerp(startRaise, 1, e), lerpAngle(startYaw, faceYaw, e));
        fadeFlags(e);
        fadeVeil(e);
        apply(mixState(from, to, e));
      },
      signal,
    );
    settled = true;
  }

  async function returnToOverview(signal?: AbortSignal) {
    const from = state;
    const startRaise = raise;
    const restoreFlags = flagFader(() => true);
    const startVeil = veilMat.opacity;
    settled = false;
    await tween(
      1300,
      (t) => {
        const e = easeInOutCubic(t);
        setRaise(lerp(startRaise, 0, e));
        restoreFlags(e);
        setVeil(lerp(startVeil, 0, e));
        apply(mixState(from, overviewState(), e));
      },
      signal,
    );
    atOverview = true;
    apply(overviewState());
  }

  return {
    canvas,
    playHole,
    returnToOverview,
    trackPoint(point, onPosition) {
      const update = () => {
        camera.updateMatrixWorld();
        const projected = toWorld(point).project(camera);
        const bounds = container.getBoundingClientRect();
        onPosition({
          x: bounds.left + ((projected.x + 1) / 2) * bounds.width,
          y: bounds.top + ((1 - projected.y) / 2) * bounds.height,
        });
      };
      viewListeners.add(update);
      window.addEventListener('scroll', update, true);
      update();
      return () => {
        viewListeners.delete(update);
        window.removeEventListener('scroll', update, true);
      };
    },
    dispose() {
      observer.disconnect();
      cancelAnimationFrame(frame);
      treeMesh.dispose();
      for (const d of disposables) d.dispose();
      canvas.remove();
    },
  };
}
