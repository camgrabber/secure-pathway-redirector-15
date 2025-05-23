import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import RedirectLayout from '../components/RedirectLayout';
import ProgressBar from '../components/ProgressBar';
import CountdownTimer from '../components/CountdownTimer';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import AdUnit from '../components/AdUnit';
import { useAdManager } from '../utils/adManager';
import { useSettingsManager } from '../utils/settingsManager';

const InitialRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);
  const [destinationUrl, setDestinationUrl] = useState('');
  const { getActiveAdsByPosition } = useAdManager();
  const { settings } = useSettingsManager();
  const middleAds = getActiveAdsByPosition('middle');
  
  useEffect(() => {
    // Extract the destination URL from state or use default
    const stateUrl = location.state?.url;
    
    if (stateUrl) {
      try {
        setDestinationUrl(stateUrl);
      } catch (e) {
        console.error('Invalid URL:', e);
        toast({
          title: 'Error',
          description: 'Invalid URL provided.',
          variant: 'destructive',
        });
        setDestinationUrl(settings.defaultDestinationUrl);
      }
    } else {
      setDestinationUrl(settings.defaultDestinationUrl);
    }
  }, [location.state, toast, settings.defaultDestinationUrl]);

  const handleProgressComplete = () => {
    setLoadingComplete(true);
  };

  const handleTimerComplete = () => {
    setTimerComplete(true);
  };

  const handleContinue = () => {
    // Use state to pass the URL instead of query parameters
    navigate('/security-check', { state: { url: destinationUrl } });
  };

  return (
    <RedirectLayout 
      title={settings.initialTitle} 
      subtitle={settings.initialSubtitle}
    >
      <div className="space-y-8">
        <ProgressBar 
          duration={3000} 
          onComplete={handleProgressComplete}
          label="Loading Link..."
        />
        
        {loadingComplete && (
          <div className="space-y-8 animate-fade-in">
            {middleAds.length > 0 && (
              <div className="my-4">
                {middleAds.map(ad => (
                  <AdUnit key={ad.id} code={ad.code} />
                ))}
              </div>
            )}
            
            <CountdownTimer 
              seconds={settings.initialTimerSeconds} 
              onComplete={handleTimerComplete}
            />
            
            {timerComplete && (
              <div className="text-center animate-fade-in">
                <Button 
                  onClick={handleContinue}
                  className="px-8 py-6 text-lg bg-gradient-to-r from-redirector-primary to-redirector-primary-dark hover:opacity-90 transition-opacity animate-pulse"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  {settings.initialButtonText}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </RedirectLayout>
  );
};

export default InitialRedirect;
