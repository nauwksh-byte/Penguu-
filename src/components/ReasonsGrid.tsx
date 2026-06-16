import React from "react";
import { Smile, Shield, Sparkles, Heart, Sun, PawPrint } from "lucide-react";
import { motion } from "motion/react";

interface ReasonCardProps {
  key?: string;
  title: string;
  emoji: string;
  text: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  icon: React.ReactNode;
  delay: number;
}

function ReasonCard({ title, emoji, text, backgroundColor, textColor, borderColor, icon, delay }: ReasonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(140, 130, 115, 0.15)" }}
      className={`p-6 rounded-3xl border ${backgroundColor} ${borderColor} flex flex-col justify-between h-full transition-all shadow-sm group`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2.5 rounded-2xl ${backgroundColor} border-2 ${borderColor} ${textColor} transition-transform group-hover:rotate-6`}>
            {icon}
          </div>
          <span className="text-2xl filter drop-shadow-sm pointer-events-none select-none">{emoji}</span>
        </div>
        <h4 className={`font-serif text-lg font-semibold ${textColor} mb-2`}>
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-[#8C8273] font-sans leading-relaxed">
          {text}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <span className={`text-[10px] uppercase tracking-widest font-mono opacity-40 group-hover:opacity-100 transition-opacity ${textColor}`}>
          with love ✨
        </span>
      </div>
    </motion.div>
  );
}

export default function ReasonsGrid() {
  const reasons = [
    {
      title: "Always supportive",
      emoji: "🤍",
      text: "Whenever I'm unsure of myself, your supportive words give me courage. Thank you for being my constant cheerleader and listening to me.",
      backgroundColor: "bg-brand-cream-dark/50",
      textColor: "text-brand-brown-text",
      borderColor: "border-brand-brown-border/60",
      icon: <Heart className="w-5 h-5" />,
      delay: 0.1,
    },
    {
      title: "Caring and kind",
      emoji: "🫶",
      text: "You notice the smallest details and always make sure everyone around you is happy and comfortable. Your heart is so loving and incredibly pure.",
      backgroundColor: "bg-brand-blue/40",
      textColor: "text-brand-blue-text",
      borderColor: "border-brand-blue-border/70",
      icon: <Sparkles className="w-5 h-5" />,
      delay: 0.2,
    },
    {
      title: "Makes everyone smile",
      emoji: "☀️",
      text: "You bring so much light and humor into our lives. No matter how gray the day is, your jokes and warmth instantly brighten things up.",
      backgroundColor: "bg-brand-brown/50",
      textColor: "text-brand-brown-text",
      borderColor: "border-brand-brown-border/70",
      icon: <Sun className="w-5 h-5" />,
      delay: 0.3,
    },
    {
      title: "Protective and dependable",
      emoji: "🌟",
      text: "You are my absolute safe haven. I always know that whatever happens in life, I can rely on my protective, loving brother to have my back.",
      backgroundColor: "bg-brand-sage/40",
      textColor: "text-brand-sage-text",
      borderColor: "border-brand-sage-border/70",
      icon: <Shield className="w-5 h-5" />,
      delay: 0.4,
    },
    {
      title: "Loves cats and dogs",
      emoji: "🐱🐶",
      text: "Your soft spot for cute little furry friends highlights how genuinely gentle, kind, and loving you are inside. They adore you, and so do I!",
      backgroundColor: "bg-brand-brown/30",
      textColor: "text-brand-brown-text",
      borderColor: "border-brand-brown-border/50",
      icon: <PawPrint className="w-5 h-5" />,
      delay: 0.5,
    },
    {
      title: "One of the most special people",
      emoji: "💙",
      text: "Life is infinitely sweeter, warmer, and more meaningful with you by my side. You are not just an amazing brother, but one of my greatest blessings.",
      backgroundColor: "bg-brand-blue/50",
      textColor: "text-brand-blue-text",
      borderColor: "border-brand-blue-border/80",
      icon: <Smile className="w-5 h-5" />,
      delay: 0.6,
    },
  ];

  return (
    <div id="reasons-section-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mt-8">
      {reasons.map((reason) => (
        <ReasonCard
          key={reason.title}
          title={reason.title}
          emoji={reason.emoji}
          text={reason.text}
          backgroundColor={reason.backgroundColor}
          textColor={reason.textColor}
          borderColor={reason.borderColor}
          icon={reason.icon}
          delay={reason.delay}
        />
      ))}
    </div>
  );
}
