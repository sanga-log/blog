// AI Coach 디테일 페이지의 코드 스니펫 모음.
// JSX template literal 안에서 사용하기 위해 백틱·달러 표현은 escape 처리.

export const C1A_CODE = `// 모듈 스코프: 페이지 로드 시점 + 재생 이력 두 게이트
let isMuted = sessionStorage.getItem("tts_muted") === "true";

// 재생된 메시지 추적 (게이트 ①: 재생 이력)
const playedMessages = new Set<string>(
  JSON.parse(sessionStorage.getItem("playedMessageIds") || "[]")
);

// 게이트 ②: 페이지 로드 시점 (새로고침 감지용)
const pageLoadTime = Date.now();

// 페이지 로드 직후(2초 이내) 도착하는 메시지는 기존 메시지로 간주
const isInitialLoad = (receivedAt?: number): boolean => {
  if (!receivedAt) return false;
  return receivedAt - pageLoadTime < 2000;
};

// --- play() 내부: 자동 재생일 때만 두 게이트 AND ---
if (!isManual) {
  if (isMessagePlayed(messageId)) return; // ① 이미 재생됨 → 차단
  if (isInitialLoad(receivedAt))   return; // ② 새로고침 초기 로드 → 차단
}`;

export const C1B_CODE = `// CoachingChattingPage.tsx — 버퍼 ref
const bufferedMessages = useRef<AiAgentConversationType[]>([]);
const bufferingRef = useRef<boolean>(false);

// handleSocketMessage 일부 — 타임스탬프 부여 + 분기 적재
const receivedAtNow = Date.now();
const messageWithTimestamp = { ...body, receivedAt: receivedAtNow };

// 중복 차단 (이미 렌더된 것 + 버퍼 안의 것까지)
if (
  messages.some((m) => m.messageId === body.messageId) ||
  bufferedMessages.current.some((m) => m.messageId === body.messageId)
) return;

// 버퍼링 중이면 큐에 적재 → 영상 ready 후 일괄 방출
if (bufferingRef.current) {
  bufferedMessages.current.push(messageWithTimestamp);
} else {
  setMessages((prev) =>
    sortMessages([...prev.filter((m) => m.messageId !== body.messageId), messageWithTimestamp])
  );
}

// utils/coachingUtils.ts — ISO 타임스탬프 나노초 정렬 (JS Date는 ms까지만)
export const parseTimestampNano = (timestamp: string): [number, number] => {
  const [datePart, timePart] = timestamp.split("T");
  const [time, rest] = timePart.split(".");
  const [nanoStr] = rest ? rest.split("Z") : ["0"];
  const baseDate = new Date(
    \`\${datePart}T\${time}.\${(nanoStr || "0").slice(0, 3)}Z\`
  ).getTime();
  const nano = parseInt((nanoStr || "0").padEnd(9, "0"), 10);
  return [baseDate, nano];
};`;

export const C1C_CODE = `// 자식 비디오 컴포넌트의 onReady가 setIsWaiting(false) 트리거
<ChattingAIDefaultBubble
  key={message.messageId}
  ttsAudioUrl={message.ttsAudioUrl}
  receivedAt={message.receivedAt}
  shouldAutoPlayTTS={shouldAutoPlayTTS}
  onReady={() => {
    if (message.attachments?.length || !message.isAttached) {
      setTimeout(
        () => setIsWaiting(false),
        message.attachments?.length ? 1500 : 800
      );
    }
  }}
  onError={() => setIsWaiting(false)}
/>

// 영상 ready + 파일 3개 도착 → 버퍼 일괄 방출
useEffect(() => {
  if (!isWaiting && hasThreeFilesRef.current) {
    bufferingRef.current = false;
    if (bufferedMessages.current.length > 0) {
      const messagesForTTS = [...bufferedMessages.current];
      setMessages((prev) => sortMessages([...prev, ...messagesForTTS]));
      bufferedMessages.current = [];
      setTimeout(() => setIsWaiting(false), 1000);
    }
  }
}, [isWaiting, messages]);`;

export const C2A_CODE = `// 디버그용 — 현재 떠 있는 모든 윈도우 이름 로깅 (지원 환경 확장 단서 수집)
screenCaptureLog.info(
  \`현재 열린 창 (\${sources.length}개): \${sources
    .map((s) => \`"\${s.name}"\`)
    .join(", ")}\`,
);
sendSlackWindowListOnce(sources);

const windowName = getWindowName();
// 창 타이틀에는 세션·사용자명이 가변 접미사로 붙는 경우가 많아 부분 매칭(includes)으로 처리
// 예: "Studio" → "Studio - Bay #3 - User" 매칭
const targetSource = sources.find((s) => s.name.includes(windowName));

if (!targetSource) {
  throw new Error(
    \`시뮬레이터 창을 찾을 수 없음 (열린 창 \${sources.length}개, 찾는 이름: "\${windowName}")\`,
  );
}
if (targetSource.thumbnail.isEmpty()) {
  // 최소화 / 다른 창에 완전히 가려진 경우 → 명시적 실패
  throw new Error(\`'\${targetSource.name}' 창 캡처 실패 (최소화 또는 가려짐)\`);
}
return targetSource.thumbnail.toPNG();`;

export const C2B_CODE = `if (clipPath && fs.existsSync(clipPath)) {
  videoWatcher = chokidar.watch(clipPath, {
    depth: 3,
    persistent: true,
    ignoreInitial: true,
    usePolling: true,            // 일부 환경에서 fsevents/inotify 미동작 → 폴링 강제
    interval: 600,
    binaryInterval: 600,
    awaitWriteFinish: {          // 시뮬레이터가 *.mp4를 chunk로 쓰는 동안 add 이벤트 보류
      stabilityThreshold: 1000,  // 1초간 변경 없으면 쓰기 완료로 판정
      pollInterval: 60,
    },
  });

  videoWatcher.on("add", async (filePath) => {
    try {
      if (hasExtension(filePath, ".mp4")) {
        handleVideoFileAdded(filePath, win);
      }
    } catch (err) {
      fileWatcherLog.error(\`비디오 파일 감지 실패: \${filePath} - \${err.message}\`, err);
    }
  });
}`;

export const C2C_CODE = `// file.js — 쓰기 완료 + 최소크기 2단 검증 (3중 안정성 게이트 ②)
export const waitForFileUsable = async (filePath, minSize = 1024, maxWaitTime = 3000) => {
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitTime) {
    try {
      const stat = await fs.promises.stat(filePath);
      if (stat.size < minSize) {
        await new Promise((r) => setTimeout(r, 300));
        continue;
      }
      await new Promise((r) => setTimeout(r, 1000));
      const newStat = await fs.promises.stat(filePath);
      if (newStat.size === stat.size && newStat.mtimeMs === stat.mtimeMs) {
        return true; // 1초간 크기·mtime 동일 → 안정
      }
    } catch {
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  return false;
};

// fileQueue.js — 멱등성 Set (3중 안정성 게이트 ③)
export const processedFiles = new Set();

if (!(await waitForFileUsable(latestFile.filePath))) return; // ② 안정성 게이트
if (processedFiles.has(latestFile.filePath)) return;          // ③ 멱등성 게이트
processedFiles.add(latestFile.filePath);`;
