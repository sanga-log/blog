'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/blog', label: 'BLOG' },
  { href: '/resume', label: 'RESUME' },
  { href: '/portfolio', label: 'PORTFOLIO' },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header
      className={`sticky top-0 z-50 ${isHome ? 'bg-[#F2EDE0]' : 'bg-white'}`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-70 transition-opacity shrink-0"
        >
          <span className="leading-tight text-sm font-black tracking-tight">
            <span className="block">sanga-log</span>
          </span>
        </Link>

        {/* 네비게이션 - 모바일/데스크탑 공통 */}
        <nav className="flex items-center gap-5 md:gap-10">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === '/'
                ? pathname === '/'
                : pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`text-xs md:text-sm font-bold tracking-widest transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
