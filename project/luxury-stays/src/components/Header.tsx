'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Crown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Crown className="w-7 h-7 text-amber-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Luxury Stays
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-300 hover:text-amber-400 transition-colors">خانه</Link>
            <Link href="#villas" className="text-slate-300 hover:text-amber-400 transition-colors">اقامتگاه‌ها</Link>
            <Link href="#" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-full transition-all">
              رزرو کنید
            </Link>
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-300">
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0'} overflow-hidden`}>
        <div className="px-4 py-4 space-y-3 bg-slate-900/95">
          <Link href="/" className="block text-slate-300 py-2">خانه</Link>
          <Link href="#villas" className="block text-slate-300 py-2">اقامتگاه‌ها</Link>
          <Link href="#" className="block text-center px-5 py-2.5 bg-amber-500 text-slate-900 rounded-full">رزرو کنید</Link>
        </div>
      </div>
    </header>
  );
}
