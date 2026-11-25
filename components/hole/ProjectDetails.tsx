import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Hole } from '@/lib/round';
import type { TrackSign } from '../Round';
import { Icon } from '../Icon';
import ui from '../ui.module.css';
import styles from './ProjectDetails.module.css';

export function ProjectDetails({
  hole,
  trackSign,
}: {
  hole: Hole;
  trackSign?: TrackSign;
}) {
  const signRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(hole.id === 'clubhouse');

  useLayoutEffect(() => {
    const sign = signRef.current;
    if (!sign || !trackSign) return;
    return trackSign(hole.id, (position, bounds) => {
      const parent = sign.offsetParent?.getBoundingClientRect();
      if (!parent) return;
      const navigation = sign
        .closest('[data-phase]')
        ?.querySelector('nav')
        ?.getBoundingClientRect();
      const top =
        navigation && navigation.bottom <= bounds.bottom
          ? Math.max(bounds.top, navigation.bottom)
          : bounds.top;
      const buttonHeight = sign.querySelector('button')?.offsetHeight ?? 76;
      const scale = Math.min(
        1,
        Math.max(44 / buttonHeight, (position.y - top - 8) / sign.offsetHeight),
      );
      const width = sign.offsetWidth * scale;
      const left = Math.max(
        bounds.left + 8,
        Math.min(position.x - width / 2, bounds.right - width - 8),
      );
      sign.style.left = `${left - parent.left}px`;
      sign.style.top = `${position.y - parent.top}px`;
      sign.style.setProperty('--sign-scale', `${scale}`);
      sign.style.visibility = 'visible';
    });
  }, [hole.id, trackSign]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  const showDetails = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    if (articleRef.current) articleRef.current.scrollTop = 0;
    setOpen(true);
  };

  const closeFromBackdrop = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      event.currentTarget.close();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') event.stopPropagation();
    if (event.key !== 'Tab' || event.altKey || event.ctrlKey || event.metaKey) return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex="0"]',
    );
    const first = controls.item(0);
    const last = controls.item(controls.length - 1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <>
      {hole.id === 'clubhouse' ? (
        <button
          type="button"
          className={ui.dark}
          onClick={showDetails}
          aria-label={`Open ${hole.name} details`}
          aria-haspopup="dialog"
          aria-controls="project-details"
        >
          About &amp; contact
          <Icon name="arrow" />
        </button>
      ) : (
        <div ref={signRef} className={styles.sign}>
          <button
            type="button"
            className={styles.signFace}
            onClick={showDetails}
            aria-label={`Open ${hole.name} details`}
            aria-haspopup="dialog"
            aria-controls="project-details"
          >
            <span className={styles.signNumber} aria-hidden="true">
              {hole.number}
            </span>
            <span className={styles.signLabel}>Project details</span>
            <Icon name="arrow" size={18} />
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        id="project-details"
        className={styles.dialog}
        aria-labelledby="project-details-title"
        onClose={() => setOpen(false)}
        onClick={closeFromBackdrop}
        onKeyDown={handleKeyDown}
      >
        <header className={styles.header}>
          <span className={styles.holeNumber}>
            {hole.number !== null ? (
              `Hole ${hole.number}`
            ) : (
              <Icon name="clubhouse" size={24} />
            )}
          </span>
          <h2 id="project-details-title" className={styles.title}>
            {hole.id === 'clubhouse' ? 'About & contact' : hole.name}
          </h2>
          <form method="dialog">
            <button
              type="submit"
              className={styles.close}
              aria-label="Close project details"
              title="Close project details"
            >
              <Icon name="back" size={22} />
            </button>
          </form>
        </header>

        <article ref={articleRef} className={styles.article} tabIndex={0}>
          <p className={styles.introduction}>{hole.details.introduction}</p>
          <dl className={styles.facts}>
            {hole.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.sections}>
            {hole.details.sections.map((section) => (
              <section key={section.heading}>
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </article>

        <footer className={styles.actions}>
          {hole.links.map((link) => {
            const external = link.href.startsWith('http');
            const download = link.href.endsWith('.pdf');
            return (
              <a
                key={link.label}
                href={link.href}
                className={link.primary ? ui.primary : ui.ink}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                {...(download ? { download: true } : {})}
              >
                {link.label}
                <Icon name={external ? 'external' : download ? 'download' : 'mail'} />
              </a>
            );
          })}
        </footer>
      </dialog>
    </>
  );
}
