export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOutExpo = (t: number) =>
  t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

/**
 * Runs `step(progress)` on animation frames for `duration` ms. Aborting the signal jumps to
 * the final frame, so a skipped sequence still lands in its finished state.
 */
export function tween(
  duration: number,
  step: (t: number) => void,
  signal?: AbortSignal,
): Promise<void> {
  return new Promise((resolve) => {
    if (signal?.aborted || duration <= 0) {
      step(1);
      resolve();
      return;
    }
    const start = performance.now();
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      signal?.removeEventListener('abort', finish);
      step(1);
      resolve();
    };
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      if (t >= 1) return finish();
      step(t);
      frame = requestAnimationFrame(tick);
    };
    signal?.addEventListener('abort', finish, { once: true });
    frame = requestAnimationFrame(tick);
  });
}
