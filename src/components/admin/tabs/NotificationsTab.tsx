
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { AppSettings } from '@/utils/settingsManager';

interface NotificationsTabProps {
  settings: AppSettings;
  handleSaveSettings: (section: string) => void;
}

export const NotificationsTab = ({ settings, handleSaveSettings }: NotificationsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ad Blocker Notification</CardTitle>
        <CardDescription>Customize the ad blocker detection message</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="notifications-form" className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="adBlockTitle">Title</Label>
              <Input
                id="adBlockTitle"
                name="adBlockTitle"
                defaultValue={settings.adBlockTitle}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="adBlockDescription">Description</Label>
              <Textarea
                id="adBlockDescription"
                name="adBlockDescription"
                defaultValue={settings.adBlockDescription}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="adBlockReloadButtonText">Reload Button Text</Label>
              <Input
                id="adBlockReloadButtonText"
                name="adBlockReloadButtonText"
                defaultValue={settings.adBlockReloadButtonText}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="adBlockHelpText">Help Text</Label>
              <Input
                id="adBlockHelpText"
                name="adBlockHelpText"
                defaultValue={settings.adBlockHelpText}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="adBlockHelpLink">Help Link</Label>
              <Input
                id="adBlockHelpLink"
                name="adBlockHelpLink"
                defaultValue={settings.adBlockHelpLink}
              />
            </div>
          </div>
          
          <Button type="button" onClick={() => handleSaveSettings('notifications')} className="mt-4">
            <Save className="mr-2 h-4 w-4" />
            Save Notification Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
