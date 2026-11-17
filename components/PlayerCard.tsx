import Image from 'next/image';
import { player } from '@/lib/round';
import { Icon } from './Icon';
import ui from './ui.module.css';
import styles from './PlayerCard.module.css';

export function PlayerCard() {
  return (
    <header className={styles.card}>
      <div className={styles.photo}>
        <Image
          src="/player-golf.png"
          alt="Illustrated portrait of Povilas Mackevičius holding a golf driver over his shoulder"
          width={1024}
          height={1536}
          priority
          sizes="(max-width: 899px) 216px, 360px"
          className={styles.img}
        />
      </div>
      <h2 className={styles.name}>{player.name}</h2>
      <dl className={styles.info}>
        <div className={styles.row}>
          <dt className={ui.label}>Role</dt>
          <dd>{player.role}</dd>
        </div>
        <div className={`${styles.row} ${styles.extra}`}>
          <dt className={ui.label}>Based</dt>
          <dd>{player.based}</dd>
        </div>
        <div className={`${styles.row} ${styles.extra}`}>
          <dt className={ui.label}>Pro since</dt>
          <dd>{player.proSince}</dd>
        </div>
        <div className={`${styles.row} ${styles.extra}`}>
          <dt className={ui.label}>Plays</dt>
          <dd>{player.plays}</dd>
        </div>
      </dl>
      <div className={styles.links}>
        <a className={ui.dark} href={player.cv} download>
          <Icon name="download" />
          CV
        </a>
        <a className={ui.dark} href={`mailto:${player.email}`}>
          <Icon name="mail" />
          Email
        </a>
        <a
          className={ui.dark}
          href={player.github}
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="github" />
          GitHub
        </a>
      </div>
    </header>
  );
}
