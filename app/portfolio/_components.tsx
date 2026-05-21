const MONO_FONT =
  "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', ui-monospace, Menlo, Consolas, monospace";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-black tracking-widest uppercase mb-5 text-gray-400">
      {children}
    </h2>
  );
}

export function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-black">{children}</strong>;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold border border-gray-300 text-gray-500 px-2 py-0.5">
      {children}
    </span>
  );
}

function Dot() {
  return (
    <span className="mt-[0.65em] w-1 h-1 rounded-full bg-black shrink-0 inline-block" />
  );
}

export function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-sm leading-[1.75] text-gray-700 flex items-start gap-2"
        >
          <Dot />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export interface Snippet {
  filename: string;
  code: string;
  highlight: React.ReactNode;
}

const CODE_COLOR = "#1F1B14";
const COMMENT_COLOR = "#8A7B57";
const COMMENT_MARK = "📌"; // 단독 설명 주석 표시 (안내 개념)

// 줄 안에서 주석(//) 시작 위치를 찾는다. 문자열·정규식 안의 //(예: "https://", /\//g)는
// 오감지하지 않도록 따옴표 상태를 추적하고 \ : / 직후의 //는 건너뛴다.
function findCommentStart(line: string): number {
  let inString: string | null = null;
  for (let i = 0; i < line.length - 1; i++) {
    const char = line[i];
    if (inString) {
      if (char === "\\") {
        i++;
        continue;
      }
      if (char === inString) inString = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      inString = char;
      continue;
    }
    if (char === "/" && line[i + 1] === "/") {
      const prev = line[i - 1];
      if (prev === "\\" || prev === ":" || prev === "/") continue;
      return i;
    }
  }
  return -1;
}

// 주석은 흐린 색으로, 코드 없이 //로 시작하는 단독 설명 주석은 슬래시를 떼고 안내 이모지로 대체
function renderCodeLines(code: string): React.ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, index) => {
    const newline = index < lines.length - 1 ? "\n" : null;
    const commentStart = findCommentStart(line);

    if (commentStart === -1) {
      return (
        <span key={index}>
          {line}
          {newline}
        </span>
      );
    }

    const codePart = line.slice(0, commentStart);
    const isStandalone = codePart.trim() === "";
    const commentPart = isStandalone
      ? line.slice(commentStart).replace(/^\/\/\s?/, `${COMMENT_MARK} `)
      : line.slice(commentStart);

    return (
      <span key={index}>
        {codePart}
        <span style={{ color: COMMENT_COLOR }}>{commentPart}</span>
        {newline}
      </span>
    );
  });
}

export function CodeSnippet({ filename, code, highlight }: Snippet) {
  return (
    <div className="mt-5">
      <div
        className="text-[11px] text-gray-500 mb-1.5 tracking-wide"
        style={{ fontFamily: MONO_FONT }}
      >
        {filename}
      </div>
      <pre
        className="text-[12.5px] leading-[1.75] px-5 py-4 overflow-x-auto rounded-md"
        style={{
          fontFamily: MONO_FONT,
          background: "#ECE5D0",
          border: "1px solid #D6CCB8",
          color: CODE_COLOR,
        }}
      >
        <code
          className="whitespace-pre"
          style={{ color: CODE_COLOR, background: "transparent" }}
        >
          {renderCodeLines(code)}
        </code>
      </pre>
      <p className="text-xs leading-[1.65] text-gray-600 mt-2.5 italic">
        {highlight}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 다이어그램 컴포넌트 — 흑백 미니멀 톤
// ─────────────────────────────────────────────

export function FlowStep({
  children,
  emphasis = false,
}: {
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`px-4 py-2.5 text-[13px] leading-snug max-w-md w-full text-center break-words ${
        emphasis
          ? "border-2 border-black bg-white font-bold"
          : "border border-gray-400 bg-white"
      }`}
    >
      {children}
    </div>
  );
}

export function FlowArrow({ label }: { label?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-gray-400 py-0.5">
      <span className="text-lg leading-none">↓</span>
      {label && (
        <span className="text-[10px] mt-0.5 italic text-gray-500">{label}</span>
      )}
    </div>
  );
}

export function FlowAside({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] text-gray-500 italic mt-1 text-center leading-snug break-words">
      {children}
    </p>
  );
}

export function Diagram({
  title,
  children,
  caption,
}: {
  title?: string;
  children: React.ReactNode;
  caption?: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      {title && (
        <div className="text-[11px] text-gray-500 mb-2 tracking-wide font-bold uppercase">
          {title}
        </div>
      )}
      <div className="border border-gray-200 bg-white py-7 px-4">
        <div className="flex flex-col items-center gap-0">{children}</div>
      </div>
      {caption && (
        <p className="text-xs leading-[1.65] text-gray-600 mt-2.5 italic">
          {caption}
        </p>
      )}
    </div>
  );
}

interface DecisionProps {
  number: number;
  title: string;
  body: React.ReactNode;
  diagram?: React.ReactNode;
  snippets?: Snippet[];
  result: React.ReactNode[];
  retrospective: React.ReactNode;
}

export function Decision({
  number,
  title,
  body,
  diagram,
  snippets,
  result,
  retrospective,
}: DecisionProps) {
  return (
    <div className="mt-12 first:mt-0 pt-10 first:pt-0 border-t first:border-t-0 border-gray-100">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-xs font-black tracking-widest uppercase text-gray-500">
          ADR {String(number).padStart(2, "0")}
        </span>
      </div>
      <h3 className="text-lg sm:text-xl font-black leading-tight tracking-tight mb-4">
        {title}
      </h3>
      <div className="text-sm leading-[1.75] text-gray-700 space-y-3">
        {body}
      </div>
      {diagram && <div className="mt-2">{diagram}</div>}
      {snippets && snippets.length > 0 && (
        <div className="mt-2">
          {snippets.map((s, i) => (
            <CodeSnippet key={i} {...s} />
          ))}
        </div>
      )}
      <div className="mt-7 border-l-2 border-gray-900 pl-4">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
          Result
        </h4>
        <BulletList items={result} />
      </div>
      <div className="mt-6">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
          Retrospective
        </h4>
        <p className="text-sm leading-[1.75] text-gray-600">{retrospective}</p>
      </div>
    </div>
  );
}
