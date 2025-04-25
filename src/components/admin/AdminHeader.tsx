
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { Button } from '../ui/button';

interface AdminHeaderProps {
  handleLogout: () => void;
}

export const AdminHeader = ({ handleLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-white rounded-xl p-6 shadow-md mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-redirector-dark mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your redirection service settings</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Button onClick={handleLogout} variant="outline">
            <Lock className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Exit Admin
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
