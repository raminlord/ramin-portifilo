import { Villa } from '@/types';
import Header from '@/components/Header';
import VillaCard from '@/components/VillaCard';
import villasData from '@/data/villas.json';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const villas = villasData as Villa[];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-slate-950" />
          <div className="relative max-w-7xl mx-auto text-center py-16 lg:py-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>تجربه اقامت لوکس با ما</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-slate-100">اقامت در </span>
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">لوکس‌ترین</span>
              <br />
              <span className="text-slate-100">اقامتگاه‌های جهان</span>
            </h1>
            <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto">
              از ویلای شیشه‌ای در مالدیو تا پنت‌هاوس طلایی دبی. اقامتی فراتر از رویاهایتان را تجربه کنید.
            </p>
          </div>
        </section>

        <section id="villas" className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-slate-100">اقامتگاه‌های </span>
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">ویژه</span>
            </h2>
            <p className="text-slate-400">منتخبی از بهترین اقامتگاه‌های لوکس برای شما</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villas.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        </section>

        <footer className="border-t border-slate-800 py-8">
          <div className="text-center text-slate-500 text-sm">
            © ۲۰۲۵ Luxury Stays. تمامی حقوق محفوظ است.
          </div>
        </footer>
      </main>
    </>
  );
}
