
// Advanced ad blocker detection with multiple reliable detection methods
export const checkForAdBlocker = async (): Promise<boolean> => {
  try {
    console.log("Running enhanced adblock detection...");
    
    const results: boolean[] = [];
    
    // Method 1: Create and check bait elements with known ad blocker targets
    // Using fewer class names to reduce false positives
    const adClassNames = [
      'ad-slot', 'adsbygoogle', 'ad-container'
    ];
    
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
        results.push(true);
      }
    }
    
    // Method 2: Try to fetch known ad network resources
    // Using fewer URLs to reduce false positives
    const adUrls = [
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    ];
    
    try {
      const fetchPromises = adUrls.map(url => {
        return fetch(url, { 
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache',
          signal: AbortSignal.timeout(1000)
        })
        .then(() => false)
        .catch((error) => {
          console.log(`Ad fetch blocked for ${url}: ${error.message}`);
          return true; // Fetch was blocked
        });
      });
      
      const fetchResults = await Promise.all(fetchPromises);
      const isAnyFetchBlocked = fetchResults.some(result => result === true);
      
      if (isAnyFetchBlocked) {
        console.log('Adblock detected: Ad resource fetch was blocked');
        results.push(true);
      }
    } catch (e) {
      // Don't count network errors as ad blocking
      console.log('Network fetch error in ad detection - skipping this check');
    }
    
    // Final check: Need at least 2 positive detections to confirm ad blocker
    // This helps prevent false positives
    const isAdBlockerDetected = results.length >= 2;
    console.log(`Final adblock detection result: ${isAdBlockerDetected ? "BLOCKED" : "NOT BLOCKED"}`);
    return isAdBlockerDetected;
  } catch (e) {
    console.error('Error in enhanced adblock detection:', e);
    return false; // Don't assume blocker exists if there's an error
  }
};
