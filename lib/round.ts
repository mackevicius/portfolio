export const player = {
  name: 'Povilas Mackevicius',
  role: 'Senior software engineer, front-end team lead',
  based: 'Vilnius, Lithuania',
  proSince: '2021 · Reiz Tech',
  plays: 'Angular · React · Node.js · Python',
  email: 'mackevicius.pmac@gmail.com',
  github: 'https://github.com/mackevicius',
  cv: '/cv.pdf',
} as const;

export type HoleId =
  | 'ai-support-desk'
  | 'invoice-agent'
  | 'reiz-tech'
  | 'clubhouse';

export type HoleLink = { label: string; href: string; primary?: boolean };

export type Hole = {
  id: HoleId;
  /** Tag number on the course; the clubhouse has none. */
  number: number | null;
  name: string;
  summary: string;
  facts: { label: string; value: string }[];
  details: {
    introduction: string;
    sections: { heading: string; paragraphs: string[] }[];
  };
  links: HoleLink[];
};

export const holes: Hole[] = [
  {
    id: 'reiz-tech',
    number: 1,
    name: 'Reiz Tech',
    summary:
      'Front-end team lead on a U.S. professional services platform used by hundreds of thousands of people.',
    facts: [
      { label: 'Status', value: 'Since 06/2021 · client work, private' },
      {
        label: 'Stack',
        value: 'Angular · React · TypeScript · Node.js · Python',
      },
    ],
    details: {
      introduction:
        'Since June 2021, I have worked on a U.S. professional services platform used by hundreds of thousands of people, while leading and mentoring front-end engineers at Reiz Tech.',
      sections: [
        {
          heading: 'From requirements to deployment',
          paragraphs: [
            'I own features across the delivery cycle: understanding requirements, building the application and APIs, reviewing changes, and deploying them. The work spans Angular, React, TypeScript, Node.js, Python, WebSocket, and CI/CD.',
            'This is employer and client work, kept separate from my personal projects. The code and client implementation are private; the public evidence here comes from my CV.',
          ],
        },
        {
          heading: 'A smaller application bundle',
          paragraphs: [
            'Lazy loading and sub-path imports from external packages reduced the gzipped bundle from 1.97 MB to 655 KB, about 67% smaller. HTTP caching was also added for faster loads.',
            'The reported number measures bundle size. It is not a claim that every page loads 67% faster, or a published Core Web Vitals benchmark.',
          ],
        },
        {
          heading: 'A repeatable team workflow',
          paragraphs: [
            'Ideas are sharpened into specifications through AI-assisted questions, then split into small end-to-end tickets. Agents build each ticket test-first, and changes are reviewed against both the specification and coding standards.',
            'I built an MCP workflow, now used by every developer on the team, for managing Azure tasks and pull requests from Copilot Chat. Shared context and agent rules keep that workflow consistent across the team.',
          ],
        },
        {
          heading: 'Technical leadership',
          paragraphs: [
            'My team-lead responsibilities include technical direction, pull-request reviews, 1:1s, onboarding, and standards for testing and accessibility.',
            'The aim is not only to ship individual features, but to help the team make clear decisions and maintain a dependable delivery process.',
          ],
        },
      ],
    },
    links: [{ label: 'Open CV', href: player.cv, primary: true }],
  },
  {
    id: 'ai-support-desk',
    number: 2,
    name: 'AI Support Desk',
    summary:
      'AI answers the safe support questions and hands money and account problems to a person.',
    facts: [
      { label: 'Status', value: 'Completed · live demo' },
      { label: 'Stack', value: 'Next.js · Express · Python · PostgreSQL' },
    ],
    details: {
      introduction:
        'A support desk for Tunely, a fictional music-streaming company. The central problem is not generating a reply: it is deciding when AI should answer on its own, and when a person needs to take over.',
      sections: [
        {
          heading: 'From question to reply',
          paragraphs: [
            'The system finds relevant help documents, writes a draft with its sources, then checks whether a public article clearly covers the question. Safe, covered questions get an automatic reply; risky topics, uncertainty, and reliance on internal notes go to an agent.',
            'The agent receives an editable draft and a saved decision trail. Customers can ask for a person after an automatic reply, and only the customer can mark a conversation solved.',
          ],
        },
        {
          heading: 'Where the model stops',
          paragraphs: [
            'Rules in the Express API have the final say. They can override the model for money problems, account-security incidents, weak sources, and staff-only notes. An AI suggestion is not permission to send a reply.',
            'Documents are treated as untrusted input. A copy guard checks for phrases of eight or more words taken from internal notes, both in Python and again in the API before sending. Separate checks look for unsupported words and numbers in a draft.',
          ],
        },
        {
          heading: 'Three services, clear responsibilities',
          paragraphs: [
            'Next.js handles the interface and talks to the API from the server. Express owns sessions, saved history, usage limits, local document embeddings, and the final routing rules. A Python standard-library service handles retrieval, model calls, and draft checks. PostgreSQL stores the shared state; the model key stays out of the browser.',
            'The public demo runs as on-demand Vercel functions. Pull requests also deploy the containerised services to a temporary Kubernetes cluster for browser tests. Database-enforced limits allow five live drafts per visitor and 200 per day overall; exhausted limits send questions to a person instead of breaking the conversation.',
          ],
        },
        {
          heading: 'Checks and known limits',
          paragraphs: [
            'Saved evaluations route 8 of 8 labelled cases correctly and block 3 of 3 internal-note leak attempts. Document search finds the right article in the top three for 10 of 11 questions, compared with 7 of 11 for keyword matching.',
            'Answer checks pass 17 of 19 cases. The two failures remain visible: a wrong priority suggestion and a contradiction missed by the word-based check. The copy guard also cannot catch every paraphrase or short quote.',
            'These small, fictional datasets use a fake model to make CI free and repeatable. They demonstrate the checks, not general AI accuracy. Replies stay inside the demo conversation; no email is sent.',
          ],
        },
      ],
    },
    links: [
      {
        label: 'Open live demo',
        href: 'https://ai-support-desk-omega.vercel.app/',
        primary: true,
      },
      {
        label: 'Source',
        href: 'https://github.com/mackevicius/ai-support-desk',
      },
    ],
  },
  {
    id: 'invoice-agent',
    number: 3,
    name: 'Invoice Agent',
    summary:
      'Checks supplier invoices against orders and deliveries, approves safe ones, routes the rest to a reviewer.',
    facts: [
      { label: 'Status', value: 'Completed · live demo' },
      { label: 'Stack', value: 'Python · FastAPI · LangGraph · Next.js · AWS' },
    ],
    details: {
      introduction:
        'Checks a supplier invoice against what was ordered and what actually arrived. AI reads the document and pairs differently worded lines; rules in code decide whether it can be auto-approved. The demo records decisions, not payments.',
      sections: [
        {
          heading: 'An upload becomes a saved decision',
          paragraphs: [
            'FastAPI stores the upload and queues its ID. A LangGraph worker reads the document, looks up the supplier, purchase order, and goods receipts, matches the lines, and checks for duplicates. Each step and the final decision are saved so a reviewer can inspect what happened.',
            'The hosted system uses AWS Lambda, SQS, and S3, with PostgreSQL on Neon and the interface on Vercel. Local development swaps in an in-process queue and PostgreSQL file storage behind the same interfaces.',
          ],
        },
        {
          heading: 'Code owns the approval',
          paragraphs: [
            'Exact item codes and descriptions are matched first. For unresolved lines, the model can choose only from supplied purchase-order candidates, or choose none. Invalid choices, ambiguity, and missing records require review.',
            'The rules check a 2% upper price tolerance, delivered quantities, duplicates, currency, and a known supplier. Auto-approval also requires a total strictly below the configured limit. Failures are shown as plain review reasons; the model never computes the final approval status.',
          ],
        },
        {
          heading: 'Permissions and bounded usage',
          paragraphs: [
            'Each visitor receives an isolated demo company for 24 hours. A reviewer cannot decide an invoice they uploaded, rejection needs a reason, and final decisions cannot be changed. The API enforces these rules, not just the visible controls.',
            'Live AI requests are capped at five per visitor and 100 across visitors each day. Usage is reserved atomically in PostgreSQL before each call, and provider retries are disabled. Reaching a limit routes the invoice to review; saved examples still work without model calls.',
          ],
        },
        {
          heading: 'Checks and known limits',
          paragraphs: [
            'Normal CI exercises 14 labelled synthetic decision cases with scripted model responses. All 14 keep their expected decisions and review reasons, with zero wrong auto-approvals. Any wrong auto-approval fails the check; these are software tests, not AI benchmarks.',
            'Separate real-model runs on 11 November 2026 scored 40 of 45 exact fields across three invoice images, and 84 of 84 across four generated invoices. These tiny samples are repeatable evidence, not a representative accuracy estimate. Decision evaluations start from known fields and do not measure document reading.',
            'AI can still misread a document or pair a line incorrectly, and rules can only check the values they receive. This is not a payment system or production approval authority. Demo roles are not authenticated identities; uploads should be fictional and non-sensitive.',
          ],
        },
      ],
    },
    links: [
      {
        label: 'Open live demo',
        href: 'https://invoice-agent-seven.vercel.app/',
        primary: true,
      },
      { label: 'Source', href: 'https://github.com/mackevicius/invoice-agent' },
    ],
  },
  {
    id: 'clubhouse',
    number: null,
    name: 'Clubhouse',
    summary: 'CV, education and contact.',
    facts: [
      { label: 'Based', value: player.based },
      { label: 'Email', value: player.email },
    ],
    details: {
      introduction:
        'Software engineer and front-end team lead based in Vilnius, Lithuania, with more than five years of experience building enterprise web applications.',
      sections: [
        {
          heading: 'Professional background',
          paragraphs: [
            'Senior Software Developer and Front-End Team Lead at Reiz Tech since June 2021. My work covers Angular and React applications, Node.js and Python services, APIs, WebSocket, and delivery through CI/CD.',
            'Alongside building features, I lead and mentor engineers and use AI-assisted, specification-driven, test-first development in the team workflow. The personal projects on this course are separate from employer work.',
          ],
        },
        {
          heading: 'Education',
          paragraphs: [
            "Bachelor's degree with Honors from Vilnius Tech University, 2019-2023, focused on UI/UX design, front-end development, and software engineering fundamentals.",
          ],
        },
        {
          heading: 'Tools and technologies',
          paragraphs: [
            'TypeScript, Python, FastAPI, Node.js, PHP, Next.js, Angular, React, Docker, PostgreSQL, and MySQL.',
            'Testing and delivery tools include Playwright, Vitest, Git, Azure DevOps, and CI/CD. My AI-assisted workflow uses Claude Code, Copilot, and MCP.',
          ],
        },
        {
          heading: 'Languages',
          paragraphs: [
            'Lithuanian is my native language. I am highly proficient in English.',
          ],
        },
      ],
    },
    links: [
      { label: 'Download CV', href: player.cv, primary: true },
      { label: 'Email', href: `mailto:${player.email}` },
      { label: 'GitHub', href: player.github },
    ],
  },
];

export function isHoleId(value: unknown): value is HoleId {
  return typeof value === 'string' && holes.some((h) => h.id === value);
}

export function getHole(id: HoleId): Hole {
  return holes.find((h) => h.id === id)!;
}
