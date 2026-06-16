import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, MessageCircleHeart } from "lucide-react";

export default function CatsDogsCorner() {
  const [activeBubble, setActiveBubble] = useState<string | null>(null);
  const [bubblePet, setBubblePet] = useState<"cat" | "dog" | null>(null);

  // Audio synthesis for pet sounds (cat meow and puppy bark) to keep it 100% self-contained
  const playPetSound = (type: "cat" | "dog") => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      if (type === "cat") {
        // Synthesizing a cute soft meow
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "sine";
        const now = ctx.currentTime;
        
        // Pitch sweep upwards (meee-ooow)
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(950, now + 0.4);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        
        osc.start(now);
        osc.stop(now + 0.45);
      } else {
        // Synthesizing a friendly soft bark (two quick woofs)
        const playWoof = (delay: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.type = "triangle";
          const now = ctx.currentTime + delay;
          
          // Low warm pitch sweep down
          osc.frequency.setValueAtTime(250, now);
          osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);
          
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.18, now + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          
          osc.start(now);
          osc.stop(now + 0.15);
        };
        
        playWoof(0);
        playWoof(0.18);
      }
    } catch (e) {
      console.log("Audio not supported yet, user must interact first.");
    }
  };

  const bubbleMessages = {
    cat: [
      "You're pawsome, Pengu!",
      "Sending cozy birthday cuddles! 🐾",
      "Purr-fect brother in the whole universe! 🐱",
      "Meow! Hope your day is filled with treats! 🍣",
    ],
    dog: [
      "Best brother ever! Ruff! 🐶",
      "Have the happiest birthday, Pengu! 🎂",
      "Wagging my tail with joy for you! 🌟",
      "Sending you infinite puppy kisses! 🐾",
    ]
  };

  const triggerPet = (pet: "cat" | "dog") => {
    playPetSound(pet);
    setBubblePet(pet);
    const messages = bubbleMessages[pet];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setActiveBubble(randomMsg);
  };

  return (
    <div id="cats-dogs-playground-corner" className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
      
      {/* Decorative Paw Prints Header */}
      <div className="flex items-center gap-1.5 justify-center mb-8">
        <span className="text-[#A68F7B] animate-pulse">🐾</span>
        <h3 className="font-serif text-2xl md:text-3xl font-semibold text-center text-[#8C8273]">
          Cute Kitten & Puppy Corner
        </h3>
        <span className="text-[#A68F7B] animate-pulse delay-150">🐾</span>
      </div>

      <div className="w-full bg-[#FAF8F5] border border-brand-brown-border/50 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden flex flex-col items-center">
        
        {/* Soft Background Rays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,240,248,0.4),transparent_70%)] pointer-events-none" />

        {/* Dynamic Bubble Box */}
        <div className="h-20 w-full max-w-md flex items-center justify-center mb-8 relative z-10">
          <AnimatePresence mode="wait">
            {activeBubble ? (
              <motion.div
                key={activeBubble}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                className={`relative px-5 py-3 rounded-2xl shadow-sm md:text-md font-medium border text-center ${
                  bubblePet === "cat"
                    ? "bg-brand-blue border-brand-blue-border text-brand-blue-text"
                    : "bg-brand-sage border-brand-sage-border text-brand-sage-text"
                }`}
              >
                <span>{activeBubble}</span>
                
                {/* Speech Bubble Arrow */}
                <div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b ${
                    bubblePet === "cat"
                      ? "bg-[#E8F0F8] border-brand-blue-border"
                      : "bg-[#E8EDE4] border-brand-sage-border"
                  }`}
                />
              </motion.div>
            ) : (
              <motion.div
                key="idle-bubble"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#8C8273]/70"
              >
                <MessageCircleHeart className="w-4 h-4 text-[#A68F7B] animate-bounce" />
                <span>Tap on us for birthday barks & meows!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cats & Dogs Illustration Container */}
        <div className="flex flex-row gap-12 sm:gap-20 items-end justify-center w-full z-10 select-none">
          
          {/* Kitten Component (Left) */}
          <motion.div
            id="interactive-cat-companion"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => triggerPet("cat")}
            className="flex flex-col items-center cursor-pointer group"
          >
            {/* Adorable Handdrawn SVG Kitty */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                {/* Kitten Ears */}
                <path d="M 20,40 L 15,10 C 15,10 32,22 35,28 Z" fill="#E8DAC8" stroke="#967C65" strokeWidth="2.5" />
                <path d="M 23,37 L 18,15 L 31,27 Z" fill="#F8DFE3" />
                
                <path d="M 80,40 L 85,10 C 85,10 68,22 65,28 Z" fill="#E8DAC8" stroke="#967C65" strokeWidth="2.5" />
                <path d="M 77,37 L 82,15 L 69,27 Z" fill="#F8DFE3" />

                {/* Kitten Tail */}
                <motion.path
                  d="M 80,85 C 85,85 92,75 90,60 C 88,48 83,52 82,60"
                  fill="none"
                  stroke="#E8DAC8"
                  strokeWidth="8"
                  strokeLinecap="round"
                  animate={{ rotate: [0, 10, -5, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="origin-bottom-left"
                />

                {/* Kitten Body */}
                <ellipse cx="50" cy="75" rx="30" ry="22" fill="#EBE0D0" stroke="#967C65" strokeWidth="2.5" />
                <ellipse cx="50" cy="74" rx="28" ry="19" fill="#F4EDE4" />

                {/* Kitten Head */}
                <ellipse cx="50" cy="45" rx="30" ry="25" fill="#E8DAC8" stroke="#967C65" strokeWidth="2.5" />
                <ellipse cx="50" cy="44" rx="28" ry="23" fill="#F5EDE3" />
                {/* Kitten Cheeks */}
                <ellipse cx="32" cy="51" rx="5" ry="3" fill="#F8DFE3" />
                <ellipse cx="68" cy="51" rx="5" ry="3" fill="#F8DFE3" />

                {/* Eyes (Blinking) */}
                <motion.g
                  animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                  transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 1 }}
                  className="origin-center"
                >
                  <circle cx="38" cy="45" r="3.5" fill="#5C5245" />
                  <circle cx="37" cy="43.5" r="1" fill="#FFFFFF" />
                  <circle cx="62" cy="45" r="3.5" fill="#5C5245" />
                  <circle cx="61" cy="43.5" r="1" fill="#FFFFFF" />
                </motion.g>

                {/* Kitten Nose & Smile */}
                <polygon points="48,50 52,50 50,52" fill="#967C65" />
                <path d="M 46,55 C 48,56 50,55 50,53 C 50,55 52,56 54,55" fill="none" stroke="#967C65" strokeWidth="2" strokeLinecap="round" />

                {/* Kitten Whiskers */}
                <line x1="22" y1="48" x2="10" y2="47" stroke="#967C65" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="22" y1="52" x2="12" y2="53" stroke="#967C65" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="78" y1="48" x2="90" y2="47" stroke="#967C65" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="78" y1="52" x2="88" y2="53" stroke="#967C65" strokeWidth="1.5" strokeLinecap="round" />

                {/* Little Bell collar */}
                <rect x="42" y="66" width="16" height="4" rx="2" fill="#F8DFE3" stroke="#967C65" strokeWidth="1" />
                <circle cx="50" cy="71" r="3.5" fill="#FAD154" stroke="#967C65" strokeWidth="1" />
              </svg>

              {/* Sparkle Float on Hover */}
              <div className="absolute -top-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: "3s" }} />
              </div>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#8C8273] mt-3 group-hover:text-[#967C65] transition-colors">
              Mimi the Cat 🐱
            </span>
            <span className="text-[10px] font-mono text-[#8C8273]/60">Meow!</span>
          </motion.div>

          {/* Puppy Component (Right) */}
          <motion.div
            id="interactive-dog-companion"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => triggerPet("dog")}
            className="flex flex-col items-center cursor-pointer group"
          >
            {/* Adorable Handdrawn SVG Puppy */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                
                {/* Puppy Floppy Ears */}
                <motion.path
                  d="M 12,28 C 8,28 6,48 10,55 C 13,60 16,55 16,40 Z"
                  fill="#8C705C"
                  stroke="#5C483A"
                  strokeWidth="2.5"
                  className="origin-top"
                  animate={{ rotate: [-2, 4, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                />
                
                <motion.path
                  d="M 88,28 C 92,28 94,48 90,55 C 87,60 84,55 84,40 Z"
                  fill="#8C705C"
                  stroke="#5C483A"
                  strokeWidth="2.5"
                  className="origin-top"
                  animate={{ rotate: [2, -4, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.2 }}
                />

                {/* Puppy Tail (Wagging) */}
                <motion.path
                  d="M 18,85 C 12,85 5,80 8,68 C 10,60 15,64 16,72"
                  fill="none"
                  stroke="#D2B48C"
                  strokeWidth="8"
                  strokeLinecap="round"
                  animate={{ rotate: [0, -25, 25, -25, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  className="origin-bottom-right"
                />

                {/* Puppy Body */}
                <ellipse cx="50" cy="76" rx="30" ry="21" fill="#EED9C4" stroke="#5C483A" strokeWidth="2.5" />
                <ellipse cx="50" cy="75" rx="28" ry="18" fill="#FBF5EE" />

                {/* Puppy Head */}
                <ellipse cx="50" cy="45" rx="28" ry="25" fill="#D2B48C" stroke="#5C483A" strokeWidth="2.5" />
                <ellipse cx="50" cy="44" rx="26" ry="23" fill="#EED9C4" />

                {/* Spot around one eye */}
                <path d="M 28,34 C 28,34 22,46 28,52 C 34,58 40,46 38,40 Z" fill="#8C705C" opacity="0.6" />

                {/* Puppy Cheeks */}
                <ellipse cx="32" cy="51" rx="4" ry="2.5" fill="#F8DFE3" />
                <ellipse cx="68" cy="51" rx="4" ry="2.5" fill="#F8DFE3" />

                {/* Eyes */}
                <motion.g
                  animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                  transition={{ repeat: Infinity, duration: 4, repeatDelay: 1.8 }}
                  className="origin-center"
                >
                  <circle cx="35" cy="44" r="3.5" fill="#42352B" />
                  <circle cx="34" cy="42.5" r="1.5" fill="#FFFFFF" />
                  <circle cx="65" cy="44" r="3.5" fill="#42352B" />
                  <circle cx="64" cy="42.5" r="1.5" fill="#FFFFFF" />
                </motion.g>

                {/* Puppy Snout / Nose */}
                <ellipse cx="50" cy="52" rx="10" ry="7" fill="#FDFBF7" stroke="#5C483A" strokeWidth="1.5" />
                <polygon points="46,49 54,49 50,53" fill="#42352B" />
                <path d="M 47,56 C 49,57 50,56 50,54 C 50,56 51,57 53,56" fill="none" stroke="#42352B" strokeWidth="2" strokeLinecap="round" />

                {/* Puppy Tongue */}
                <motion.path
                  d="M 48,57 C 48,57 46,65 50,65 C 54,65 52,57 52,57 Z"
                  fill="#FF9AA2"
                  animate={{ scaleY: [1, 1.2, 1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="origin-top"
                />
              </svg>

              {/* Sparkle Float on Hover */}
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#8C8273] mt-3 group-hover:text-[#5C483A] transition-colors">
              Pippin the Dog 🐶
            </span>
            <span className="text-[10px] font-mono text-[#8C8273]/60">Woof!</span>
          </motion.div>

        </div>

        {/* Small Paw Print trail decoration */}
        <div className="flex gap-4 mt-8 opacity-25">
          <span className="transform -rotate-12 text-[#967C65]">🐾</span>
          <span className="transform rotate-12 text-[#967C65] translate-y-2">🐾</span>
          <span className="transform -rotate-6 text-[#967C65] translate-y-1">🐾</span>
        </div>
      </div>
    </div>
  );
}
