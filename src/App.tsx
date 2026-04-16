import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ParticleField from "./components/ParticleField";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Contact = lazy(() => import("./pages/Contact"));

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>}><About /></Suspense>} />
        <Route path="/experience" element={<Suspense fallback={null}><Experience /></Suspense>} />
        <Route path="/projects" element={<Suspense fallback={null}><Projects /></Suspense>} />
        <Route path="/skills" element={<Suspense fallback={null}><Skills /></Suspense>} />
        <Route path="/certifications" element={<Suspense fallback={null}><Certifications /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={null}><Contact /></Suspense>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <LoadingScreen onDone={() => setLoaded(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="animated-gradient-bg min-h-screen custom-cursor">
            <CustomCursor />
            <ParticleField />
            <ScrollProgress />
            <Navbar />
            <main className="relative z-10">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
