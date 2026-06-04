import Link from 'next/link';
import { Star, MapPin, Users } from 'lucide-react';
import { Villa } from '@/types';

export default function VillaCard({ villa }: { villa: Villa }) {
  return (
    <div className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-amber-500/30 hover:border-amber-400/60 transition-all duration-500 hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img src={villa.image} alt={villa.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="absolute top-4 right-4 bg-amber-500/90 text-slate-900 font-bold px-4 py-2 rounded-full text-sm">
          {villa.pricePerNight.toLocaleString()} تومان / شب
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-slate-100">{villa.name}</h3>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm">5.0</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{villa.location}</span>
        </div>
        <p className="text-slate-400 text-sm line-clamp-2">{villa.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <Users className="w-4 h-4" />
            <span>تا {villa.maxGuests} مهمان</span>
          </div>
          <Link href={`/villa/${villa.id}`} className="px-4 py-2 border border-amber-500 text-amber-400 rounded-full text-sm hover:bg-amber-500 hover:text-slate-900 transition-all">
            مشاهده جزئیات
          </Link>
        </div>
      </div>
    </div>
  );
}
