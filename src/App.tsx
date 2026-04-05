import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import VentPage from "./pages/VentPage";
import VentHistoryPage from "./pages/VentHistoryPage";
import FocusPage from "./pages/FocusPage";
import InsightsPage from "./pages/InsightsPage";
import BreathePage from "./pages/BreathePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("ventup-theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <AnimatePresence>
          {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
        </AnimatePresence>
        {!showSplash && (
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/vent" element={<VentPage />} />
                <Route path="/vent-history" element={<VentHistoryPage />} />
                <Route path="/focus" element={<FocusPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/breathe" element={<BreathePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <BottomNav />
            </div>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
