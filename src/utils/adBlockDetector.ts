
// Advanced ad blocker detection with multiple reliable detection methods
export const checkForAdBlocker = async (): Promise<boolean> => {
  try {
    console.log("Running enhanced adblock detection...");
    
    // Method 1: Create and check a single bait element
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.height = '1px';
    testAd.style.position = 'absolute';
    testAd.style.bottom = '-1px';
    document.body.appendChild(testAd);
    
    // Add a delay to allow ad blockers to process
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Check if element is hidden or altered
    const elemHidden = !testAd.offsetHeight || 
                      window.getComputedStyle(testAd).display === 'none' || 
                      window.getComputedStyle(testAd).visibility === 'hidden';
    
    // Clean up
    if (document.body.contains(testAd)) {
      document.body.removeChild(testAd);
    }
    
    if (elemHidden) {
      console.log('Adblock detected: Bait element was hidden');
      return true;
    }
    
    // Method 2: Try to fetch a known ad network resource
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 500);
      
      const response = await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      // If we reach here, fetch was successful (no adblock)
      return false;
    } catch (error) {
      console.log('Ad fetch blocked:', error.message);
      return true; // Fetch was blocked
    }
    
  } catch (e) {
    console.error('Error in adblock detection:', e);
    return false; // Don't assume blocker exists if there's an error
  }
};
