import { useMemo } from "react";
import { motion } from "framer-motion";

const moodEmojis: Record<string, string> = {
  Great: "😄",
  Good: "🙂",
  Neutral: "😐",
  Sad: "😞",
  Stressed: "😣",
};

const moodColors: Record<string, string> = {
  Great: "bg-primary",
  Good: "bg-primary/70",
  Neutral: "bg-secondary/50",
  Sad: "bg-secondary/70",
  Stressed: "bg-secondary",
};

const InsightsPage = () => {
  const data = useMemo(() => {
    const stored: { date: string; mood: string }[] = JSON.parse(
      localStorage.getItem("ventup-moods") || "[]"
    );
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recent = stored.filter((m) => new Date(m.date) >= weekAgo);

    const counts: Record<string, number> = {};
    recent.forEach(({ mood }) => {
      counts[mood] = (counts[mood] || 0) + 1;
    });
    const total = recent.length;
    const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

    return { counts, total, topMood };
  }, []);

  const allMoods = ["Great", "Good", "Neutral", "Sad", "Stressed"];
  const maxCount = Math.max(...allMoods.map((m) => data.counts[m] || 0), 1);

  return (
    <div className="px-5 pt-12 pb-24 max-w-lg mx-auto">
      <motion.h1
        className="text-2xl font-bold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Mood Insights
      </motion.h1>
      <p className="text-muted-foreground text-sm mt-1">Your week at a glance</p>

      {data.total === 0 ? (
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-4xl">📊</span>
          <p className="text-muted-foreground mt-4">
            No mood data yet. Go to Home and tap a mood to start tracking!
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            className="mt-6 bg-card rounded-2xl p-5 shadow-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm font-medium text-muted-foreground mb-4">This week</p>
            <div className="space-y-3">
              {allMoods.map((mood, i) => {
                const count = data.counts[mood] || 0;
                const pct = (count / maxCount) * 100;
                return (
                  <motion.div
                    key={mood}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    <span className="text-xl w-8 text-center">{moodEmojis[mood]}</span>
                    <div className="flex-1">
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${moodColors[mood]}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-foreground w-6 text-right">
                      {count}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="mt-4 bg-card rounded-2xl p-5 shadow-card text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-3xl">{moodEmojis[data.topMood[0]]}</span>
            <p className="mt-2 text-foreground font-semibold">
              You felt {data.topMood[0].toLowerCase()} most this week.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {data.total} mood{data.total !== 1 ? "s" : ""} recorded
            </p>
          </motion.div>

          <motion.div
            className="mt-4 bg-card rounded-2xl p-4 shadow-card text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground">
              Try taking small breaks and checking in with yourself. 💜
            </p>
          </motion.div>
        </>
      )}

      <motion.p
        className="text-center text-sm text-muted-foreground mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Every feeling is valid. 💜
      </motion.p>
    </div>
  );
};

export default InsightsPage;
