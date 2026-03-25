'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    return {
      days: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
      hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
      minutes: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
      seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const renderTimeBlock = (value: number, label: string) => (
    <div className="flex size-14 flex-col items-center justify-center rounded-lg bg-white md:size-16">
      <p className="font-poppins text-xl font-bold">
        {String(value).padStart(2, '0')}
      </p>
      <p className="text-[10px] sm:text-xs">{label}</p>
    </div>
  );

  return (
    <div className="my-4 flex gap-4">
      {renderTimeBlock(timeLeft.days, 'Days')}
      {renderTimeBlock(timeLeft.hours, 'Hours')}
      {renderTimeBlock(timeLeft.minutes, 'Minutes')}
      {renderTimeBlock(timeLeft.seconds, 'Seconds')}
    </div>
  );
}
