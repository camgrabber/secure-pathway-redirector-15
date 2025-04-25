
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import InitialRedirect from "./pages/InitialRedirect";
import SecurityCheck from "./pages/SecurityCheck";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import { AdBlockerDetected } from "./components/AdBlockerDetected";
import { checkForAdBlocker } from "./utils/adBlockDetector";
import { useToast } from "./hooks/use-toast";

const queryClient = new QueryClient();

const App = () => {
  const [adBlockerDetected, setAdBlockerDetected] = useState<boolean | null>(null);
  const [checkComplete, setCheckComplete] = useState(false);

  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        // Check for bypass flag in session storage
        if (sessionStorage.getItem('bypassAdBlockCheck') === 'true') {
          console.log("Adblock check bypassed by user");
          setAdBlockerDetected(false);
          setCheckComplete(true);
          return;
        }
        
        console.log("Starting enhanced adblock detection check...");
        
        // Run the check
        const isBlocked = await checkForAdBlocker();
        
        // Update state based on check results
        setAdBlockerDetected(isBlocked);
        console.log(`Adblock final detection result: ${isBlocked ? "BLOCKED" : "NOT BLOCKED"}`);
        
        // Store the result in sessionStorage to ensure consistent behavior during page navigation
        if (isBlocked) {
          sessionStorage.setItem('adBlockerDetected', 'true');
        } else {
          sessionStorage.removeItem('adBlockerDetected');
        }
      } catch (error) {
        console.error("Error in adblock detection:", error);
        // Assume blocked on errors for safety
        setAdBlockerDetected(true);
        sessionStorage.setItem('adBlockerDetected', 'true');
      } finally {
        setCheckComplete(true);
      }
    };

    // Check for stored adBlocker status first for consistent behavior
    const storedAdBlockerStatus = sessionStorage.getItem('adBlockerDetected');
    if (storedAdBlockerStatus === 'true') {
      setAdBlockerDetected(true);
      setCheckComplete(true);
    } else {
      detectAdBlocker();
    }
    
  }, []);

  // Wrap everything in BrowserRouter to make sure we have proper routing context
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {adBlockerDetected === true ? (
            <AdBlockerDetected />
          ) : checkComplete && adBlockerDetected === false ? (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/initial-redirect" element={<InitialRedirect />} />
              <Route path="/security-check" element={<SecurityCheck />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-redirector-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg font-medium text-gray-600">Initializing secure pathway...</p>
                <p className="text-sm text-gray-500 mt-2">Please wait while we verify your browser compatibility</p>
              </div>
            </div>
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
