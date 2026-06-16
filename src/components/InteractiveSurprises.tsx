import React, { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Interfaces for floating heart and scroll paw-print items
interface ClickHeart {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  rotate: number;
}

interface ScrollPaw {
  id: string;
  x: number;
  y: number;
  rotate: number;
}

export default function InteractiveSurprises() {
  const [hearts, setHearts] = useState<ClickHeart[]>([]);
  const [paws, setPaws] = useState<ScrollPaw[]>([]);
  const lastScrollY = useRef(0);
  const scrollAccumulator = useRef(0);

  // Pastel Color list for happy birthday hearts
  const heartColors = [
    "text-[#FFB7B2]", // soft pink
    "text-[#FFDAC1]", // soft peach
    "text-[#E2F0CB]", // soft sage/green
    "text-[#B5EAD7]", // soft mint
    "text-[#C7CEEA]", // soft lavender
    "text-[#FFC6FF]", // soft violet
    "text-[#BDB2FF]"  // soft blue-purple
  ];

  // Global click handler for floating hearts
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Don't spawn hearts if clicking toggle music or other active buttons to keep control clean
      const target = e.target as HTMLElement;
      if (
        target.closest("button") || 
        target.closest("a") || 
        target.closest("#btn-music-toggle") ||
        target.closest("#interactive-cat-companion") ||
        target.closest("#interactive-dog-companion")
      ) {
        return;
      }

      const newHeart: ClickHeart = {
        id: `heart-${Date.now()}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        size: Math.floor(Math.random() * 20) + 16, // size between 16px and 36px
        rotate: Math.floor(Math.random() * 40) - 20, // -20deg to 20deg
      };

      setHearts((prev) => [...prev, newHeart]);

      // Remove after animation finishes
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1500);
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Global scroll handler for paw print triggers
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;
      
      scrollAccumulator.current += scrollDiff;

      // Every 120 pixels of scrolls, drop a cute paw print at a randomized side margin position
      if (scrollAccumulator.current > 120) {
        scrollAccumulator.current = 0;

        // Choose client side spacing (left side or right side of screen)
        const isLeftSide = Math.random() > 0.5;
        const randomX = isLeftSide 
          ? Math.random() * 80 + 20 // 20px to 100px from left
          : window.innerWidth - (Math.random() * 80 + 60); // 60px to 140px from right

        const scrollYOffset = currentScrollY + (window.innerHeight / 2) + (Math.random() * 200 - 100);

        const newPaw: ScrollPaw = {
          id: `paw-${Date.now()}-${Math.random()}`,
          x: randomX,
          y: scrollYOffset,
          rotate: Math.floor(Math.random() * 90) - 45,
        };

        setPaws((prev) => [...prev, newPaw]);

        // Evaporate after 2.5 seconds
        setTimeout(() => {
          setPaws((prev) => prev.filter((p) => p.id !== newPaw.id));
        }, 2500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      
      {/* Floating Click Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.3, x: heart.x - heart.size/2, y: heart.y - heart.size/2, rotate: heart.rotate }}
            animate={{ 
              opacity: [1, 0.8, 0], 
              y: heart.y - heart.size/2 - 150, 
              x: heart.x - heart.size/2 + (Math.random() * 60 - 30), 
              scale: [0.3, 1.2, 0.8] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ position: "fixed" }}
            className={heart.color}
          >
            <Heart size={heart.size} fill="currentColor" className="drop-shadow-sm" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Decorative Paw Prints Trails (Absolute positioned globally relative to document scroll) */}
      <AnimatePresence>
        {paws.map((paw) => (
          <motion.div
            key={paw.id}
            initial={{ opacity: 0, scale: 0.5, rotate: paw.rotate }}
            animate={{ opacity: [0, 0.28, 0], scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: paw.x,
              top: paw.y,
            }}
            className="text-[#967C65] text-lg select-none"
          >
            🐾
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
