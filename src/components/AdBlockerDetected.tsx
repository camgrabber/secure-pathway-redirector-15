
import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Button } from './ui/button';

export const AdBlockerDetected = () => {
  const [isReloading, setIsReloading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white/90 backdrop-blur-lg border border-redirector-primary/20 rounded-xl shadow-2xl overflow-hidden animate-scale">
        <div className="p-6 bg-gradient-to-r from-redirector-primary/10 to-redirector-accent/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-redirector-primary" />
              <h3 className="text-lg font-bold text-redirector-dark">Ad Blocker Detected</h3>
            </div>
            <button 
              onClick={handleDismiss}
              className="text-gray-500 hover:text-redirector-dark transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-sm text-gray-700 mb-4">
            This site requires ad capability to function properly. Please disable your ad blocker or whitelist this site.
          </p>
          
          <div className="flex space-x-3">
            <Button 
              onClick={handleReload} 
              className="w-full bg-redirector-primary text-white hover:bg-redirector-primary/90 transition-colors"
              disabled={isReloading}
            >
              {isReloading ? 'Reloading...' : 'Reload with Ads Enabled'}
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 text-xs text-gray-500 border-t border-gray-200 text-center">
          Need help? Check our <a href="#" className="text-redirector-primary hover:underline">Ad Blocking Guide</a>
        </div>
      </div>
    </div>
  );
};
