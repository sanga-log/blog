"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const NAME = "이상아";
const INTRO_TEXT = `B2B 기술영업 7년 → 4년차 프론트엔드 개발자.\n낯선 도메인을 받아들이고 다른 직군과 일하는 환경에 익숙합니다.`;

const SPRITE_URL = "/images/thronglet.png";
const SPRITE_COLS = 4;
const SPRITE_ROWS = 4;
const SPRITE_DISPLAY_SIZE = 480;
const SPRITE_BG_SIZE = `${SPRITE_COLS * SPRITE_DISPLAY_SIZE}px ${SPRITE_ROWS * SPRITE_DISPLAY_SIZE}px`;

const TOTAL_FRAMES = 15;
const FINAL_FRAME = TOTAL_FRAMES - 1;
const SOLVE_FRAME = FINAL_FRAME;

const IDLE_HOLD_MS = 500;
const FRAME_DURATION_MS = 150;
const POST_WALK_HOLD_MS = 500;

const WALK_SEQUENCE: ReadonlyArray<{ frame: number; at: number }> = Array.from(
  { length: TOTAL_FRAMES - 1 },
  (_, i) => ({
    frame: i + 1,
    at: IDLE_HOLD_MS + i * FRAME_DURATION_MS,
  }),
);

const WALK_END_AT = IDLE_HOLD_MS + (TOTAL_FRAMES - 1) * FRAME_DURATION_MS;

const TIMING = {
  textStart: WALK_END_AT + POST_WALK_HOLD_MS,
  settleStart: WALK_END_AT + POST_WALK_HOLD_MS + 600,
} as const;

const TYPE_INTERVAL = 50;
const STAGE_WIDTH = 720;
const STAGE_HEIGHT = 480;
const STAGE_INITIAL_X = -120;
const STAGE_SETTLE_X = 280;

const BUG_IMAGE = "/images/bug.svg";
const BUG_DISPLAY_WIDTH = 44;
const BUG_DISPLAY_HEIGHT = 35;

function getFrameBgPos(frame: number): string {
  const col = frame % SPRITE_COLS;
  const row = Math.floor(frame / SPRITE_COLS);
  return `${-col * SPRITE_DISPLAY_SIZE}px ${-row * SPRITE_DISPLAY_SIZE}px`;
}

function PixelSparkle({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 5 5"
      shapeRendering="crispEdges"
      style={{ imageRendering: "pixelated" }}
      aria-hidden
    >
      <rect x="2" y="0" width="1" height="5" fill="#F4C642" />
      <rect x="0" y="2" width="5" height="1" fill="#F4C642" />
    </svg>
  );
}

function useTypewriter(text: string, enabled: boolean) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!enabled) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, TYPE_INTERVAL);
    return () => clearInterval(interval);
  }, [text, enabled]);

  return typed;
}

export default function HeroThronglet() {
  const [frame, setFrame] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [
      ...WALK_SEQUENCE.map(({ frame: f, at }) =>
        setTimeout(() => setFrame(f), at),
      ),
      setTimeout(() => setTextVisible(true), TIMING.textStart),
      setTimeout(() => setSettled(true), TIMING.settleStart),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const typed = useTypewriter(INTRO_TEXT, textVisible);
  const isTyping = textVisible && typed.length < INTRO_TEXT.length;
  const isSolved = frame >= SOLVE_FRAME;
  const isIdle = frame === 0;
  const stageOffsetX = settled ? STAGE_SETTLE_X : STAGE_INITIAL_X;
  const stageOffsetY = settled ? -50 : -300;

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-[#F2EDE0] overflow-hidden">
      <div
        className="relative max-w-6xl mx-auto px-6 sm:px-12 flex flex-col items-center justify-center gap-6 py-12 md:block md:py-0 md:gap-0"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        <div
          className="relative w-full max-w-md md:absolute md:top-1/2 md:left-12 md:max-w-xl md:-translate-y-1/2 break-keep"
          style={{
            opacity: textVisible ? 1 : 0,
            transition: "opacity 0.7s ease-out",
          }}
          aria-hidden={!textVisible}
        >
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-[#3A2A1F] mb-6">
            {NAME}
          </h1>
          <p
            className="text-lg sm:text-xl text-[#5A4A3F] whitespace-pre-line leading-relaxed mb-8 min-h-20"
            aria-label={INTRO_TEXT}
          >
            <span aria-hidden>{typed}</span>
            {isTyping && (
              <span className="hero-cursor inline-block w-0.5 h-[1em] bg-current ml-1 align-middle" />
            )}
          </p>
          <div className="flex gap-5 text-[#8B7355]">
            <a
              href="https://github.com/sanga-log"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-[#3A2A1F] transition-colors"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://linkedin.com/in/sanga-log"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#3A2A1F] transition-colors"
            >
              <FaLinkedinIn size={22} />
            </a>
            <a
              href="mailto:comt.mix@gmail.com"
              aria-label="Email"
              className="hover:text-[#3A2A1F] transition-colors"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>

        <div
          className="hero-stage"
          style={
            {
              "--stage-x": `${stageOffsetX}px`,
              "--stage-y": `${stageOffsetY}px`,
            } as React.CSSProperties
          }
          aria-hidden
        >
          <div
            className="relative"
            style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}
          >
            <div
              className="absolute"
              style={{
                left: 230,
                top: 240,
                width: BUG_DISPLAY_WIDTH,
                height: BUG_DISPLAY_HEIGHT,
              }}
            >
              {/* 살아있는 버그 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BUG_IMAGE}
                alt="Bug"
                width={BUG_DISPLAY_WIDTH}
                height={BUG_DISPLAY_HEIGHT}
                style={{
                  imageRendering: "pixelated",
                  opacity: isSolved ? 0 : 1,
                  transition: "opacity 0.4s ease-out",
                }}
                aria-hidden
              />

              {/* 처리 후 별 */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: isSolved ? 1 : 0,
                  transition: "opacity 0.4s ease-out 0.3s",
                }}
              >
                <div className="absolute" style={{ left: -66, top: -12 }}>
                  <PixelSparkle size={24} />
                </div>
                <div className="absolute" style={{ right: 46, bottom: -4 }}>
                  <PixelSparkle size={16} />
                </div>
              </div>
            </div>

            <div
              className={isIdle ? "hero-bob" : ""}
              role="img"
              aria-label="Thronglet"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: SPRITE_DISPLAY_SIZE,
                height: SPRITE_DISPLAY_SIZE,
                backgroundImage: `url(${SPRITE_URL})`,
                backgroundSize: SPRITE_BG_SIZE,
                backgroundPosition: getFrameBgPos(frame),
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
              }}
            />
          </div>
        </div>
      </div>

      <noscript>
        <div className="absolute bottom-16 left-12 max-w-md">
          <h1 className="text-5xl font-bold text-[#3A2A1F] mb-4">{NAME}</h1>
          <p className="text-lg text-[#5A4A3F] whitespace-pre-line">
            {INTRO_TEXT}
          </p>
        </div>
      </noscript>
    </section>
  );
}
