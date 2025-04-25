
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

const queryClient = new QueryClient();

const App = () => {
  const [adBlockerDetected, setAdBlockerDetected] = useState<boolean | null>(null);
  const [checkComplete, setCheckComplete] = useState(false);

  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        console.log("Starting enhanced adblock detection check...");
        
        // Add a small delay to ensure the page is fully loaded
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Main detection check
        const isBlocked = await checkForAdBlocker();
        
        // Set the final result
        setAdBlockerDetected(isBlocked);
        console.log(`Adblock final detection result: ${isBlocked ? "BLOCKED" : "NOT BLOCKED"}`);
      } catch (error) {
        console.error("Error in adblock detection:", error);
        setAdBlockerDetected(false); // Don't assume blocked on error
      } finally {
        setCheckComplete(true);
      }
    };

    detectAdBlocker();
    
    // No need for interval checking - it can cause false positives
  }, []);

  // Check URL for bypass parameter
  const urlParams = new URLSearchParams(window.location.search);
  const bypassAdBlocker = urlParams.get('bypassAdBlockCheck') === 'true';

  if (adBlockerDetected === true && !bypassAdBlocker) {
    return <AdBlockerDetected />;
  }

  // Only render the app when check is complete
  if (checkComplete && (adBlockerDetected === false || bypassAdBlocker)) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/initial-redirect" element={<InitialRedirect />} />
              <Route path="/security-check" element={<SecurityCheck />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Show loading state while checking
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-redirector-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-600">Initializing secure pathway...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we verify your browser compatibility</p>
      </div>
    </div>
  );
};

export default App;
