import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Timer, BarChart3, Wind } from "lucide-react";
import { useNavigate } from "react-router-dom";

const moods = [
  { emoji: "😄", label: "Great" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😞", label: "Sad" },
  { emoji: "😣", label: "Stressed" },
];

const suggestions: Record<string, { text: string; path?: string }> = {
  Great: { text: "Keep the momentum going 🚀" },
  Good: { text: "You're doing great! Maybe journal a bit?" },
  Neutral: { text: "Maybe write what's on your mind", path: "/vent" },
  Sad: { text: "Try a breathing exercise 💙", path: "/breathe" },
  Stressed: { text: "Try a breathing exercise 💙", path: "/breathe" },
};

const actions = [
  { icon: PenLine, title: "Vent something", sub: "We're listening", path: "/vent", color: "bg-primary/10 text-primary" },
  { icon: Timer, title: "Start Focus Mode", sub: "One step at a time", path: "/focus", color: "bg-secondary/10 text-secondary" },
  { icon: BarChart3, title: "View Insights", sub: "Understand your patterns", path: "/insights", color: "bg-accent text-accent-foreground" },
  { icon: Wind, title: "Breathe", sub: "Slow things down", path: "/breathe", color: "bg-primary/10 text-primary" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const streak = useMemo(() => {
    const stored: { date: string }[] = JSON.parse(localStorage.getItem("ventup-moods") || "[]");
    const dates = [...new Set(stored.map((m) => m.date))].sort().reverse();
    let count = 0;
    const today = new Date();
    for (let i = 0; i < dates.length; i++) {
      const expected = new Date(today);
      expected.setDate(expected.getDate() - i);
      if (dates[i] === expected.toISOString().slice(0, 10)) {
        count++;
      } else break;
    }
    return count;
  }, []);

  const saveMood = (label: string) => {
    const today = new Date().toISOString().slice(0, 10);
    const stored = JSON.parse(localStorage.getItem("ventup-moods") || "[]");
    stored.push({ date: today, mood: label });
    localStorage.setItem("ventup-moods", JSON.stringify(stored));
    setSelectedMood(label);
  };

  return (
    <div className="px-5 pt-12 pb-24 max-w-lg mx-auto">
      <motion.p
        className="text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Welcome back 👋
      </motion.p>
      <motion.h1
        className="text-2xl font-bold mt-1 text-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Hey, how are you feeling today?
      </motion.h1>

      {streak > 1 && (
        <motion.p
          className="text-sm text-primary mt-2 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          🔥 You checked in {streak} days in a row 💙
        </motion.p>
      )}

      <motion.div
        className="flex justify-between mt-6 bg-card rounded-2xl p-4 shadow-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {moods.map(({ emoji, label }) => (
          <button
            key={label}
            onClick={() => saveMood(label)}
            className={`flex flex-col items-center gap-1 hover:scale-110 transition-transform active:scale-95 rounded-xl px-2 py-1 ${
              selectedMood === label ? "bg-primary/10" : ""
            }`}
          >
            <span className="text-3xl">{emoji}</span>
            <span className="text-[11px] text-muted-foreground">{label}</span>
          </button>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedMood && suggestions[selectedMood] && (
          <motion.div
            className="mt-3 bg-card rounded-2xl p-4 shadow-card text-center cursor-pointer"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            onClick={() => {
              const s = suggestions[selectedMood];
              if (s.path) navigate(s.path);
            }}
          >
            <p className="text-sm text-foreground font-medium">
              {suggestions[selectedMood].text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 space-y-3">
        {actions.map(({ icon: Icon, title, sub, path, color }, i) => (
          <motion.button
            key={title}
            onClick={() => navigate(path)}
            className="w-full flex items-center gap-4 bg-card rounded-2xl p-4 shadow-card text-left hover:shadow-soft transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground">{title}</p>
              <p className="text-sm text-muted-foreground">{sub}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.p
        className="text-center text-sm text-muted-foreground mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        You're doing okay. 💙
      </motion.p>
    </div>
  );
};

export default HomePage;
