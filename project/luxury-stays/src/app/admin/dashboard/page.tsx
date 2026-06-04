'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, LogOut, CheckCircle, XCircle, Clock, CalendarDays, Users } from 'lucide-react';

interface BookingRecord {
  id: string;
  villaId: number;
  villaName: string;
  guestName: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  bookingDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function Dashboard() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchBookings = async () => {
    const res = await fetch('/api/bookings');
    const data = await res.json();
    setBookings(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (!loggedIn) {
      router.push('/admin');
      return;
    }
    fetchBookings();
  }, [router]);

  const updateBookingStatus = async (id: string, status: 'approved' | 'rejected') => {
    await fetch('/api/bookings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchBookings();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin');
  };

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const approvedCount = bookings.filter(b => b.status === 'approved').length;
  const totalRevenue = bookings.filter(b => b.status === 'approved').reduce((sum, b) => sum + b.totalPrice, 0);

  if (isLoading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><p className="text-amber-400">در حال بارگذاری...</p></div>;
  }

  return (
    <div className="min-h-screen bg-slate-950" dir="rtl">
      <header className="bg-slate-900 border-b border-amber-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-amber-400" />
            <h1 className="text-xl font-bold text-slate-100">پنل مدیریت</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all">
            <LogOut className="w-4 h-4" /> خروج
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 rounded-xl p-6 border border-amber-500/30">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-8 h-8 text-yellow-400" />
              <span className="text-slate-400">در انتظار تأیید</span>
            </div>
            <p className="text-3xl font-bold text-slate-100">{pendingCount}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-slate-400">تأیید شده</span>
            </div>
            <p className="text-3xl font-bold text-slate-100">{approvedCount}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-6 border border-amber-500/30">
            <div className="flex items-center gap-3 mb-2">
              <CalendarDays className="w-8 h-8 text-amber-400" />
              <span className="text-slate-400">درآمد کل</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">{totalRevenue.toLocaleString()} تومان</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-amber-500/30 overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-bold text-slate-100">لیست رزروها</h2>
            <p className="text-xs text-slate-500 mt-1">داده‌ها از فایل bookings.json خوانده می‌شوند</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr className="text-slate-400 text-sm">
                  <th className="p-4 text-right">مهمان</th>
                  <th className="p-4 text-right">اقامتگاه</th>
                  <th className="p-4 text-right">تاریخ ورود</th>
                  <th className="p-4 text-right">تاریخ خروج</th>
                  <th className="p-4 text-right">شب‌ها</th>
                  <th className="p-4 text-right">مبلغ</th>
                  <th className="p-4 text-right">تاریخ ثبت</th>
                  <th className="p-4 text-right">وضعیت</th>
                  <th className="p-4 text-right">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-500">هیچ رزروی ثبت نشده است.</td>
                  </tr>
                ) : (
                  bookings.map(booking => (
                    <tr key={booking.id} className="border-t border-slate-800 text-slate-300">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-500" />
                          <div>
                            <p className="font-semibold">{booking.guestName}</p>
                            <p className="text-xs text-slate-500">{booking.guestPhone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{booking.villaName}</td>
                      <td className="p-4">{booking.checkIn}</td>
                      <td className="p-4">{booking.checkOut}</td>
                      <td className="p-4">{booking.nights}</td>
                      <td className="p-4 text-amber-400">{booking.totalPrice.toLocaleString()} تومان</td>
                      <td className="p-4 text-xs text-slate-400">{booking.bookingDate}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                          booking.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {booking.status === 'approved' ? 'تأیید شده' : booking.status === 'rejected' ? 'رد شده' : 'در انتظار'}
                        </span>
                      </td>
                      <td className="p-4">
                        {booking.status === 'pending' && (
                          <div className="flex gap-2">
                            <button onClick={() => updateBookingStatus(booking.id, 'approved')} className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button onClick={() => updateBookingStatus(booking.id, 'rejected')} className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
