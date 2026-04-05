import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square } from "lucide-react";

const phases = [
  { label: "Inhale…", duration: 4000, scale: 1.5, opacity: 1 },
  { label: "Hold…", duration: 4000, scale: 1.5, opacity: 0.8 },
  { label: "Exhale…", duration: 6000, scale: 1, opacity: 0.5 },
];

const BreathePage = () => {
  const [active, setActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    const advance = () => {
      setPhaseIndex((p) => (p + 1) % phases.length);
    };
    timerRef.current = setTimeout(advance, phases[phaseIndex].duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, phaseIndex]);

  const start = () => {
    setPhaseIndex(0);
    setActive(true);
  };
  const stop = () => {
    setActive(false);
    setPhaseIndex(0);
  };

  const phase = phases[phaseIndex];

  return (
    <div className="px-5 pt-12 pb-24 max-w-lg mx-auto flex flex-col items-center">
      <motion.h1
        className="text-2xl font-bold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Breathing Exercise
      </motion.h1>
      <p className="text-muted-foreground text-sm mt-1">
        Let's slow things down together.
      </p>

      <div className="relative mt-12 flex items-center justify-center w-64 h-64">
        <motion.div
          className="absolute w-40 h-40 rounded-full gradient-calm"
          animate={
            active
              ? {
                  scale: phase.scale,
                  opacity: phase.opacity,
                }
              : { scale: 1, opacity: 0.4 }
          }
          transition={{
            duration: phase.duration / 1000,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full border-2 border-primary/20"
          animate={
            active
              ? { scale: phase.scale * 0.95, opacity: phase.opacity * 0.5 }
              : { scale: 1, opacity: 0.2 }
          }
          transition={{
            duration: phase.duration / 1000,
            ease: "easeInOut",
          }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={active ? phase.label : "ready"}
            className="relative z-10 text-lg font-semibold text-primary-foreground"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {active ? phase.label : "Ready"}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="mt-8">
        {active ? (
          <button
            onClick={stop}
            className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground active:scale-95 transition-all"
          >
            <Square size={20} />
          </button>
        ) : (
          <button
            onClick={start}
            className="w-14 h-14 rounded-full gradient-calm flex items-center justify-center shadow-soft text-primary-foreground active:scale-95 transition-transform"
          >
            <Play size={22} className="ml-0.5" />
          </button>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-10 animate-pulse-soft">
        Take your time. You're safe here.
      </p>
    </div>
  );
};

export default BreathePage;
