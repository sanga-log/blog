import VisitorCounter from './VisitorCounter';

export default function Footer() {
  return (
    <footer className="border-t border-black">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-xs tracking-widest opacity-40">
          &copy; {new Date().getFullYear()} sanga-log
        </span>
        <VisitorCounter />
      </div>
    </footer>
  );
}
