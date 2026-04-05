import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const TOTAL = 25 * 60;

const FocusPage = () => {
  const [seconds, setSeconds] = useState(TOTAL);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = useCallback(() => {
    setSeconds((s) => {
      if (s <= 1) {
        setRunning(false);
        return 0;
      }
      return s - 1;
    });
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, tick]);

  const reset = () => {
    setRunning(false);
    setSeconds(TOTAL);
  };

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const progress = ((TOTAL - seconds) / TOTAL) * 100;

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="px-5 pt-12 pb-24 max-w-lg mx-auto flex flex-col items-center">
      <motion.h1
        className="text-2xl font-bold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Focus Mode
      </motion.h1>
      <p className="text-muted-foreground text-sm mt-1">Stay with it. One step at a time.</p>

      <motion.div
        className="relative mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <svg width="280" height="280" className="-rotate-90">
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(213 100% 67%)" />
              <stop offset="100%" stopColor="hsl(258 90% 66%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-foreground tabular-nums">
            {mins}:{secs}
          </span>
          <span className="text-sm text-muted-foreground mt-1">
            {seconds === 0 ? "Well done! 🎉" : running ? "Focusing..." : "Ready"}
          </span>
        </div>
      </motion.div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setRunning(!running)}
          className="w-14 h-14 rounded-full gradient-calm flex items-center justify-center shadow-soft text-primary-foreground active:scale-95 transition-transform"
        >
          {running ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
        </button>
        <button
          onClick={reset}
          className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground active:scale-95 transition-all"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-10 animate-pulse-soft">
        Take your time. You've got this.
      </p>
    </div>
  );
};

export default FocusPage;
