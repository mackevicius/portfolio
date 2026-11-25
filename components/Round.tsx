'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { flushSync } from 'react-dom';
import { CourseMap } from './course/CourseMap';
import { CourseNav } from './course/CourseNav';
import { HoleView } from './hole/HoleView';
import { Icon } from './Icon';
import { PlayerCard } from './PlayerCard';
import { getCourseHole, type Point } from '@/lib/course';
import { fullViewBox, moveCamera2D, viewBoxString } from '@/lib/flight2d';
import type { Flyover } from '@/lib/flyover';
import { holes, isHoleId, type HoleId } from '@/lib/round';
import ui from './ui.module.css';
import styles from './Round.module.css';

export type Phase = 'course' | 'flying' | 'hole' | 'returning';
export type TrackSign = (
  id: HoleId,
  onPosition: (position: Point, bounds: DOMRectReadOnly) => void,
) => () => void;

const weekdayFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Vilnius',
  weekday: 'short',
});
const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Vilnius',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

const reducedQuery = '(prefers-reduced-motion: reduce)';
function useReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(reducedQuery);
      mq.addEventListener('change', notify);
      return () => mq.removeEventListener('change', notify);
    },
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function LocationClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timeout: number;
    const tick = () => {
      const current = new Date();
      setNow(current);
      timeout = window.setTimeout(tick, 60_000 - (current.getTime() % 60_000));
    };
    const refresh = () => {
      if (document.visibilityState !== 'visible') return;
      window.clearTimeout(timeout);
      tick();
    };
    timeout = window.setTimeout(tick, 0);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  return (
    <div
      className={styles.location}
      role="timer"
      aria-label="Vilnius local time"
      aria-live="off"
    >
      <span className={styles.liveDot} aria-hidden="true" />
      <span>Vilnius</span>
      <time className={styles.localTime} dateTime={now?.toISOString()}>
        <span>{now ? weekdayFormatter.format(now) : '---'}</span>
        <span>{now ? timeFormatter.format(now) : '--:--'}</span>
      </time>
    </div>
  );
}

export function Round({ initialHole }: { initialHole: HoleId | null }) {
  const [openId, setOpenId] = useState<HoleId | null>(initialHole);
  const [phase, setPhase] = useState<Phase>(initialHole ? 'hole' : 'course');
  const [backdrop, setBackdrop] = useState<'2d' | '3d'>('2d');
  const [previewId, setPreviewId] = useState<HoleId>(holes[0].id);
  const [initialViewBox] = useState(() =>
    viewBoxString(initialHole ? getCourseHole(initialHole).frame : fullViewBox),
  );
  const reducedMotion = useReducedMotion();

  const svgRef = useRef<SVGSVGElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const flyoverRef = useRef<Flyover | null>(null);
  const skipRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);
  const stateRef = useRef({ phase, backdrop, openId });
  useLayoutEffect(() => {
    stateRef.current = { phase, backdrop, openId };
  });

  // The 3D layer loads after first paint, and only where WebGL exists. The 2D map is the fallback.
  useEffect(() => {
    let cancelled = false;
    let flyover: Flyover | null = null;
    const load = async () => {
      if (!hasWebGL() || !canvasHostRef.current || !svgRef.current) return;
      const { createFlyover } = await import('@/lib/flyover');
      if (cancelled) return;
      flyover = await createFlyover(canvasHostRef.current, svgRef.current);
      if (cancelled) flyover.dispose();
      else flyoverRef.current = flyover;
    };
    const run = () => void load().catch(() => undefined);
    const idle = typeof window.requestIdleCallback === 'function';
    const handle = idle
      ? window.requestIdleCallback(run, { timeout: 2500 })
      : setTimeout(run, 1200);
    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(handle as number);
      else clearTimeout(handle);
      flyover?.dispose();
      flyoverRef.current = null;
    };
  }, []);

  const play = useCallback(
    async (id: HoleId, push = true) => {
      const svg = svgRef.current;
      if (busyRef.current || !svg) return;
      busyRef.current = true;
      if (push) window.history.pushState(null, '', `?hole=${id}`);

      const { phase: fromPhase, backdrop: current } = stateRef.current;
      const flyover = flyoverRef.current;
      const use3d =
        !reducedMotion &&
        flyover !== null &&
        (fromPhase === 'course' || current === '3d');
      const hole = getCourseHole(id);

      flushSync(() => {
        setOpenId(id);
        setPhase(reducedMotion ? 'hole' : 'flying');
        setBackdrop(use3d ? '3d' : '2d');
      });

      const skip = new AbortController();
      skipRef.current = skip;
      if (reducedMotion) {
        svg.setAttribute('viewBox', viewBoxString(hole.frame));
      } else if (use3d) {
        await flyover.playHole(id, skip.signal);
      } else {
        await moveCamera2D(svg, hole.frame, 900, skip.signal);
      }
      skipRef.current = null;
      setPhase('hole');
      busyRef.current = false;
      requestAnimationFrame(() =>
        headingRef.current?.focus({ preventScroll: true }),
      );
    },
    [reducedMotion],
  );

  const back = useCallback(
    async (push = true) => {
      const svg = svgRef.current;
      const { openId: leaving, backdrop: current } = stateRef.current;
      if (busyRef.current || !svg || !leaving) return;
      busyRef.current = true;
      if (push) window.history.pushState(null, '', window.location.pathname);

      setPhase('returning');
      const skip = new AbortController();
      if (reducedMotion) skip.abort();
      skipRef.current = skip;
      if (current === '3d' && flyoverRef.current) {
        await flyoverRef.current.returnToOverview(skip.signal);
        svg.setAttribute('viewBox', viewBoxString(fullViewBox));
      } else {
        await moveCamera2D(svg, fullViewBox, 900, skip.signal);
      }
      skipRef.current = null;
      flushSync(() => {
        setBackdrop('2d');
        setOpenId(null);
        setPhase('course');
        setPreviewId(leaving);
      });
      busyRef.current = false;
      document
        .querySelector<HTMLAnchorElement>(`[data-hole-link="${leaving}"]`)
        ?.focus({ preventScroll: true });
    },
    [reducedMotion],
  );

  const skip = useCallback(() => skipRef.current?.abort(), []);

  const trackSign = useCallback<TrackSign>(
    (id, onPosition) => {
      const point = getCourseHole(id).sign;
      const svg = svgRef.current;
      const host = canvasHostRef.current;
      if (!point || !svg || !host) return () => {};
      const notify = (position: Point) =>
        onPosition(position, host.getBoundingClientRect());
      const flyover = backdrop === '3d' ? flyoverRef.current : null;
      if (flyover) return flyover.trackPoint(point, notify);

      const update = () => {
        const matrix = svg.getScreenCTM();
        if (matrix) notify(new DOMPoint(point.x, point.y).matrixTransform(matrix));
      };
      const resize = new ResizeObserver(update);
      resize.observe(host);
      resize.observe(svg);
      const camera = new MutationObserver(update);
      camera.observe(svg, { attributes: true, attributeFilter: ['viewBox'] });
      window.addEventListener('scroll', update, true);
      update();
      return () => {
        resize.disconnect();
        camera.disconnect();
        window.removeEventListener('scroll', update, true);
      };
    },
    [backdrop],
  );

  useEffect(() => {
    const onPop = () => {
      skipRef.current?.abort();
      const id = new URLSearchParams(window.location.search).get('hole');
      if (isHoleId(id)) void play(id, false);
      else void back(false);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [play, back]);

  useEffect(() => {
    if (phase === 'course') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (phase === 'flying') skip();
      else if (phase === 'hole') void back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, skip, back]);

  return (
    <main className={styles.round} data-phase={phase} data-backdrop={backdrop}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span>Povilas Mackevicius</span>{' '}
          <span className={styles.titleDetail}>
            Software Engineer Country Club
          </span>
        </h1>
        <LocationClock />
        {openId && (
          <button
            type="button"
            className={`${ui.dark} ${styles.back}`}
            aria-label="Back to course"
            title="Back to course"
            onClick={() => void back()}
            disabled={phase !== 'hole'}
          >
            <Icon name="back" />
            <span className={styles.backLabel}>Back to course</span>
          </button>
        )}
      </header>

      <div className={styles.side}>
        <PlayerCard />
      </div>

      <div className={styles.region}>
        <div className={styles.map}>
          <div className={styles.stage}>
            <CourseMap
              ref={svgRef}
              className={styles.svg}
              initialViewBox={initialViewBox}
              previewId={phase === 'course' ? previewId : null}
              activeId={openId}
              onPreview={phase === 'course' ? setPreviewId : undefined}
              onPlay={phase === 'course' ? (id) => void play(id) : undefined}
            />
          </div>
          <div ref={canvasHostRef} className={styles.canvas} />
          <CourseNav
            previewId={previewId}
            hidden={phase !== 'course'}
            onPreview={setPreviewId}
            onPlay={(id) => void play(id)}
          />
        </div>
      </div>

      {openId && (
        <HoleView
          id={openId}
          phase={phase}
          headingRef={headingRef}
          trackSign={trackSign}
          onSelect={(id) => void play(id)}
          onSkip={skip}
        />
      )}
    </main>
  );
}
