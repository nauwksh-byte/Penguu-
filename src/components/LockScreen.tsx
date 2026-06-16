import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Heart, Star, Cloud, Gift, Sparkles } from "lucide-react";
import Countdown from "./Countdown.tsx";

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [wiggle, setWiggle] = useState(false);

  // Play a soft bell chord when trying to click the gift
  const playKnockSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      // High-pitched magical sparkle chime sound (G5 -> C6)
      const notes = [783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0, now + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.12 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.55);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.6);
      });
    } catch (e) {
      // Audio autoplay standard handles
    }
  };

  const handleBoxClick = () => {
    playKnockSound();
    setWiggle(true);
    setTimeout(() => setWiggle(false), 600);
  };

  // Check if it's already June 22nd, 2026. If so, auto-unlock!
  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      // June is index 5
      if (now.getMonth() === 5 && now.getDate() === 22) {
        onUnlock();
      }
    };
    checkDate();
    const interval = setInterval(checkDate, 60000);
    return () => clearInterval(interval);
  }, [onUnlock]);

  return (
    <div className="fixed inset-0 z-50 bg-brand-cream overflow-y-auto flex flex-col items-center justify-center p-4 selection:bg-brand-blue-border selection:text-brand-blue-text">
      
      {/* Aesthetic Floating Decorative Accents */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-10 left-[10%] w-[350px] h-[350px] bg-gradient-to-tr from-brand-blue/30 via-brand-sage/20 to-transparent rounded-full filter blur-3xl opacity-80" />
        <div className="absolute -bottom-10 right-[15%] w-[350px] h-[350px] bg-gradient-to-tr from-brand-brown/40 via-[#FFDAC1]/20 to-transparent rounded-full filter blur-3xl opacity-80" />

        {/* Floating Clouds */}
        <motion.div
          animate={{ x: [-15, 15, -15], y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute top-24 left-[12%] text-brand-sage-text/15"
        >
          <Cloud className="w-16 h-16 fill-current" />
        </motion.div>

        <motion.div
          animate={{ x: [10, -10, 10], y: [4, -4, 4] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-28 right-[10%] text-brand-blue-text/15"
        >
          <Cloud className="w-20 h-20 fill-current" />
        </motion.div>

        {/* Glowing floating star badges */}
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-36 right-[22%] text-amber-300"
        >
          <Star className="w-6 h-6 fill-current" />
        </motion.div>
      </div>

      <div className="w-full max-w-lg bg-white/75 backdrop-blur-md rounded-3xl border border-brand-brown-border shadow-xl p-6 sm:p-10 relative z-10 flex flex-col items-center text-center font-sans">
        
         {/* Soft Ribbon Garland */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-blue-border via-brand-sage-border to-brand-brown-border rounded-t-3xl" />

        {/* Lock Icon Emblem */}
        <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-brand-brown border border-brand-brown-border rounded-full text-[10px] font-mono tracking-wider text-brand-brown-text uppercase">
          <Lock className="w-3 h-3" />
          <span>Locked Surprises Inside</span>
        </div>

        {/* Main Gated Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl font-black text-brand-brown-text tracking-tight mb-2">
          A Gift for Pengu 🎁
        </h2>
        
        <p className="text-xs sm:text-sm font-sans text-[#8C8273] leading-relaxed max-w-sm mb-6">
          Shh! Your sister has prepared a beautiful, magical birthday surprise here. It will automatically open on <span className="font-semibold text-brand-brown-text">June 22nd</span>!
        </p>

        {/* Wiggling Interactive Gift Box Illustration */}
        <motion.div
          id="mystery-gift-wrapper"
          onClick={handleBoxClick}
          animate={{
            rotate: wiggle ? [0, -12, 10, -8, 6, 0] : [0, 1, -1, 1, 0],
            scale: wiggle ? [1, 1.08, 0.98, 1.02, 1] : 1,
            y: [0, -2, 0, -2, 0]
          }}
          transition={{
            duration: wiggle ? 0.6 : 4,
            repeat: wiggle ? 0 : Infinity,
            ease: "easeInOut"
          }}
          className="cursor-pointer group relative my-6 select-none flex justify-center items-center"
        >
          {/* Sparkles around box */}
          <div className="absolute -top-3 -left-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: "3s" }} />
          </div>
          <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-5 h-5 text-red-300 fill-red-300 animate-pulse" />
          </div>

          {/* SVG Wrapped Pastel Parcel */}
          <svg viewBox="0 0 140 140" className="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-md">
            {/* Box Body */}
            <rect x="25" y="55" width="90" height="70" rx="8" fill="#F6EEE4" stroke="#8C8273" strokeWidth="2.5" />
            <rect x="20" y="45" width="100" height="20" rx="4" fill="#E8DAC8" stroke="#8C8273" strokeWidth="2.5" />
            
            {/* Inner highlights / Polka dots */}
            <circle cx="45" cy="75" r="4.5" fill="#E3D5C5" />
            <circle cx="95" cy="75" r="4.5" fill="#E3D5C5" />
            <circle cx="45" cy="105" r="4.5" fill="#E3D5C5" />
            <circle cx="95" cy="105" r="4.5" fill="#E3D5C5" />

            {/* Vertical Soft Ribbon */}
            <rect x="63" y="45" width="14" height="80" fill="#E8F0F8" stroke="#8C8273" strokeWidth="1.5" />
            <rect x="63" y="45" width="14" height="20" fill="#D3E4F4" stroke="#8C8273" strokeWidth="1.5" />

            {/* Cute Bow top */}
            <path d="M 70,45 C 55,25 35,42 63,45" fill="#E8F0F8" stroke="#8C8273" strokeWidth="2" />
            <path d="M 70,45 C 85,25 105,42 77,45" fill="#E8F0F8" stroke="#8C8273" strokeWidth="2" />
            
            {/* Small center heart on ribbon */}
            <path d="M 70,48 C 68,44 65,46 65,48 C 65,51 68,52 70,54 C 72,52 75,51 75,48 C 75,46 72,44 70,48 Z" fill="#FFB7B2" stroke="#8C8273" strokeWidth="0.8" />
          </svg>

          {/* Prompt banner under box */}
          <div className="absolute -bottom-5 px-3 py-1 bg-brand-cream border border-brand-brown-border/60 rounded-full text-[9px] font-mono tracking-wider text-brand-brown-text">
            MAKING A WISH 💖
          </div>
        </motion.div>

        {/* Countdown till June 22 */}
        <div className="w-full bg-[#FAF8F5]/80 border border-brand-brown-border/40 rounded-3xl py-4 my-4">
          <Countdown />
        </div>

      </div>

      {/* Made with love footer on gate */}
      <div className="mt-8 text-center text-xs font-mono text-[#8C8273]/80 select-none">
        <Heart className="inline w-3 h-3 text-[#FFB7B2] fill-current animate-pulse mr-1" />
        <span>Made with love for Pengu • Sister's Premium Gift Screen</span>
      </div>

    </div>
  );
}
