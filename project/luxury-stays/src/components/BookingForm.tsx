'use client';

import { useState } from 'react';
import { Villa } from '@/types';
import DatePicker from './DatePicker';
import { CheckCircle, User, Phone, CalendarDays } from 'lucide-react';
import { formatJalali } from '@/lib/jalali';

export default function BookingForm({ villa }: { villa: Villa }) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateNights = (): number => {
    if (!checkIn || !checkOut || checkOut.getTime() === new Date(0).getTime()) return 0;
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = nights * villa.pricePerNight;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || !guestName || !guestPhone) return;
    setIsSubmitting(true);
    
    const bookingData = {
      villaId: villa.id,
      villaName: villa.name,
      guestName,
      guestPhone,
      checkIn: formatJalali(checkIn),
      checkOut: formatJalali(checkOut),
      nights,
      totalPrice,
    };

    console.log('📤 ارسال به API:', bookingData);

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    if (res.ok) {
      console.log('✅ رزرو موفق');
      setIsSubmitting(false);
      setIsBooked(true);
    }
  };

  if (isBooked) {
    return (
      <div className="bg-slate-900 rounded-2xl p-8 border border-amber-500/30 text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">رزرو با موفقیت انجام شد!</h3>
        <p className="text-slate-400">{guestName} عزیز، اقامت شما در {villa.name} ثبت شد.</p>
        <div className="bg-slate-800 rounded-lg p-4 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-slate-400">تعداد شب‌ها:</span><span className="text-slate-200">{nights} شب</span></div>
          <div className="flex justify-between border-t border-slate-700 pt-2"><span className="text-amber-400 font-semibold">مبلغ کل:</span><span className="text-amber-400 font-bold">{totalPrice.toLocaleString()} تومان</span></div>
        </div>
        <button onClick={() => { setCheckIn(null); setCheckOut(null); setGuestName(''); setGuestPhone(''); setIsBooked(false); }} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-all">رزرو جدید</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleBooking} className="bg-slate-900 rounded-2xl p-6 lg:p-8 border border-amber-500/30 space-y-6">
      <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-amber-400" />فرم رزرو</h3>
      <DatePicker checkIn={checkIn} checkOut={checkOut} onCheckInChange={setCheckIn} onCheckOutChange={setCheckOut} />
      {nights > 0 && (
        <div className="bg-slate-800 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-slate-400">{villa.pricePerNight.toLocaleString()} × {nights} شب</span><span className="text-slate-300">{totalPrice.toLocaleString()} تومان</span></div>
          <div className="flex justify-between font-bold text-lg border-t border-slate-700 pt-2"><span className="text-slate-200">مبلغ قابل پرداخت</span><span className="text-amber-400">{totalPrice.toLocaleString()} تومان</span></div>
        </div>
      )}
      <div className="space-y-4">
        <div className="relative"><User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" /><input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="نام و نام خانوادگی" required className="w-full pl-4 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500" /></div>
        <div className="relative"><Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" /><input type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder="شماره تماس" required dir="ltr" className="w-full pl-4 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500" /></div>
      </div>
      <button type="submit" disabled={isSubmitting || nights === 0} className={`w-full py-4 rounded-full font-bold text-lg transition-all ${isSubmitting || nights === 0 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400 text-slate-900 hover:shadow-lg hover:shadow-amber-500/25'}`}>
        {isSubmitting ? 'در حال پردازش...' : 'تأیید و پرداخت'}
      </button>
    </form>
  );
}
