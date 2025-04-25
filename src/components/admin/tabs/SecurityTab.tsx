
import React from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { useToast } from '@/hooks/use-toast';
import { AppSettings } from '@/utils/settingsManager';

interface SecurityTabProps {
  settings: AppSettings;
  handleUpdateCredentials: () => void;
  handleSaveSettings: (section: string) => void;
  handleResetSettingsToDefaults: () => void;
}

export const SecurityTab = ({ 
  settings, 
  handleUpdateCredentials, 
  handleSaveSettings,
  handleResetSettingsToDefaults 
}: SecurityTabProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Credentials</CardTitle>
          <CardDescription>Change your admin username and password</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="adminUsername">Username</Label>
              <Input
                id="adminUsername"
                type="text"
                defaultValue={settings.adminUsername}
                placeholder="Enter new username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adminPassword">Password</Label>
              <Input
                id="adminPassword"
                type="password"
                placeholder="Enter new password"
              />
              <p className="text-xs text-gray-500">
                Password should be at least 8 characters long for better security
              </p>
            </div>
            <Button onClick={handleUpdateCredentials} className="mt-2">
              <Save className="mr-2 h-4 w-4" />
              Update Credentials
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Default Destination</CardTitle>
          <CardDescription>Set the default destination URL when none is provided</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="defaults-form" className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="defaultDestinationUrl">Default Destination URL</Label>
              <Input
                id="defaultDestinationUrl"
                name="defaultDestinationUrl"
                type="url"
                defaultValue={settings.defaultDestinationUrl}
                placeholder="https://example.com"
              />
            </div>
            <Button type="button" onClick={() => handleSaveSettings('defaults')} className="mt-2">
              <Save className="mr-2 h-4 w-4" />
              Save Default Settings
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Reset All Settings</CardTitle>
          <CardDescription>Reset all application settings to their default values</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive"
            onClick={handleResetSettingsToDefaults}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset All Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
