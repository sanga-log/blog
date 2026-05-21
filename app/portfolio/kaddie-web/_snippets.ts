// Kaddie Web 디테일 페이지의 코드 스니펫 모음.
// JSX template literal 안에서 사용하기 위해 백틱·달러·백슬래시는 escape 처리.

export const C3_CODE = `// react-query 기반 — 상태·폴링·가드를 선언적으로 한 책임에 응집
const POLL_INTERVAL_MS = 1000;
const MAX_ATTEMPTS = 5;
type OrderStatus = "PENDING" | "COMPLETE" | "FAILED";

const submitOrder = useMutation({ mutationFn: postOrder });

// orderId 생기면 자동 폴링 시작. 종결 상태 또는 5회 도달 시 refetchInterval이 false 반환 → 자동 정지.
const orderStatus = useQuery<{ status: OrderStatus }>({
  queryKey: ["orderStatus", submitOrder.data?.orderId],
  queryFn: () => checkOrder(submitOrder.data!.orderId),
  enabled: !!submitOrder.data?.orderId,
  refetchInterval: (q) => {
    const status = q.state.data?.status;
    if (status === "COMPLETE" || status === "FAILED") return false;
    if (q.state.dataUpdateCount >= MAX_ATTEMPTS) return false;
    return POLL_INTERVAL_MS;
  },
  retry: false,
});

// 종결 또는 타임아웃 → navigate (단일 effect로 라우팅 책임 응집)
useEffect(() => {
  const status = orderStatus.data?.status;
  if (status === "COMPLETE") return navigate("/success");
  if (status === "FAILED") return navigate("/failed");
  if (orderStatus.dataUpdateCount >= MAX_ATTEMPTS && status === "PENDING") navigate("/failed");
}, [orderStatus.data, orderStatus.dataUpdateCount]);

// 약관 동의는 react-hook-form + Zod resolver로 폼 단계에서 검증 (생략)
const handleConfirmPayment = () => submitOrder.mutate(payload);

// isPending(주문 생성) || isFetching(폴링) — 단일 disabled 신호. 수동 이중 상태 제거.
<button onClick={handleConfirmPayment} disabled={submitOrder.isPending || orderStatus.isFetching}>
  {submitOrder.isPending || orderStatus.isFetching ? "Processing…" : "Confirm Payment"}
</button>`;

export const C4A_CODE = `// 1) MD5 해시 캐시 — 변경된 키만 갱신
function getHash(value: string): string {
  return crypto.createHash("md5").update(value).digest("hex");
}
function loadCache(): CacheData | null {
  if (fs.existsSync(CACHE_PATH)) return JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
  return null;
}
function saveCache(hashes: Record<string, string>): void {
  fs.writeFileSync(CACHE_PATH, JSON.stringify({ lastFetched: new Date().toISOString(), hashes }, null, 2));
}

// 2) Google Sheets API — 비개발자(기획/CS)가 시트에서 번역 관리
const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH, // ← Jenkins 단계에서 AWS Secrets Manager로부터 주입
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});
const sheets = google.sheets({ version: "v4", auth });
const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: "A:J" });

// 3) row → hash 비교, 변경된 키만 changedKeys로 모음
const cache = loadCache();
const newHashes: Record<string, string> = {};
const changedKeys: string[] = [];
for (let i = 1; i < rows.length; i++) {
  const key = rows[i][keyIndex]?.trim()?.replace(/\\//g, ".") || "";
  let rowString = key;
  for (const lang of LANGUAGES) rowString += \`|\${rows[i][langIndices[lang]]?.trim() || ""}\`;
  const rowHash = getHash(rowString);
  newHashes[key] = rowHash;
  if (!cache?.hashes[key] || cache.hashes[key] !== rowHash) changedKeys.push(key);
}
if (changedKeys.length === 0 && cache) return; // 변경 없으면 스킵 → 빌드 시간 절약`;

export const C4B_CODE = `// package.json — prebuild 훅 (빌드 직전 자동 실행)
"i18n": "ts-node --project scripts/tsconfig.json scripts/fetch-translations.ts",
"prebuild": "npm run i18n"

// Jenkinsfile-us — AWS Secrets Manager 주입 (빌드 타임 한정)
environment {
  AWS_SECRETS_REGION = "<REGION>"
  GOOGLE_SHEETS_SECRET_NAME = "<SECRET_PATH>/google-sheets-credentials"
}

stage("Build Docker Image") {
  steps {
    script {
      // AWS Secrets Manager에서 Google Sheets 서비스 계정 키를 빌드 타임에만 주입
      sh '''
        aws secretsmanager get-secret-value \\
          --region \${AWS_SECRETS_REGION} \\
          --secret-id \${GOOGLE_SHEETS_SECRET_NAME} \\
          --query SecretString --output text > credentials.json
      '''
      sh "docker build -t <ECR_URI>/<REPO>:\${GIT_COMMIT_HASH} ."
      sh "rm -f credentials.json" // 이미지 푸시 후 즉시 폐기
    }
  }
}`;
