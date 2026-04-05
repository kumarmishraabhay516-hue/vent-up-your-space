import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface VentEntry {
  text: string;
  anonymous: boolean;
  date: string;
}

const VentHistoryPage = () => {
  const navigate = useNavigate();

  const entries = useMemo(() => {
    const stored: VentEntry[] = JSON.parse(
      localStorage.getItem("ventup-vents") || "[]"
    );
    return stored.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (isToday) return `Today, ${time}`;
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return `Yesterday, ${time}`;
    return `${d.toLocaleDateString([], { month: "short", day: "numeric" })}, ${time}`;
  };

  return (
    <div className="px-5 pt-12 pb-24 max-w-lg mx-auto">
      <motion.h1
        className="text-2xl font-bold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Your thoughts
      </motion.h1>
      <p className="text-muted-foreground text-sm mt-1">Everything you've shared</p>

      {entries.length === 0 ? (
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-4xl">📝</span>
          <p className="text-muted-foreground mt-4">
            No thoughts saved yet. Start by sharing what's on your mind.
          </p>
          <button
            onClick={() => navigate("/vent")}
            className="mt-4 text-primary font-medium hover:underline"
          >
            Write something →
          </button>
        </motion.div>
      ) : (
        <div className="mt-6 space-y-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.date}
              className="bg-card rounded-2xl p-4 shadow-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="text-foreground text-sm leading-relaxed">
                {entry.text}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">
                  {formatDate(entry.date)}
                </span>
                {entry.anonymous && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    Anonymous
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VentHistoryPage;
