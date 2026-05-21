import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "프로젝트 의사결정·트레이드오프·회고를 ADR 포맷으로 기록.",
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
  openGraph: {
    title: "Portfolio",
    description: "프로젝트 의사결정·트레이드오프·회고를 ADR 포맷으로 기록.",
    url: `${SITE_URL}/portfolio`,
  },
};

interface Project {
  slug: string;
  name: string;
  company: string;
  period: string;
  summary: string;
  tags: string[];
  image?: string;
  video?: string;
}

const projects: Project[] = [
  {
    slug: "kaddie-web",
    name: "Kaddie Web — 글로벌 골프장 예약 B2C 웹 서비스",
    company: "김캐디",
    period: "2025.09 — 현재",
    summary:
      "해외 스크린골프·연습장 예약 웹. 회사 최초 해외 매출을 만든 서비스로, 태국·필리핀·미국 매장에서 운영 중.",
    tags: ["React", "TypeScript", "Stripe", "Docker", "AWS ECS"],
    video: "/videos/kaddie.mp4",
  },
  {
    slug: "ai-coach",
    name: "AI Coach — AI 기반 골프 스윙 분석 데스크톱 앱",
    company: "김캐디",
    period: "2025.07 — 현재",
    summary:
      "무인 스크린골프 매장에서 고객이 실시간으로 스윙을 분석·코칭받는 Electron 앱. 프로토타입을 이어받아 프론트엔드 1인으로 핵심 기능부터 운영까지 책임.",
    tags: ["Electron", "WebSocket", "Recoil", "i18next", "AWS"],
    video: "/videos/ai-coach.mp4",
  },
  {
    slug: "smartscore-web",
    name: "국내 공식 웹사이트 개편",
    company: "스마트스코어",
    period: "2025.02 — 2025.06",
    summary:
      "국내 1위 골프 O2O 플랫폼 국내 공식 웹사이트 전면 개편. LCP 6.6s→0.9s 성능 최적화, 도메인 이전 SEO 전략, Zod 기반 폼 검증 설계.",
    tags: ["Vue3", "TypeScript", "Vite", "Zod", "i18n"],
    video: "/videos/smartscore-web.mp4",
  },
  {
    slug: "mobile-ads",
    name: "모바일 네트워크 광고 시스템",
    company: "스마트스코어",
    period: "2024.12 — 2025.06",
    summary:
      "사내 최초로 모바일 네트워크 광고를 도입한 프로젝트. 4가지 광고 타입을 통합 처리하는 공통 Mixin을 설계 — 다른 앱에서 import 한 줄로 도입 가능.",
    tags: ["Vue2", "Webpack"],
    video: "/videos/mobile-ads.mp4",
  },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold border border-gray-300 text-gray-500 px-2 py-0.5">
      {children}
    </span>
  );
}

function ProjectMedia({
  image,
  video,
  alt,
}: {
  image?: string;
  video?: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-[4/3] bg-gray-50 border border-gray-200 overflow-hidden">
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-black tracking-widest uppercase text-gray-300">
            Image
          </span>
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* 헤딩 */}
      <section className="pt-16 pb-12">
        <h1 className="text-6xl font-black leading-none tracking-tighter">
          <span className="block">Portfolio</span>
        </h1>
      </section>

      {/* 구분선 */}
      <div className="border-t border-black" />

      {/* 프로젝트 리스트 */}
      <ul>
        {projects.map((project) => (
          <li key={project.slug} className="border-b border-black py-14">
            <div className="grid md:grid-cols-[5fr_6fr] gap-8 md:gap-12 items-start">
              {/* 미디어 */}
              <ProjectMedia
                image={project.image}
                video={project.video}
                alt={project.name}
              />

              {/* 텍스트 */}
              <div className="flex flex-col">
                <p className="text-sm font-bold text-gray-700 mb-3">
                  {project.company} · {project.period}
                </p>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight mb-3">
                  {project.name}
                </h2>
                <p className="text-sm leading-relaxed text-gray-600 mb-5">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-1.5 mt-6 text-xs font-black tracking-widest uppercase text-gray-400 hover:text-black transition-colors w-fit"
                >
                  <span>자세히 보기</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
