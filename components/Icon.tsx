type IconName =
  | 'arrow'
  | 'external'
  | 'download'
  | 'mail'
  | 'github'
  | 'clubhouse'
  | 'back';

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M3 8h10M9 4l4 4-4 4" />,
  external: (
    <>
      <path d="M9 3h4v4" />
      <path d="M13 3 7.5 8.5" />
      <path d="M12 9.5V13H3V4h3.5" />
    </>
  ),
  download: (
    <>
      <path d="M8 2.5v8" />
      <path d="m4.5 7 3.5 3.5L11.5 7" />
      <path d="M3 13.5h10" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="3.5" width="12" height="9" />
      <path d="m2.5 4 5.5 4.5L13.5 4" />
    </>
  ),
  github: (
    <path d="M6 13.5c-3 .9-3-1.5-4.2-1.8M10 15v-2.3c0-.7.1-1-.3-1.4 2-.2 3.8-1 3.8-4.2a3.3 3.3 0 0 0-.9-2.3 3 3 0 0 0-.1-2.3s-.7-.2-2.4.9a8.2 8.2 0 0 0-4.2 0C4.2 2.3 3.5 2.5 3.5 2.5a3 3 0 0 0-.1 2.3 3.3 3.3 0 0 0-.9 2.3c0 3.2 1.9 4 3.8 4.2-.4.4-.4.8-.3 1.4V15" />
  ),
  clubhouse: (
    <>
      <path d="M2 7.5 8 3l6 4.5" />
      <path d="M3.5 6.5V13h9V6.5" />
      <path d="M6.5 13V9.5h3V13" />
    </>
  ),
  back: <path d="M13 8H3m4-4L3 8l4 4" />,
};

export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
