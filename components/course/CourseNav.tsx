import { COURSE_H, COURSE_W, getCourseHole } from '@/lib/course';
import { getHole, holes, type HoleId } from '@/lib/round';
import { Icon } from '../Icon';
import ui from '../ui.module.css';
import styles from './CourseNav.module.css';

type Props = {
  previewId: HoleId;
  hidden: boolean;
  onPreview: (id: HoleId) => void;
  onPlay: (id: HoleId) => void;
};

const isPlainClick = (e: React.MouseEvent) =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

function HoleNumber({ id }: { id: HoleId }) {
  const n = getHole(id).number;
  return n === null ? <Icon name="clubhouse" size={18} /> : <>{n}</>;
}

export function CourseNav({ previewId, hidden, onPreview, onPlay }: Props) {
  const preview = getHole(previewId);

  return (
    <div
      className={styles.layer}
      data-hidden={hidden || undefined}
      inert={hidden}
    >
      <div className={styles.badges} aria-hidden="true">
        {holes.map((h) => {
          const { badge } = getCourseHole(h.id);
          return (
            <span
              key={h.id}
              className={styles.badge}
              data-active={h.id === previewId || undefined}
              style={
                {
                  '--bx': badge.x / COURSE_W,
                  '--by': badge.y / COURSE_H,
                } as React.CSSProperties
              }
            >
              <HoleNumber id={h.id} />
            </span>
          );
        })}
      </div>

      <nav aria-label="Course" className={styles.nav}>
        <p className={styles.hint}>
          <span className={styles.hintPointer}>Click a hole to fly in</span>
          <span className={styles.hintTouch}>Tap a hole to fly in</span>
        </p>
        <ol className={styles.list}>
          {holes.map((h) => {
            const { tag } = getCourseHole(h.id);
            return (
              <li
                key={h.id}
                className={styles.item}
                style={
                  {
                    '--x': tag.x / COURSE_W,
                    '--y': tag.y / COURSE_H,
                  } as React.CSSProperties
                }
              >
                <a
                  href={`/?hole=${h.id}`}
                  data-hole-link={h.id}
                  className={styles.tag}
                  data-active={h.id === previewId || undefined}
                  onPointerEnter={() => onPreview(h.id)}
                  onFocus={() => onPreview(h.id)}
                  onClick={(e) => {
                    if (!isPlainClick(e)) return;
                    e.preventDefault();
                    onPlay(h.id);
                  }}
                >
                  <span className={styles.num}>
                    {h.number !== null && (
                      <span className="visually-hidden">Hole </span>
                    )}
                    <HoleNumber id={h.id} />
                  </span>
                  <span className={styles.title}>
                    <span className={styles.name}>
                      {h.name}
                      {h.number === null && (
                        <span className={styles.suffix}>
                          {' '}
                          · CV &amp; contact
                        </span>
                      )}
                    </span>
                    <span className={styles.meta}>{h.facts[0].value}</span>
                  </span>
                  <span className={styles.go}>
                    <Icon name="arrow" />
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className={styles.preview}>
        <p className={styles.previewHead}>
          {preview.number !== null
            ? `Hole ${preview.number} · ${preview.name}`
            : `${preview.name} · CV & contact`}
        </p>
        <p className={styles.previewBody}>{preview.summary}</p>
        <p className={styles.previewMeta}>
          {preview.facts.map((f) => f.value).join(' · ')}
        </p>
        <button
          type="button"
          className={ui.ink}
          onClick={() => onPlay(preview.id)}
        >
          {preview.number !== null ? 'Play this hole' : 'Walk to the clubhouse'}
          <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}
