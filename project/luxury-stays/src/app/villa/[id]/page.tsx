import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Villa } from '@/types';
import Header from '@/components/Header';
import BookingForm from '@/components/BookingForm';
import villasData from '@/data/villas.json';
import { ArrowLeft, MapPin, Users, Bed, Bath, Check } from 'lucide-react';

export default async function VillaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const villa = (villasData as Villa[]).find(v => v.id === parseInt(id));
  if (!villa) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> بازگشت
          </Link>

          <div className="relative h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-8">
            <img src={villa.image} alt={villa.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
              <div className="flex items-center gap-2 text-amber-400 mb-2"><MapPin className="w-5 h-5" />{villa.location}</div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">{villa.name}</h1>
              <div className="flex items-center gap-4 text-slate-300 text-sm">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {villa.maxGuests} مهمان</span>
                <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {villa.bedrooms} خواب</span>
                <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {villa.bathrooms} حمام</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-900 rounded-2xl p-6 lg:p-8 border border-amber-500/30">
                <h2 className="text-2xl font-bold text-slate-100 mb-4">درباره این اقامتگاه</h2>
                <p className="text-slate-400 leading-relaxed">{villa.description}</p>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 lg:p-8 border border-amber-500/30">
                <h2 className="text-2xl font-bold text-slate-100 mb-4">امکانات</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {villa.amenities.map(a => (
                    <div key={a} className="flex items-center gap-3 text-slate-300"><Check className="w-5 h-5 text-amber-400" />{a}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24"><BookingForm villa={villa} /></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
