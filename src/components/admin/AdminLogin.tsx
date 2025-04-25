
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  loginForm: { username: string; password: string };
  setLoginForm: React.Dispatch<React.SetStateAction<{ username: string; password: string }>>;
  handleLogin: () => void;
}

export const AdminLogin = ({ loginForm, setLoginForm, handleLogin }: AdminLoginProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-redirector-primary/10 rounded-full mb-4">
            <Lock className="w-8 h-8 text-redirector-primary" />
          </div>
          <h1 className="text-2xl font-bold">Admin Access</h1>
          <p className="text-gray-600 mt-2">Enter credentials to access admin panel</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="admin-username">Username</Label>
            <Input 
              id="admin-username"
              type="text" 
              placeholder="Enter username" 
              value={loginForm.username} 
              onChange={e => setLoginForm({...loginForm, username: e.target.value})}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="admin-password">Password</Label>
            <Input 
              id="admin-password"
              type="password" 
              placeholder="Enter password" 
              value={loginForm.password} 
              onChange={e => setLoginForm({...loginForm, password: e.target.value})}
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full"
          >
            Login
          </Button>
          
          <div className="text-center pt-4">
            <Link to="/" className="text-redirector-primary hover:underline text-sm">
              <ArrowLeft className="inline h-4 w-4 mr-1" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
