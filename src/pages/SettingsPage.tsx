import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Bell, Shield, Heart } from "lucide-react";

const SettingsPage = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("ventup-theme") === "dark";
  });
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("ventup-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("ventup-theme", "light");
    }
  }, [dark]);

  const Toggle = ({
    on,
    onToggle,
  }: {
    on: boolean;
    onToggle: () => void;
  }) => (
    <div
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
        on ? "bg-primary" : "bg-muted"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${
          on ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </div>
  );

  return (
    <div className="px-5 pt-12 pb-24 max-w-lg mx-auto">
      <motion.h1
        className="text-2xl font-bold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Settings
      </motion.h1>
      <p className="text-muted-foreground text-sm mt-1">Make VentUp yours</p>

      <div className="mt-6 space-y-3">
        <motion.div
          className="bg-card rounded-2xl p-4 shadow-card flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Moon size={18} className="text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Easier on the eyes</p>
            </div>
          </div>
          <Toggle on={dark} onToggle={() => setDark(!dark)} />
        </motion.div>

        <motion.div
          className="bg-card rounded-2xl p-4 shadow-card flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Bell size={18} className="text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Reminders</p>
              <p className="text-xs text-muted-foreground">Gentle check-in nudges</p>
            </div>
          </div>
          <Toggle on={notifications} onToggle={() => setNotifications(!notifications)} />
        </motion.div>

        <motion.div
          className="bg-card rounded-2xl p-4 shadow-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Shield size={18} className="text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Privacy</p>
              <p className="text-xs text-muted-foreground">
                Your data stays on your device. Nothing is shared.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-2xl p-4 shadow-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Need help?</p>
              <p className="text-xs text-muted-foreground">
                If you're struggling, please reach out to someone you trust — a friend, family member, or counselor. You're not alone.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
