import { Home, PenLine, Timer, BarChart3, Wind, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/vent", icon: PenLine, label: "Vent" },
  { path: "/focus", icon: Timer, label: "Focus" },
  { path: "/breathe", icon: Wind, label: "Breathe" },
  { path: "/insights", icon: BarChart3, label: "Insights" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around max-w-lg mx-auto h-16">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="relative flex flex-col items-center gap-0.5 px-2 py-2"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-px left-1 right-1 h-0.5 gradient-calm rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={18}
                className={active ? "text-primary" : "text-muted-foreground"}
              />
              <span
                className={`text-[10px] font-medium ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
