'use client';

import { usePathname } from 'next/navigation';
import VisitorCounter from './VisitorCounter';

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <footer
      className={`border-t border-gray-200 ${
        isHome ? 'bg-[#F2EDE0]' : 'bg-white'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-xs tracking-widest opacity-40">
          &copy; {new Date().getFullYear()} sanga-log
        </span>
        <VisitorCounter />
      </div>
    </footer>
  );
}
