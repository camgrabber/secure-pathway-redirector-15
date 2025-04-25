
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Type, Clock, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { useAdManager } from '../utils/adManager';
import { useSettingsManager } from '../utils/settingsManager';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminHeader } from '../components/admin/AdminHeader';
import { SecurityTab } from '../components/admin/tabs/SecurityTab';
import { SeoTab } from '../components/admin/tabs/SeoTab';
import { NotificationsTab } from '../components/admin/tabs/NotificationsTab';

const Admin = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const { toast } = useToast();
  const { settings, updateSettings, resetToDefaults: resetSettingsToDefaults, verifyAdminCredentials, isLoaded } = useSettingsManager();
  
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
      setAuthenticated(true);
    }
  }, []);
  
  const handleLogin = () => {
    if (isLoaded && verifyAdminCredentials(loginForm.username, loginForm.password)) {
      setAuthenticated(true);
      sessionStorage.setItem('adminLoggedIn', 'true');
    } else {
      toast({
        title: 'Authentication Failed',
        description: 'Incorrect username or password',
        variant: 'destructive',
      });
    }
  };
  
  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };
  
  const handleUpdateCredentials = () => {
    const newUsername = (document.getElementById('adminUsername') as HTMLInputElement)?.value;
    const newPassword = (document.getElementById('adminPassword') as HTMLInputElement)?.value;
    
    if (!newUsername || !newPassword) {
      toast({
        title: 'Validation Error',
        description: 'Username and password cannot be empty',
        variant: 'destructive',
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: 'Security Warning',
        description: 'Password should be at least 8 characters long',
        variant: 'destructive',
      });
      return;
    }
    
    updateSettings({
      adminUsername: newUsername,
      adminPassword: newPassword,
    });
    
    toast({
      title: 'Credentials Updated',
      description: 'Admin credentials have been successfully updated',
    });
  };
  
  const handleSaveSettings = (section: string) => {
    const formElement = document.getElementById(`${section}-form`) as HTMLFormElement;
    if (!formElement) return;
    
    const formData = new FormData(formElement);
    const updates: Record<string, string | number> = {};
    
    formData.forEach((value, key) => {
      if (value instanceof File) return;
      
      if (key.includes('Seconds') || key.includes('Duration')) {
        const numValue = parseInt(value as string, 10);
        updates[key] = isNaN(numValue) ? 0 : numValue;
      } else {
        updates[key] = value as string;
      }
    });
    
    updateSettings(updates);
    
    toast({
      title: 'Settings Saved',
      description: `${section.charAt(0).toUpperCase() + section.slice(1)} settings have been updated`,
    });
  };

  if (!authenticated) {
    return (
      <AdminLogin 
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from

-slate-50 to-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <AdminHeader handleLogout={handleLogout} />
        
        <Tabs defaultValue="security" className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="security">
              <Settings className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="seo">
              <Type className="w-4 h-4 mr-2" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Settings className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="security" className="mt-0">
            <SecurityTab
              settings={settings}
              handleUpdateCredentials={handleUpdateCredentials}
              handleSaveSettings={handleSaveSettings}
              handleResetSettingsToDefaults={resetSettingsToDefaults}
            />
          </TabsContent>
          
          <TabsContent value="seo" className="mt-0">
            <SeoTab 
              settings={settings}
              handleSaveSettings={handleSaveSettings}
            />
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <NotificationsTab
              settings={settings}
              handleSaveSettings={handleSaveSettings}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
