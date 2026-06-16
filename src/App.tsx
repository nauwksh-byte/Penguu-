import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Heart, Star, Cloud, Gift, ChevronDown, Award } from "lucide-react";

import BackgroundMusic from "./components/BackgroundMusic.tsx";
import Countdown from "./components/Countdown.tsx";
import ReasonsGrid from "./components/ReasonsGrid.tsx";
import CatsDogsCorner from "./components/CatsDogsCorner.tsx";
import InteractiveSurprises from "./components/InteractiveSurprises.tsx";
import BirthdayCake from "./components/BirthdayCake.tsx";
import LockScreen from "./components/LockScreen.tsx";

// Import generated elegant illustration assets
import companionsImg from "./assets/images/happy_birthday_companions_1781617820862.jpg";
import sleepyBuddiesImg from "./assets/images/sleepy_cozy_buddies_1781617836674.jpg";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // If not unlocked yet via countdown or sister's key, render the high-end lock screen
  if (!isUnlocked) {
    return <LockScreen onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-brand-cream text-[#4A4238] font-sans relative overflow-x-hidden pb-16 selection:bg-brand-blue-border selection:text-brand-blue-text">
      
      {/* Global Interactive Elements (Hearts on click, paws on scroll) */}
      <InteractiveSurprises />

      {/* Floating Sparkly Audio/Music Toggle */}
      <BackgroundMusic />

      {/* Dreamy Header Float Elements */}
      <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none select-none overflow-hidden">
        {/* Soft magical gradient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-[#E8F0F8]/50 via-[#E8EDE4]/40 to-transparent rounded-full filter blur-3xl" />
        
        {/* Cute Clouds and Stars drifting around the header */}
        <motion.div
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-12 left-10 md:left-24 text-brand-sage-text/20 flex items-center gap-1.5"
        >
          <Cloud className="w-12 h-12 fill-current" />
          <Star className="w-4 h-4 fill-amber-300 stroke-amber-400 animate-pulse" />
        </motion.div>

        <motion.div
          animate={{ x: [10, -15, 10], y: [5, -12, 5] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
          className="absolute top-28 right-8 md:right-32 text-brand-blue-text/20 flex items-center gap-2"
        >
          <Star className="w-5 h-5 fill-amber-300 stroke-amber-400 animate-pulse" />
          <Cloud className="w-16 h-16 fill-current" />
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute top-44 left-1/3 text-brand-brown-text/10"
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>
      </div>

      {/* Hero Section */}
      <header className="relative w-full text-center px-4 pt-16 pb-12 sm:pt-20 sm:pb-16 flex flex-col items-center">
        
        {/* Cute Sparkle Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-brown border border-brand-brown-border rounded-full text-xs font-semibold uppercase tracking-wider text-brand-brown-text shadow-sm"
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none animate-spin" style={{ animationDuration: "3s" }} />
          <span>June 22 • Made with Love by Sister</span>
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none animate-spin" style={{ animationDuration: "3s" }} />
        </motion.div>

        {/* Big Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-brand-brown-text tracking-tight mb-4 drop-shadow-sm"
        >
          Happy Birthday, <span className="text-brand-blue-text relative inline-block">Pengu!<span className="absolute left-0 bottom-1 w-full h-2 bg-brand-blue-border -z-10 rounded-full" /></span> 🎂
        </motion.h1>

        {/* Heartfelt Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-fun text-base sm:text-xl text-[#8C8273] font-medium max-w-xl leading-relaxed mb-8 px-4"
        >
          To the most supportive, caring, loving, protective, and wonderful brother in the universe. 💫
        </motion.p>

        {/* Elegant Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full"
        >
          <Countdown />
        </motion.div>

        {/* Decorative Down Arrow */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="mt-12 text-[#967C65] opacity-50"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </header>


      {/* Section 1: Heartfelt Letter from Sister */}
      <section className="relative w-full max-w-5xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Polaroids Side: Hand-rendered style of the first generated image */}
        <motion.div
          initial={{ opacity: 0, rotate: -6, x: -30 }}
          whileInView={{ opacity: 1, rotate: -3, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-sm shrink-0 flex flex-col"
        >
          <div className="bg-[#FAF8F5] border-2 border-brand-brown-border p-4 rounded-xl shadow-md rotate-[-2deg] relative group transition-transform hover:rotate-0 hover:scale-[1.02]">
            {/* Cute mini tape graphic */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#EBE0D0]/80 border-dashed border-b border-[#DCD3C5] -rotate-2" />
            
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-brand-cream border border-brand-brown-border/30">
              <img
                src={companionsImg}
                alt="Cozy animal companions celebrating"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="pt-4 text-center">
              <span className="font-serif text-sm italic font-medium text-brand-brown-text">
                "Mimi & Pippin sending birthday cuddles! 🐾"
              </span>
            </div>
          </div>
        </motion.div>

        {/* Letter Card Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex-grow"
        >
          <div className="bg-gradient-to-b from-[#FDFBF7] to-[#FAF8F5] border border-brand-brown-border rounded-3xl p-6 sm:p-10 shadow-sm relative">
            <span className="absolute -top-3.5 left-8 px-4 py-1 bg-white border border-brand-brown-border rounded-full text-[10px] font-mono tracking-wider text-brand-brown-text uppercase">
              Message from Sister 💌
            </span>
            
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#E8DAC8_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-25 pointer-events-none rounded-3xl" />

            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-bold text-brand-brown-text mb-6">
                My dearest brother, Pengu...
              </h3>
              
              <p className="font-sans text-sm sm:text-base text-[#5C5245] leading-relaxed mb-6 italic">
                "Pengu, thank you for always being there for me. Thank you for your endless support, care, patience, and love. You make difficult days easier, happy days brighter, and life more beautiful just by being yourself."
              </p>
              
              <p className="font-sans text-sm sm:text-base text-[#5C5245] leading-relaxed mb-6">
                I am so lucky to have a brother like you. Since childhood, you've been my guide, my protector, and my constant anchor. No matter the storms, you face them with a warm smile and shield everyone around you. Having you as a brother is one of life's most precious miracles.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-brand-brown-border/50">
                <div className="flex items-center gap-1 text-xs font-mono text-[#8C8273]">
                  <span>With infinite gratitude</span>
                  <Heart className="w-3 h-3 text-[#FFB7B2] fill-current" />
                </div>
                <span className="font-fun font-bold text-brand-brown-text text-md tracking-wider">
                  Always & Forever, Your Sister 🌸
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>


      {/* Section 2: Reasons Why You're Amazing */}
      <section className="bg-[#FAF8F5] border-y border-brand-brown-border/30 py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_60%,rgba(232,240,248,0.3))]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center gap-1 mb-3">
            <Award className="w-5 h-5 text-[#A68F7B]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C8273]">An endless list of qualities</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-brand-brown-text tracking-tight mb-4">
            Reasons Why You're Amazing 🧸
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8273] font-sans max-w-md mx-auto leading-relaxed mb-8">
            Every day with you is a gift, but here are just a few simple reasons why you hold such a special place in everyone's heart.
          </p>

          <ReasonsGrid />
        </div>
      </section>


      {/* Section 3: Cute Kitten & Puppy playground Corner */}
      <section className="py-16 relative">
        <CatsDogsCorner />
      </section>


      {/* Section 4: Interactive Birthday Cake Confetti Section */}
      <section className="relative bg-[#FAF8F5] border-y border-brand-brown-border/30 py-16">
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[radial-gradient(circle_at_bottom,rgba(230,236,227,0.35),transparent_75%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-sage border border-brand-sage-border rounded-full text-xs font-mono text-brand-sage-text uppercase mb-4">
            <Gift className="w-3.5 h-3.5 animate-bounce" />
            <span>Interactive Birthday Sparkles</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-brown-text tracking-tight mb-3">
            Blow Out Your Candles, Pengu! 🕯️
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8273] font-sans max-w-md mb-8 leading-relaxed">
            Close your eyes, make a silent wish, and click on the beautiful cake. Let's start the festive celebration! 🎈
          </p>

          <BirthdayCake />
        </div>
      </section>


      {/* Section 5: Heartfelt Wishes & Letter Box */}
      <section className="relative w-full max-w-5xl mx-auto px-4 py-16 flex flex-col lg:flex-row-reverse items-center gap-12">
        
        {/* Sleeping Pets Polaroid Frame (Second image) */}
        <motion.div
          initial={{ opacity: 0, rotate: 6, x: 30 }}
          whileInView={{ opacity: 1, rotate: 3, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-sm shrink-0 flex flex-col"
        >
          <div className="bg-[#FAF8F5] border-2 border-brand-brown-border p-4 rounded-xl shadow-md rotate-[2deg] relative group transition-transform hover:rotate-0 hover:scale-[1.02]">
            {/* Cute mini tape graphic */}
            <div className="absolute -top-3 left-1/3 w-16 h-6 bg-[#EBE0D0]/80 border-dashed border-b border-[#DCD3C5] rotate-[-5deg]" />
            
            <div className="aspect-square rounded-lg overflow-hidden bg-brand-cream border border-brand-brown-border/30">
              <img
                src={sleepyBuddiesImg}
                alt="Cozy puppy and kitten sleeping under warm blanket"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="pt-4 text-center">
              <span className="font-serif text-sm italic font-medium text-brand-brown-text">
                "Sweet dreams, peaceful years ahead... ✨"
              </span>
            </div>
          </div>
        </motion.div>

        {/* Wishes Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex-grow"
        >
          <div className="bg-gradient-to-b from-brand-sage/40 to-white border border-brand-sage-border rounded-3xl p-6 sm:p-10 shadow-sm relative">
            <span className="absolute -top-3.5 left-8 px-4 py-1 bg-white border border-brand-sage-border rounded-full text-[10px] font-mono tracking-wider text-brand-sage-text uppercase">
              Blessings & Hopes 🌟
            </span>

            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-bold text-brand-sage-text mb-6">
                To Many More Golden Years...
              </h3>
              
              <p className="font-sans text-sm sm:text-base text-[#5C5245] leading-relaxed mb-6 italic font-medium">
                "May this year bring you endless happiness, good health, success, peace, and all the beautiful things you deserve. Keep smiling, keep shining, and never forget how loved and appreciated you are."
              </p>

              <p className="font-sans text-sm sm:text-base text-[#5C5245] leading-relaxed mb-6">
                Whenever things feel overwhelming, remember that you have a sister holding you in prayers daily. I wish that every door of opportunity swings wide open for you, and that peace and wisdom guard your heart always.
              </p>

              <h4 className="font-serif text-lg font-bold text-brand-brown-text mb-2">
                Happy Birthday, Pengu! ❤️
              </h4>
            </div>
          </div>
        </motion.div>
      </section>


      {/* Magical Ending Footer */}
      <footer className="w-full text-center py-12 px-4 border-t border-brand-brown-border/30 mt-8 relative select-none">
        
        {/* Cloud floating background decoration */}
        <div className="absolute left-[10%] bottom-16 text-brand-blue-text/10 pointer-events-none">
          <Cloud className="w-14 h-14 fill-current" />
        </div>
        <div className="absolute right-[10%] bottom-20 text-brand-sage-text/10 pointer-events-none">
          <Cloud className="w-12 h-12 fill-current" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1 text-brand-brown-text/90">
            <Heart className="w-4 h-4 text-[#FFB7B2] fill-current animate-pulse" />
            <span className="font-fun font-bold text-lg tracking-wide">
              Made with love for Pengu 💖
            </span>
            <Heart className="w-4 h-4 text-[#FFB7B2] fill-current animate-pulse" />
          </div>
          
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8C8273]/80">
            Wishing you the brightest June 22 • Happy Birthday Big Brother!
          </p>
        </div>
      </footer>

    </div>
  );
}
