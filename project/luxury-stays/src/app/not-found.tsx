import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">۴۰۴</h1>
        <p className="text-2xl text-slate-300">اقامتگاه مورد نظر یافت نشد</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-full transition-all">
          <Home className="w-4 h-4" /> بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
