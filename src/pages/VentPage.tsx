import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VentPage = () => {
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    const stored = JSON.parse(localStorage.getItem("ventup-vents") || "[]");
    stored.push({ text, anonymous, date: new Date().toISOString() });
    localStorage.setItem("ventup-vents", JSON.stringify(stored));
    setSubmitted(true);
    setText("");
  };

  return (
    <div className="px-5 pt-12 pb-24 max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="text-5xl mb-4">💙</span>
            <h2 className="text-2xl font-bold text-foreground">You're heard. You matter.</h2>
            <p className="text-muted-foreground mt-2">Take your time. We're here.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-primary font-medium hover:underline"
            >
              Vent again
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="text-2xl font-bold text-foreground">Speak your mind</h1>
            <p className="text-muted-foreground text-sm mt-1">We're listening. No judgment.</p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="mt-6 w-full h-48 bg-card rounded-2xl p-4 shadow-card resize-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <div
                onClick={() => setAnonymous(!anonymous)}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  anonymous ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${
                    anonymous ? "translate-x-[18px]" : "translate-x-0.5"
                  }`}
                />
              </div>
              <span className="text-sm text-foreground">Post anonymously</span>
            </label>

            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="mt-6 w-full py-3.5 rounded-2xl font-semibold text-primary-foreground gradient-calm shadow-soft disabled:opacity-40 transition-opacity active:scale-[0.98]"
            >
              Let it out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VentPage;
