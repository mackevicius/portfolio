import { useRef, useState } from 'react';
import type { HoleId } from '@/lib/round';
import { Icon } from '../Icon';
import styles from './GreenCard.module.css';

function Frame({
  source,
  label,
  children,
  className = '',
}: {
  source: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside className={`${styles.card} ${className}`} aria-label={label}>
      <div className={styles.head}>
        <span className={styles.source}>{source}</span>
        <span className={styles.chip}>{label}</span>
      </div>
      {children}
    </aside>
  );
}

type ReplaySlide = {
  title: string;
  content: React.ReactNode;
};

function Replay({ source, slides }: { source: string; slides: ReplaySlide[] }) {
  const [current, setCurrent] = useState(0);
  const readingRef = useRef<HTMLDivElement>(null);
  const showSlide = (index: number) => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, index)));
    if (readingRef.current) readingRef.current.scrollTop = 0;
  };

  return (
    <Frame source={source} label="Illustrative replay" className={styles.replayCard}>
      <div
        className={styles.replay}
        role="region"
        aria-roledescription="carousel"
        aria-label="Project replay"
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            showSlide(current + (event.key === 'ArrowLeft' ? -1 : 1));
          } else if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            showSlide(event.key === 'Home' ? 0 : slides.length - 1);
          }
        }}
      >
        <div
          className={styles.slides}
          ref={readingRef}
          role="group"
          aria-label="Slide content"
          tabIndex={0}
        >
          {slides.map((slide, index) => (
            <section
              key={slide.title}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
              aria-hidden={index !== current}
              hidden={index !== current}
              inert={index !== current}
            >
              <h3 className={styles.slideTitle}>{slide.title}</h3>
              {slide.content}
            </section>
          ))}
        </div>
        <div className={styles.slideNav}>
          <span className={styles.counter} role="status" aria-atomic="true">
            {current + 1}
            <span className={styles.counterTotal}> / {slides.length}</span>
            <span className="visually-hidden">: {slides[current].title}</span>
          </span>
          <div className={styles.slideControls}>
            <button
              type="button"
              className={styles.slideButton}
              aria-label="Previous slide"
              title="Previous slide"
              disabled={current === 0}
              onClick={() => showSlide(current - 1)}
            >
              <Icon name="back" size={18} />
            </button>
            <button
              type="button"
              className={styles.slideButton}
              aria-label="Next slide"
              title="Next slide"
              disabled={current === slides.length - 1}
              onClick={() => showSlide(current + 1)}
            >
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function SupportReplay() {
  return (
    <Replay
      source="ai-support-desk-omega.vercel.app"
      slides={[
        {
          title: 'Covered question',
          content: (
            <ol className={styles.thread}>
              <li className={styles.customer}>How do I cancel my subscription?</li>
              <li className={styles.route}>
                <span className={styles.routeDot} aria-hidden="true" />
                Covered by a public help article. AI replies on its own.
              </li>
              <li className={styles.system}>
                The plan owner can cancel from Settings &gt; Plan &gt; Cancel.
              </li>
            </ol>
          ),
        },
        {
          title: 'Human hand-off',
          content: (
            <ol className={styles.thread}>
              <li className={styles.customer}>I was charged twice.</li>
              <li className={`${styles.route} ${styles.handoff}`}>
                <span className={styles.routeDot} aria-hidden="true" />
                Money problem. Handed to a person, with an AI draft and its reasoning.
              </li>
              <li className={styles.system}>A team member will reply.</li>
            </ol>
          ),
        },
        {
          title: 'Saved test run',
          content: (
            <>
              <dl className={styles.results}>
                <div>
                  <dt>Labelled hand-off cases routed correctly</dt>
                  <dd>8 / 8</dd>
                </div>
                <div>
                  <dt>Attempts to pull out internal notes blocked</dt>
                  <dd>3 / 3</dd>
                </div>
              </dl>
              <p className={styles.note}>
                Small, fictional dataset; it shows the checks work, not general accuracy.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}

function InvoiceReplay() {
  return (
    <Replay
      source="invoice-agent-seven.vercel.app"
      slides={[
        {
          title: 'Matching invoice',
          content: (
            <>
              <p className={styles.invoiceContext}>
                Paper &amp; Co. · PO-1002<br />
                24 boxes of recycled A4 paper
              </p>
              <dl className={styles.invoiceAmounts}>
                <div><dt>Unit price</dt><dd>EUR&nbsp;111.60</dd></div>
                <div><dt>Total</dt><dd>EUR&nbsp;2,678.40</dd></div>
              </dl>
              <span className={styles.approved}>Auto-Approved</span>
            </>
          ),
        },
        {
          title: 'Overcharged invoice',
          content: (
            <>
              <p className={styles.invoiceContext}>Paper &amp; Co. · PO-1002</p>
              <dl className={styles.invoiceAmounts}>
                <div><dt>Unit price</dt><dd className={styles.mismatch}>EUR&nbsp;120.00</dd></div>
                <div><dt>Total</dt><dd>EUR&nbsp;2,880.00</dd></div>
              </dl>
              <span className={styles.review}>In Review</span>
              <p className={styles.reason}>
                Unit price more than 2% above the purchase order, so a reviewer decides.
              </p>
            </>
          ),
        },
        {
          title: 'Decision checks',
          content: (
            <>
              <dl className={styles.results}>
                <div><dt>Synthetic decision cases correct</dt><dd>14 / 14</dd></div>
                <div><dt>Wrong Auto-Approvals</dt><dd>0</dd></div>
              </dl>
              <p className={styles.note}>
                The model reads documents and pairs lines; rules in code decide. Enforced in CI.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}

function BundleReplay() {
  return (
    <Frame source="Reiz Tech · from the CV" label="Measured result">
      <p className={styles.caption}>Bundle size, gzipped</p>
      <div className={styles.bars}>
        <div className={styles.bar}>
          <span className={styles.barLabel}>Before</span>
          <span className={styles.barTrack}>
            <span
              className={styles.barFill}
              style={{ '--w': 1 } as React.CSSProperties}
            />
          </span>
          <span className={styles.barValue}>1.97 MB</span>
        </div>
        <div className={`${styles.bar} ${styles.after}`}>
          <span className={styles.barLabel}>After</span>
          <span className={styles.barTrack}>
            <span
              className={styles.barFill}
              style={{ '--w': 655 / 1970 } as React.CSSProperties}
            />
          </span>
          <span className={styles.barValue}>655 KB</span>
        </div>
      </div>
      <p className={styles.reason}>
        About 67% smaller with lazy loading and sub-path imports. HTTP caching
        added for faster loads.
      </p>
      <ul className={styles.points}>
        <li>
          Built an MCP workflow every developer on the team now uses to handle
          Azure tasks and pull requests from Copilot Chat.
        </li>
        <li>
          Leads a spec-driven, test-first workflow with AI agents, reviewed
          against the spec and coding standards.
        </li>
        <li>
          Leads and mentors front-end engineers: technical direction, PR
          reviews, 1:1s and onboarding.
        </li>
      </ul>
    </Frame>
  );
}

function ClubhouseCard() {
  return (
    <Frame source="Curriculum vitae" label="Summary">
      <dl className={styles.cv}>
        <div>
          <dt>Experience</dt>
          <dd>
            5+ years. Senior Software Developer and Front-End Team Lead at UAB
            &ldquo;Reiz Tech&rdquo; since 06/2021.
          </dd>
        </div>
        <div>
          <dt>Education</dt>
          <dd>Bachelor&rsquo;s (Honors), Vilnius Tech University, 2019–2023</dd>
        </div>
        <div>
          <dt>Languages</dt>
          <dd>Lithuanian (native), English (highly proficient)</dd>
        </div>
        <div>
          <dt>Skills</dt>
          <dd>
            TypeScript, Python, FastAPI, Node.js, PHP, Next.js, Angular, React,
            Docker, PostgreSQL / MySQL, Playwright, Vitest, MCP, WebSocket,
            Azure DevOps, CI/CD
          </dd>
        </div>
      </dl>
    </Frame>
  );
}

export function GreenCard({ id }: { id: HoleId }) {
  switch (id) {
    case 'ai-support-desk':
      return <SupportReplay />;
    case 'invoice-agent':
      return <InvoiceReplay />;
    case 'reiz-tech':
      return <BundleReplay />;
    case 'clubhouse':
      return <ClubhouseCard />;
  }
}
