import { motion } from "framer-motion";
import { PenLine, Timer, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const moods = [
  { emoji: "😄", label: "Great" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😞", label: "Sad" },
  { emoji: "😣", label: "Stressed" },
];

const actions = [
  { icon: PenLine, title: "Vent something", sub: "We're listening", path: "/vent", color: "bg-primary/10 text-primary" },
  { icon: Timer, title: "Start Focus Mode", sub: "Take your time", path: "/focus", color: "bg-secondary/10 text-secondary" },
  { icon: BarChart3, title: "View Insights", sub: "See your week", path: "/insights", color: "bg-accent text-accent-foreground" },
];

const HomePage = () => {
  const navigate = useNavigate();

  const saveMood = (label: string) => {
    const today = new Date().toISOString().slice(0, 10);
    const stored = JSON.parse(localStorage.getItem("ventup-moods") || "[]");
    stored.push({ date: today, mood: label });
    localStorage.setItem("ventup-moods", JSON.stringify(stored));
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
            className="flex flex-col items-center gap-1 hover:scale-110 transition-transform active:scale-95"
          >
            <span className="text-3xl">{emoji}</span>
            <span className="text-[11px] text-muted-foreground">{label}</span>
          </button>
        ))}
      </motion.div>

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
