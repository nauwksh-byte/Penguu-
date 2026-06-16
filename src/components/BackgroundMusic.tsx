import React, { useState, useRef, useEffect } from "react";
import { Music, Music4, Volume2, VolumeX, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for scheduling notes
interface Note {
  frequency: number;
  duration: number; // in seconds
  time: number;     // delay from start of sequence in seconds
}

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [noteFlash, setNoteFlash] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const sequenceLength = 16; // loop length in seconds

  // Frequencies for a dreamy chime Happy Birthday melody in F Major / C Major
  const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16, C5 = 523.25;
  const A3 = 220.00, F3 = 174.61, G3 = 196.00, Bb3 = 233.08;

  // Dreaming chord progression (backing pads)
  const padChords = [
    { time: 0, notes: [F3, C4, E4], duration: 4 },   // Fmaj7
    { time: 4, notes: [G3, D4, F4], duration: 4 },   // G7 or Bb/G
    { time: 8, notes: [A3, E4, G4], duration: 4 },   // Am7
    { time: 12, notes: [Bb3, F4, A4], duration: 4 }, // Bbmaj7
  ];

  // Dreams / Birthday chime notes
  const chimeNotes: Note[] = [
    // Phrase 1: Happy birthday to you (C4, C4, D4, C4, F4, E4)
    { frequency: C4, duration: 0.4, time: 0.0 },
    { frequency: C4, duration: 0.4, time: 0.5 },
    { frequency: D4, duration: 0.6, time: 1.0 },
    { frequency: C4, duration: 0.6, time: 2.0 },
    { frequency: F4, duration: 0.6, time: 3.0 },
    { frequency: E4, duration: 1.2, time: 4.0 },

    // Phrase 2: Happy birthday to you (C4, C4, D4, C4, G4, F4)
    { frequency: C4, duration: 0.4, time: 5.0 },
    { frequency: C4, duration: 0.4, time: 5.5 },
    { frequency: D4, duration: 0.6, time: 6.0 },
    { frequency: C4, duration: 0.6, time: 7.0 },
    { frequency: G4, duration: 0.6, time: 8.0 },
    { frequency: F4, duration: 1.2, time: 9.0 },

    // Phrase 3: Happy birthday dear Pengu (C4, C4, C5, A4, F4, E4, D4)
    { frequency: C4, duration: 0.4, time: 10.0 },
    { frequency: C4, duration: 0.4, time: 10.5 },
    { frequency: C5, duration: 0.6, time: 11.0 },
    { frequency: A4, duration: 0.6, time: 12.0 },
    { frequency: F4, duration: 0.6, time: 13.0 },
    { frequency: E4, duration: 0.6, time: 14.0 },
    { frequency: D4, duration: 1.0, time: 15.0 },
  ];

  const noteNames = ["✨", "🌸", "⭐", "💫", "💭", "🎵", "🍃", "🧸"];

  const playChime = (ctx: AudioContext, destination: AudioNode, freq: number, delay: number, duration: number, isPad = false) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(destination);

    if (isPad) {
      // Soft, warm pad synth
      osc.type = "sine";
      const now = ctx.currentTime + delay;
      // Envelope
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.04, now + 1.5); // very soft
      gainNode.gain.setValueAtTime(0.04, now + duration - 1.5);
      gainNode.gain.linearRampToValueAtTime(0, now + duration);

      osc.frequency.setValueAtTime(freq, now);
      osc.start(now);
      osc.stop(now + duration);
    } else {
      // Direct physical chime modeling (like a music box)
      // Base sine osc
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      
      // Harmonics for cute metallic music box chime
      const modifierOsc1 = ctx.createOscillator();
      const modifierGain1 = ctx.createGain();
      modifierOsc1.type = "sine";
      modifierOsc1.frequency.setValueAtTime(freq * 2, ctx.currentTime + delay); // First overtone
      modifierOsc1.connect(modifierGain1);
      modifierGain1.connect(destination);

      const modifierOsc2 = ctx.createOscillator();
      const modifierGain2 = ctx.createGain();
      modifierOsc2.type = "sine";
      modifierOsc2.frequency.setValueAtTime(freq * 3, ctx.currentTime + delay); // Second overtone
      modifierOsc2.connect(modifierGain2);
      modifierGain2.connect(destination);

      const now = ctx.currentTime + delay;
      // Primary chime volume envelope (instant attack, long exponential decay)
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

      modifierGain1.gain.setValueAtTime(0, now);
      modifierGain1.gain.linearRampToValueAtTime(0.04, now + 0.01);
      modifierGain1.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.4);

      modifierGain2.gain.setValueAtTime(0, now);
      modifierGain2.gain.linearRampToValueAtTime(0.02, now + 0.01);
      modifierGain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.25);

      osc.start(now);
      osc.stop(now + duration);

      modifierOsc1.start(now);
      modifierOsc1.stop(now + duration);

      modifierOsc2.start(now);
      modifierOsc2.stop(now + duration);

      // Trigger a small visual animation block in parent UI safely
      setTimeout(() => {
        if (isPlaying) {
          const randomSymbol = noteNames[Math.floor(Math.random() * noteNames.length)];
          setNoteFlash(randomSymbol);
          setTimeout(() => setNoteFlash(null), 800);
        }
      }, delay * 1000);
    }
  };

  const scheduleNextLoop = (ctx: AudioContext, delayFromNow: number) => {
    // Create master effect node: dynamic highpass filter, delay and reverb
    const delayNode = ctx.createDelay(2.0);
    const feedbackGain = ctx.createGain();
    const filterNode = ctx.createBiquadFilter();
    const volumeNode = ctx.createGain();

    filterNode.type = "highpass";
    filterNode.frequency.setValueAtTime(100, ctx.currentTime);

    delayNode.delayTime.setValueAtTime(0.4, ctx.currentTime); // 400ms echo
    feedbackGain.gain.setValueAtTime(0.25, ctx.currentTime); // feedback

    // Connect echo chain
    delayNode.connect(feedbackGain);
    feedbackGain.connect(delayNode);

    // Master Volume
    volumeNode.gain.setValueAtTime(0.8, ctx.currentTime);

    // Connect nodes
    filterNode.connect(ctx.destination);
    volumeNode.connect(filterNode);
    delayNode.connect(volumeNode);

    const targetNode = volumeNode;

    const baseTime = ctx.currentTime + delayFromNow;

    // Schedule pad chords
    padChords.forEach(chord => {
      chord.notes.forEach(noteFreq => {
        playChime(ctx, targetNode, noteFreq, delayFromNow + chord.time, chord.duration, true);
      });
    });

    // Schedule chime melody
    chimeNotes.forEach(note => {
      // Connect to both direct volume and delay loop for ambient echo
      const merger = ctx.createGain();
      merger.gain.setValueAtTime(0.8, ctx.currentTime);
      merger.connect(volumeNode);
      merger.connect(delayNode);

      playChime(ctx, merger, note.frequency, delayFromNow + note.time, note.duration, false);
    });
  };

  const startMusic = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    setIsPlaying(true);
    startTimeRef.current = ctx.currentTime;
    
    // Play immediately
    scheduleNextLoop(ctx, 0.1);

    // Loop every 16 seconds
    const intervalId = window.setInterval(() => {
      if (audioContextRef.current) {
        scheduleNextLoop(audioContextRef.current, 0.1);
      }
    }, sequenceLength * 1000);

    schedulerRef.current = intervalId;
  };

  const stopMusic = () => {
    setIsPlaying(false);
    if (schedulerRef.current !== null) {
      clearInterval(schedulerRef.current);
      schedulerRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().then(() => {
        audioContextRef.current = null;
      });
    }
    setNoteFlash(null);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic().catch(err => {
        console.error("Failed to play cozy chimes", err);
      });
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (schedulerRef.current !== null) {
        clearInterval(schedulerRef.current);
      }
    };
  }, []);

  return (
    <div id="cozy-music-controller" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Sparkly Floating note element indicator */}
      <AnimatePresence>
        {noteFlash && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.6 }}
            animate={{ opacity: [0, 1, 1, 0], y: -40, scale: [0.6, 1.2, 1, 0.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute right-3 text-2xl drop-shadow-sm pointer-events-none"
          >
            {noteFlash}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="btn-music-toggle"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMusic}
        className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-md backdrop-blur-md transition-all border ${
          isPlaying
            ? "bg-brand-brown border-brand-brown-border text-brand-brown-text"
            : "bg-brand-cream-dark border-dashed border-brand-brown-text/30 text-brand-brown-text/70"
        }`}
      >
        <div className="relative">
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="flex items-center justify-center w-6 h-6"
            >
              <Music4 className="w-5 h-5" />
            </motion.div>
          ) : (
            <Music className="w-5 h-5 opacity-70" />
          )}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-brown-text opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-brown-text"></span>
            </span>
          )}
        </div>

        <span className="text-sm font-medium tracking-tight">
          {isPlaying ? "Music Playing ✨" : "Enable Music ✨"}
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4 opacity-50" />
        )}
      </motion.button>
    </div>
  );
}
