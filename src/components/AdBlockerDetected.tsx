
import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { useSettingsManager } from '../utils/settingsManager';

export const AdBlockerDetected = () => {
  const [isReloading, setIsReloading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { settings } = useSettingsManager();
  
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg border border-redirector-primary/20 rounded-xl shadow-2xl overflow-hidden animate-scale">
        <div className="p-6 bg-gradient-to-r from-redirector-primary/10 to-redirector-accent/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-redirector-primary" />
              <h3 className="text-lg font-bold text-redirector-dark">
                {settings.adBlockTitle}
              </h3>
            </div>
            <button 
              onClick={handleDismiss}
              className="text-gray-500 hover:text-redirector-dark transition-colors"
              aria-label={settings.adBlockDismissButtonText}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-sm text-gray-700 mb-4">
            {settings.adBlockDescription}
          </p>
          
          <div className="flex space-x-3">
            <Button 
              onClick={handleReload} 
              className="w-full bg-redirector-primary text-white hover:bg-redirector-primary/90 transition-colors"
              disabled={isReloading}
            >
              {isReloading ? 'Reloading...' : settings.adBlockReloadButtonText}
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 text-xs text-gray-500 border-t border-gray-200 text-center">
          {settings.adBlockHelpText} <a href={settings.adBlockHelpLink} className="text-redirector-primary hover:underline">Ad Blocking Guide</a>
        </div>
      </div>
    </div>
  );
};
