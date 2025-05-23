
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    console.log("Current path:", location.pathname);
    console.log("Current hash:", location.hash);
    
    // Check if the URL contains 'admin' anywhere in the path
    if (location.pathname.includes('admin')) {
      console.log("Admin path detected, redirecting to admin panel");
      navigate('/admin', { replace: true });
      return;
    }
    
    // Otherwise redirect to initial redirect
    console.log("Redirecting to initial-redirect");
    navigate('/initial-redirect', {
      state: { url: 'https://example.com' },
      replace: true
    });
  }, [navigate, location]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-redirector-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-600">Initializing Secure Redirect...</p>
      </div>
    </div>
  );
};

export default Index;
