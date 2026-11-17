import { getHole, holes, type HoleId } from '@/lib/round';
import type { Phase, TrackSign } from '../Round';
import { Icon } from '../Icon';
import { GreenCard } from './GreenCard';
import { ProjectDetails } from './ProjectDetails';
import ui from '../ui.module.css';
import styles from './HoleView.module.css';

type Props = {
  id: HoleId;
  phase: Phase;
  headingRef: React.Ref<HTMLHeadingElement>;
  trackSign: TrackSign;
  onSelect: (id: HoleId) => void;
  onSkip: () => void;
};

const isPlainClick = (e: React.MouseEvent) =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

export function HoleView({
  id,
  phase,
  headingRef,
  trackSign,
  onSelect,
  onSkip,
}: Props) {
  const hole = getHole(id);
  const external = (href: string) => href.startsWith('http');

  return (
    <div className={styles.layer} data-phase={phase}>
      <nav aria-label="Holes" className={styles.scorebug}>
        {holes.map((h) => (
          <a
            key={h.id}
            href={`/?hole=${h.id}`}
            className={styles.tab}
            aria-current={h.id === id ? 'page' : undefined}
            ref={
              h.id === id
                ? (el) => {
                    if (el?.parentElement)
                      el.parentElement.scrollLeft = el.offsetLeft - 56;
                  }
                : undefined
            }
            onClick={(e) => {
              if (!isPlainClick(e)) return;
              e.preventDefault();
              if (h.id !== id && phase === 'hole') onSelect(h.id);
            }}
          >
            {h.number !== null ? (
              <>
                <span className={styles.tabNum}>{h.number}</span>
                <span className={styles.tabName}>{h.name}</span>
              </>
            ) : (
              <>
                <Icon name="clubhouse" />
                <span className={styles.tabName}>Clubhouse</span>
              </>
            )}
          </a>
        ))}
      </nav>

      {phase === 'flying' && (
        <button
          type="button"
          className={`${ui.dark} ${styles.skip}`}
          onClick={onSkip}
        >
          Skip flyover
        </button>
      )}

      {phase === 'hole' && (
        <section className={styles.panels} aria-labelledby="hole-title">
          <div className={styles.lowerThird}>
            <div className={styles.ltTop}>
              <span className={styles.ltHole}>
                {hole.number !== null ? (
                  `Hole ${hole.number}`
                ) : (
                  <Icon name="clubhouse" size={24} />
                )}
              </span>
              <h2
                id="hole-title"
                ref={headingRef}
                tabIndex={-1}
                className={styles.ltName}
              >
                {hole.name}
              </h2>
            </div>
            <div className={styles.ltBottom}>
              <p className={styles.summary}>{hole.summary}</p>
              <dl className={styles.facts}>
                {hole.facts.map((f) => (
                  <div key={f.label}>
                    <dt className={ui.label}>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className={styles.actions}>
                {hole.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className={l.primary ? ui.primary : ui.dark}
                    {...(external(l.href)
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                    {...(l.href.endsWith('.pdf') ? { download: true } : {})}
                  >
                    {l.label}
                    <Icon
                      name={
                        external(l.href)
                          ? 'external'
                          : l.href.endsWith('.pdf')
                            ? 'download'
                            : 'mail'
                      }
                    />
                  </a>
                ))}
                {hole.id === 'clubhouse' && <ProjectDetails hole={hole} />}
              </div>
            </div>
          </div>
          <GreenCard id={id} />
          {hole.id !== 'clubhouse' && (
            <ProjectDetails hole={hole} trackSign={trackSign} />
          )}
        </section>
      )}
    </div>
  );
}
