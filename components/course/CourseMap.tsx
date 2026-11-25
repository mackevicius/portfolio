import type { HoleId } from '@/lib/round';
import {
  COURSE_H,
  COURSE_W,
  cartPath,
  clubhouse,
  courseHoles,
  trees,
  tracerPath,
} from '@/lib/course';
import { palette as c } from '@/lib/palette';

type Props = {
  ref?: React.Ref<SVGSVGElement>;
  /** Initial viewBox; later camera moves are imperative so React never fights the animation. */
  initialViewBox: string;
  previewId: HoleId | null;
  activeId: HoleId | null;
  /** Pointer targets on the map itself; omitted while a hole is open. */
  onPreview?: (id: HoleId) => void;
  onPlay?: (id: HoleId) => void;
  className?: string;
};

/**
 * The top-down course. Uses presentation attributes only (no CSS) because the 3D layer
 * serialises the base layer into its ground texture.
 */
export function CourseMap({
  ref,
  initialViewBox,
  previewId,
  activeId,
  onPreview,
  onPlay,
  className,
}: Props) {
  const preview = courseHoles.find((h) => h.id === previewId) ?? null;
  const active = courseHoles.find((h) => h.id === activeId) ?? null;

  return (
    <svg
      ref={ref}
      className={className}
      viewBox={initialViewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="rough-grass"
          width="192"
          height="192"
          patternUnits="userSpaceOnUse"
        >
          <image
            data-ground-tile=""
            href="/rough-grass.svg"
            width="192"
            height="192"
          />
        </pattern>
        <pattern
          id="mow"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-30)"
        >
          <rect width="20" height="40" fill={c.fairwayA} />
          <rect x="20" width="20" height="40" fill={c.fairwayB} />
        </pattern>
        <pattern
          id="mow-green"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(60)"
        >
          <rect width="8" height="16" fill={c.green} />
          <rect x="8" width="8" height="16" fill="#78b764" />
        </pattern>
      </defs>

      <g data-layer="base">
        <rect
          x={-COURSE_W}
          y={-COURSE_H}
          width={COURSE_W * 3}
          height={COURSE_H * 3}
          fill="url(#rough-grass)"
        />
        {courseHoles.map((h) =>
          h.fairway ? (
            <path
              key={`rough-${h.id}`}
              d={h.fairway}
              fill={c.rough}
              stroke={c.rough}
              strokeWidth={44}
              strokeLinejoin="round"
            />
          ) : null,
        )}
        <path
          d={cartPath}
          fill="none"
          stroke={c.path}
          strokeWidth={10}
          strokeDasharray="2 16"
          strokeLinecap="round"
        />
        {courseHoles.map((h) =>
          h.fairway ? (
            <path key={`fw-${h.id}`} d={h.fairway} fill="url(#mow)" />
          ) : null,
        )}
        {/* Live-only highlight, under the greens; the texture snapshot strips it with the other layers. */}
        <g data-layer="highlight">
          {preview && !active && preview.fairway && (
            <path
              d={preview.fairway}
              fill="none"
              stroke={c.tracer}
              strokeWidth={4}
              strokeLinejoin="round"
            />
          )}
        </g>
        {courseHoles.map((h) =>
          h.green ? (
            <g key={`gr-${h.id}`}>
              <ellipse
                cx={h.green.cx}
                cy={h.green.cy}
                rx={h.green.rx + 8}
                ry={h.green.ry + 8}
                fill={c.fringe}
              />
              <ellipse
                cx={h.green.cx}
                cy={h.green.cy}
                rx={h.green.rx}
                ry={h.green.ry}
                fill="url(#mow-green)"
              />
            </g>
          ) : null,
        )}
        {courseHoles.flatMap((h) =>
          h.bunkers.map((d, i) => (
            <path key={`b-${h.id}-${i}`} d={d} fill={c.sand} />
          )),
        )}
        {courseHoles.map((h) =>
          h.tee ? (
            <rect
              key={`tee-${h.id}`}
              x={h.tee.x - 22}
              y={h.tee.y - 9}
              width={44}
              height={18}
              fill={c.tee}
              transform={`rotate(${h.tee.angle} ${h.tee.x} ${h.tee.y})`}
            />
          ) : null,
        )}
        {courseHoles.map((h) =>
          h.pin ? (
            <circle
              key={`cup-${h.id}`}
              cx={h.pin.x}
              cy={h.pin.y}
              r={2.6}
              fill="#0a2a18"
            />
          ) : null,
        )}
      </g>

      <g data-layer="clubhouse">
        {/* Gabled roof from above: lit north slope, shaded south slope. */}
        <rect
          x={clubhouse.x}
          y={clubhouse.y}
          width={clubhouse.w}
          height={clubhouse.h / 2}
          fill={c.clubRoof}
        />
        <rect
          x={clubhouse.x}
          y={clubhouse.y + clubhouse.h / 2}
          width={clubhouse.w}
          height={clubhouse.h / 2}
          fill="#435c4e"
        />
        <rect
          x={clubhouse.x + 14}
          y={clubhouse.y + clubhouse.h + 6}
          width={clubhouse.w - 28}
          height={14}
          fill={c.sand}
          opacity={0.55}
        />
      </g>

      <g data-layer="trees">
        {trees.map(([x, y, r]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={r} fill={c.tree} />
            <circle
              cx={x - r * 0.18}
              cy={y - r * 0.2}
              r={r * 0.68}
              fill={c.treeTop}
            />
          </g>
        ))}
      </g>

      <g data-layer="flags">
        {courseHoles.map((h) =>
          h.pin ? (
            <g
              key={`flag-${h.id}`}
              data-flag=""
              style={{ transformOrigin: `${h.pin.x}px ${h.pin.y}px` }}
            >
              <line
                x1={h.pin.x}
                y1={h.pin.y}
                x2={h.pin.x}
                y2={h.pin.y - 45}
                stroke={c.white}
                strokeWidth={2.5}
              />
              <path
                d={`M${h.pin.x} ${h.pin.y - 45} L${h.pin.x + 27} ${h.pin.y - 36} L${h.pin.x} ${h.pin.y - 27} Z`}
                fill={c.tracer}
              />
            </g>
          ) : null,
        )}
      </g>

      <g data-layer="overlay">
        {preview && !active && !preview.fairway && (
          <rect
            x={clubhouse.x - 6}
            y={clubhouse.y - 6}
            width={clubhouse.w + 12}
            height={clubhouse.h + 12}
            fill="none"
            stroke={c.tracer}
            strokeWidth={4}
          />
        )}
        {preview && !active && preview.shot && (
          <g opacity={0.6}>
            <path
              d={tracerPath(preview.shot)}
              fill="none"
              stroke={c.tracer}
              strokeWidth={10}
              strokeLinecap="round"
              opacity={0.3}
            />
            <path
              d={tracerPath(preview.shot)}
              fill="none"
              stroke={c.tracer}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <circle
              cx={preview.shot.rest.x}
              cy={preview.shot.rest.y}
              r={5}
              fill={c.white}
            />
          </g>
        )}
      </g>

      {onPreview && onPlay && (
        <g
          data-layer="hits"
          fill="transparent"
          pointerEvents="all"
          style={{ cursor: 'pointer' }}
        >
          {courseHoles.map((h) => (
            <g
              key={`hit-${h.id}`}
              onPointerEnter={() => onPreview(h.id)}
              onClick={() => onPlay(h.id)}
            >
              {h.fairway && (
                <path
                  d={h.fairway}
                  stroke="transparent"
                  strokeWidth={44}
                  strokeLinejoin="round"
                />
              )}
              {h.green && (
                <ellipse
                  cx={h.green.cx}
                  cy={h.green.cy}
                  rx={h.green.rx + 12}
                  ry={h.green.ry + 12}
                />
              )}
              {h.tee && <circle cx={h.tee.x} cy={h.tee.y} r={28} />}
              {!h.fairway && (
                <rect
                  x={clubhouse.x - 10}
                  y={clubhouse.y - 10}
                  width={clubhouse.w + 20}
                  height={clubhouse.h + 40}
                />
              )}
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
