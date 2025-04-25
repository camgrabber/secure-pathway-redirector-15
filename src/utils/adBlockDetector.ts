
// Advanced ad blocker detection with multiple reliable detection methods
export const checkForAdBlocker = async (): Promise<boolean> => {
  try {
    console.log("Running enhanced adblock detection...");
    
    // Method 1: Create and check bait elements with known ad blocker targets
    const adClassNames = [
      'ad-slot', 'adsbygoogle', 'ad-container', 'adsbox', 'ad-placement'
    ];
    
    let baitElementsBlocked = 0;
    for (const className of adClassNames) {
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = className;
      testAd.style.height = '1px';
      testAd.style.position = 'absolute';
      testAd.style.bottom = '-1px';
      testAd.style.opacity = '0';
      document.body.appendChild(testAd);
      
      // Store references to remove later
      setTimeout(() => {
        if (document.body.contains(testAd)) {
          document.body.removeChild(testAd);
        }
      }, 500);
      
      // Check if element is hidden or altered
      const elemResult = !testAd.offsetHeight || 
                        window.getComputedStyle(testAd).display === 'none' || 
                        window.getComputedStyle(testAd).visibility === 'hidden';
      
      if (elemResult) {
        console.log(`Adblock detected: Bait element '${className}' was hidden`);
        baitElementsBlocked++;
      }
    }
    
    // Method 2: Try to fetch known ad network resources
    const adUrls = [
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      'https://securepubads.g.doubleclick.net/tag/js/gpt.js'
    ];
    
    let fetchesBlocked = 0;
    try {
      const fetchPromises = adUrls.map(url => {
        return fetch(url, { 
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache',
          signal: AbortSignal.timeout(2000)
        })
        .then(() => false)
        .catch((error) => {
          console.log(`Ad fetch blocked for ${url}: ${error.message}`);
          fetchesBlocked++;
          return true; // Fetch was blocked
        });
      });
      
      await Promise.all(fetchPromises);
    } catch (e) {
      console.log('Network fetch error in ad detection - continuing with bait element results');
    }
    
    // Check if any detection method found an adblocker
    const isAdBlockerDetected = baitElementsBlocked >= 2 || fetchesBlocked >= 1;
    console.log(`Final adblock detection result: ${isAdBlockerDetected ? "BLOCKED" : "NOT BLOCKED"}`);
    console.log(`Bait elements blocked: ${baitElementsBlocked}, Fetches blocked: ${fetchesBlocked}`);
    
    return isAdBlockerDetected;
  } catch (e) {
    console.error('Error in enhanced adblock detection:', e);
    // If there's an error, there's a higher chance an adblocker is causing it
    return true;
  }
};
