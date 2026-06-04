'use client';

import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { toJalali, jalaliMonths, formatJalali } from '@/lib/jalali';

interface DatePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onCheckInChange: (date: Date) => void;
  onCheckOutChange: (date: Date) => void;
}

export default function DatePicker({ checkIn, checkOut, onCheckInChange, onCheckOutChange }: DatePickerProps) {
  const today = new Date();
  const todayJalali = toJalali(today);
  const [currentJMonth, setCurrentJMonth] = useState(todayJalali.month);
  const [currentJYear, setCurrentJYear] = useState(todayJalali.year);
  const [selecting, setSelecting] = useState<'checkIn' | 'checkOut'>('checkIn');

  // تعداد روزهای ماه شمسی جاری
  const daysInMonth = currentJMonth <= 6 ? 31 : currentJMonth <= 11 ? 30 : 29;

  // تبدیل تاریخ شمسی به میلادی
  const jalaliToGregorian = (jy: number, jm: number, jd: number): Date => {
    const base = new Date(2026, 2, 21); // ۱ فروردین ۱۴۰۵ = ۲۱ مارس ۲۰۲۶
    const diffYears = jy - 1405;
    const daysFromYear = diffYears * 365;
    const daysFromMonth = jm <= 6 ? (jm - 1) * 31 : 186 + (jm - 7) * 30;
    const totalDays = daysFromYear + daysFromMonth + (jd - 1);
    const result = new Date(base);
    result.setDate(result.getDate() + totalDays);
    return result;
  };

  const handleDateClick = (day: number) => {
    const selectedDate = jalaliToGregorian(currentJYear, currentJMonth, day);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    if (selectedDate < todayStart) return;

    if (selecting === 'checkIn') {
      onCheckInChange(selectedDate);
      if (checkOut && selectedDate >= checkOut) onCheckOutChange(new Date(0));
      setSelecting('checkOut');
    } else {
      if (checkIn && selectedDate > checkIn) {
        onCheckOutChange(selectedDate);
        setSelecting('checkIn');
      }
    }
  };

  const isSelected = (day: number) => {
    const date = jalaliToGregorian(currentJYear, currentJMonth, day);
    return (checkIn && date.getTime() === checkIn.getTime()) || (checkOut && date.getTime() === checkOut.getTime());
  };

  const isInRange = (day: number) => {
    const date = jalaliToGregorian(currentJYear, currentJMonth, day);
    return checkIn && checkOut && date > checkIn && date < checkOut;
  };

  const isDisabled = (day: number) => {
    const date = jalaliToGregorian(currentJYear, currentJMonth, day);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return date < todayStart;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-amber-400">
        <Calendar className="w-5 h-5" />
        <span className="font-semibold">انتخاب تاریخ اقامت</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-400">تاریخ ورود</label>
          <div className={`p-3 rounded-lg border text-sm ${selecting === 'checkIn' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-slate-700 bg-slate-800 text-slate-300'}`}>
            {formatJalali(checkIn)}
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-400">تاریخ خروج</label>
          <div className={`p-3 rounded-lg border text-sm ${selecting === 'checkOut' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-slate-700 bg-slate-800 text-slate-300'}`}>
            {formatJalali(checkOut)}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => { if (currentJMonth === 1) { setCurrentJMonth(12); setCurrentJYear(currentJYear - 1); } else setCurrentJMonth(currentJMonth - 1); }} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400">
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="text-slate-200 font-semibold">{jalaliMonths[currentJMonth - 1]} {currentJYear}</span>
          <button onClick={() => { if (currentJMonth === 12) { setCurrentJMonth(1); setCurrentJYear(currentJYear + 1); } else setCurrentJMonth(currentJMonth + 1); }} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map(d => <div key={d} className="text-center text-xs text-slate-500 py-1">{d}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={isDisabled(day)}
              className={`aspect-square rounded-lg text-sm font-medium transition-all
                ${isDisabled(day) ? 'text-slate-600 cursor-not-allowed' : 'hover:bg-amber-500/20 cursor-pointer'}
                ${isSelected(day) ? 'bg-amber-500 text-slate-900' : ''}
                ${isInRange(day) ? 'bg-amber-500/10 text-amber-400' : ''}
                ${!isDisabled(day) && !isSelected(day) && !isInRange(day) ? 'text-slate-300' : ''}
              `}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500 text-center">
        {selecting === 'checkIn' ? 'لطفاً تاریخ ورود را انتخاب کنید' : 'لطفاً تاریخ خروج را انتخاب کنید'}
      </p>
    </div>
  );
}
