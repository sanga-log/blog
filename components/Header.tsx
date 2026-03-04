'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/blog', label: 'BLOG' },
  { href: '/resume', label: 'RESUME' },
  { href: '/contact', label: 'CONTACT' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-black sticky top-0 bg-white z-50">
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
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`text-xs md:text-sm font-bold tracking-widest transition-opacity ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'
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
