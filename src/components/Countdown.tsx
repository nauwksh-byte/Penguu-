import React, { useState, useEffect } from "react";
import { Clock, Calendar, Gift, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Target is June 22nd
      let targetDate = new Date(`June 22, ${currentYear} 00:00:00`);
      
      // If today is past June 22nd, check if we target next year,
      // but since current date is June 16, 2026, it is indeed June 22, 2026.
      if (now.getTime() > targetDate.getTime() + 24 * 60 * 60 * 1000) {
        targetDate = new Date(`June 22, ${currentYear + 1} 00:00:00`);
      }

      const difference = targetDate.getTime() - now.getTime();

      // If within 22nd June (the whole day)
      const isTodayJune22 = now.getMonth() === 5 && now.getDate() === 22;

      if (isTodayJune22 || difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isBirthday: false });
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const timeBlocks = [
    { label: "days", value: timeLeft.days, color: "bg-brand-sage border-brand-sage-border text-brand-sage-text" },
    { label: "hours", value: timeLeft.hours, color: "bg-brand-blue border-brand-blue-border text-brand-blue-text" },
    { label: "mins", value: timeLeft.minutes, color: "bg-brand-brown border-brand-brown-border text-brand-brown-text" },
    { label: "secs", value: timeLeft.seconds, color: "bg-brand-cream-dark border-brand-brown-border/40 text-brand-brown-text/90" },
  ];

  return (
    <div id="birthday-countdown-container" className="flex flex-col items-center w-full max-w-xl mx-auto py-6 px-4">
      <AnimatePresence mode="wait">
        {timeLeft.isBirthday ? (
          <motion.div
            key="is-birthday-banner"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full text-center p-6 bg-brand-brown border border-brand-brown-border rounded-3xl shadow-sm flex flex-col items-center gap-3"
          >
            <div className="relative">
              <Gift className="w-12 h-12 text-brand-brown-text animate-bounce" />
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-brand-brown-text tracking-tight">
              ✨ It's Finally Pengu's Birthday! ✨
            </h3>
            <p className="text-sm text-brand-brown-text/80 max-w-xs leading-relaxed">
              Happy June 22nd! Today is all about honoring the dearest, most amazing brother in the world. Let's celebrate! 🎂💝
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="countdown-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full"
          >
            <div className="flex items-center gap-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-[#8C8273]">
              <Clock className="w-3.5 h-3.5" />
              <span>Counting down to June 22</span>
            </div>
            
            <div className="grid grid-cols-4 gap-3 w-full max-w-md">
              {timeBlocks.map((block) => (
                <div
                  key={block.label}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border aspect-square shadow-sm transition-all ${block.color}`}
                >
                  <div className="font-mono text-2xl sm:text-3xl font-semibold tracking-tighter">
                    {String(block.value).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider opacity-85 mt-1">
                    {block.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs text-brand-brown-text/70 italic font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>A very special day is on its way... ✨</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
