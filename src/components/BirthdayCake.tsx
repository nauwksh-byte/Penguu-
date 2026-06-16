import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart } from "lucide-react";

// Confetti Particle interface
interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  decay: number;
  shape: "circle" | "square" | "triangle";
}

export default function BirthdayCake() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const pastelColors = [
    "#FFB7B2", // pastel red/pink
    "#FFDAC1", // pastel orange/peach
    "#E2F0CB", // pastel yellow/green
    "#B5EAD7", // pastel mint
    "#C7CEEA", // pastel purple/blue
    "#FFC6FF", // pastel purple/pink
    "#BDB2FF"  // soft blue-purple
  ];

  // Synthesize a magical sparkle sound when clicking the cake
  const playSparkleSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      
      // Magical chime arpeggio: F5, A5, C6, F6
      const notes = [698.46, 880.00, 1046.50, 1396.91];
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.42);
      });
    } catch (e) {
      // Audio autoplay restrictions standard handle
    }
  };

  const createParticle = (x: number, y: number): ConfettiParticle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 4; // Velocity scale
    const shapeChoices: Array<"circle" | "square" | "triangle"> = ["circle", "square", "triangle"];
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5, // initial upward burst
      color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
      size: Math.random() * 8 + 6,
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      opacity: 1,
      decay: Math.random() * 0.015 + 0.01,
      shape: shapeChoices[Math.floor(Math.random() * shapeChoices.length)]
    };
  };

  const launchConfetti = (e: React.MouseEvent<HTMLDivElement>) => {
    playSparkleSound();
    setClickCount((prev) => prev + 1);

    // Toggle candles blown state
    if (!candlesBlown) {
      setCandlesBlown(true);
    } else {
      // If already blown, rekindle candles after 4 click triggers
      if (clickCount >= 3) {
        setCandlesBlown(false);
        setClickCount(0);
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Generate 120 confetti particles on clicks position
    const newParticles: ConfettiParticle[] = [];
    for (let i = 0; i < 110; i++) {
      newParticles.push(createParticle(clickX, clickY));
    }
    particlesRef.current = [...particlesRef.current, ...newParticles];

    // Start loop if not already running
    if (!animationFrameRef.current) {
      tick();
    }
  };

  const tick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity constant
      p.vx *= 0.98; // horizontal friction
      p.vy *= 0.98; // vertical air friction
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > canvas.height) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      if (p.shape === "circle") {
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      } else if (p.shape === "triangle") {
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 2, p.size / 2);
        ctx.lineTo(-p.size / 2, p.size / 2);
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    if (particles.length > 0) {
      animationFrameRef.current = requestAnimationFrame(tick);
    } else {
      animationFrameRef.current = null;
    }
  };

  // Adjust canvas bounds dynamically
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto relative h-80 flex flex-col justify-center items-center">
      
      {/* Absolute Overlaid Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      <div 
        id="interactive-birthday-cake"
        onClick={launchConfetti}
        className="relative cursor-pointer group z-10 select-none flex flex-col items-center justify-center transform active:scale-95 transition-transform"
      >
        {/* Animated Candles */}
        <div className="flex gap-4 mb-[-3px] justify-center w-full z-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative w-2 h-10 bg-gradient-to-t from-brand-blue-border to-brand-blue flex justify-center rounded-sm">
              {/* Candle stripes decoration */}
              <div className="absolute top-2 w-full h-1 bg-brand-brown/15 rotate-12" />
              <div className="absolute top-5 w-full h-1 bg-brand-brown/15 rotate-12" />

              {/* Candle Wick */}
              <div className="absolute -top-1.5 w-0.5 h-1.5 bg-[#42352B]" />

              {/* Flame (Disappears when blown) */}
              <AnimatePresence>
                {!candlesBlown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: [1, 1.15, 0.95, 1],
                      y: [0, -1, 0.5, 0],
                    }}
                    exit={{ opacity: 0, scale: 0, y: -5 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + i * 0.1,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-5 w-3 h-5 bg-gradient-to-b from-[#FFA07A] via-[#FFD700] to-transparent rounded-full origin-bottom shadow-[0_0_8px_#FFA07A]"
                  />
                )}
              </AnimatePresence>

              {/* Small smoke trail on blow */}
              <AnimatePresence>
                {candlesBlown && clickCount === 1 && (
                  <motion.div
                    initial={{ opacity: 1, y: -5, scale: 0.8 }}
                    animate={{ opacity: 0, y: -25, scale: 1.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute -top-6 w-1.5 h-4 bg-brand-brown-text/10 rounded-full"
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Cake Wrapper */}
        <svg viewBox="0 0 160 120" className="w-44 h-34 sm:w-52 sm:h-40 drop-shadow-md">
          {/* Top frosting layer dripping */}
          <rect x="25" y="55" width="110" height="40" rx="6" fill="#F6EEE4" stroke="#8C8273" strokeWidth="2" />
          {/* Strawberry design decorations */}
          <circle cx="36" cy="65" r="4" fill="#FFB7B2" />
          <circle cx="56" cy="65" r="4" fill="#FFB7B2" />
          <circle cx="80" cy="65" r="4" fill="#FFB7B2" />
          <circle cx="104" cy="65" r="4" fill="#FFB7B2" />
          <circle cx="124" cy="65" r="4" fill="#FFB7B2" />

          {/* Dripping frosting curves */}
          <path d="M 25,65 C 30,73 35,73 40,65 C 45,73 50,73 55,65 C 60,73 65,73 70,65 C 75,73 80,73 85,65 C 90,73 95,73 100,65 C 105,73 110,73 115,65 C 120,73 125,73 130,65 C 131,65 133,63 135,65" fill="#FAF8F5" stroke="#8C8273" strokeWidth="1.5" />

          {/* Bottom crust cream base layer */}
          <rect x="15" y="80" width="130" height="30" rx="8" fill="#F3EFE9" stroke="#8C8273" strokeWidth="2.5" />
          <path d="M 20,95 Q 80,105 140,95" fill="none" stroke="#E8DAC8" strokeWidth="6" strokeLinecap="round" />

          {/* Little Star sparkles printed on cake */}
          <path d="M 60,88 L 62,90 L 60,92 L 58,90 Z" fill="#FFD700" />
          <path d="M 100,88 L 102,90 L 100,92 L 98,90 Z" fill="#FFD700" />

          {/* Beautiful decorative stand */}
          <path d="M 30,110 L 130,110 C 130,110 120,118 100,118 L 60,118 C 40,118 30,110 30,110 Z" fill="#E8DEC9" stroke="#8C8273" strokeWidth="2" />
        </svg>

        {/* Soft Interactive Prompt text */}
        <div className="mt-4 flex flex-col items-center gap-1 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C8273]/80 flex items-center gap-1 group-hover:text-[#967C65] transition-colors">
            {candlesBlown ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "3s" }} />
                <span>Tap for more confetti sparkles!</span>
              </>
            ) : (
              <>
                <span>Blow out candles! 🕯️ (Click)</span>
              </>
            )}
          </span>
          {candlesBlown && clickCount > 0 && (
            <span className="text-[10px] text-brand-brown-text/60 italic">
              (Click {4 - clickCount} more times to rekindle candles!)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
