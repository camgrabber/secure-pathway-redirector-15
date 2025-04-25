
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { AppSettings } from '@/utils/settingsManager';

interface SeoTabProps {
  settings: AppSettings;
  handleSaveSettings: (section: string) => void;
}

export const SeoTab = ({ settings, handleSaveSettings }: SeoTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <CardDescription>Optimize your site for search engines</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="seo-form" className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="siteTitle">Site Title</Label>
              <Input
                id="siteTitle"
                name="siteTitle"
                defaultValue={settings.siteTitle}
                placeholder="Your site title"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="siteDescription">Meta Description</Label>
              <Textarea
                id="siteDescription"
                name="siteDescription"
                defaultValue={settings.siteDescription}
                placeholder="Brief description of your site"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="siteKeywords">Meta Keywords</Label>
              <Input
                id="siteKeywords"
                name="siteKeywords"
                defaultValue={settings.siteKeywords}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="ogImage">OG Image URL</Label>
              <Input
                id="ogImage"
                name="ogImage"
                type="url"
                defaultValue={settings.ogImage}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="twitterHandle">Twitter Handle</Label>
              <Input
                id="twitterHandle"
                name="twitterHandle"
                defaultValue={settings.twitterHandle}
                placeholder="@youraccount"
              />
            </div>
          </div>
          
          <Button type="button" onClick={() => handleSaveSettings('seo')} className="mt-4">
            <Save className="mr-2 h-4 w-4" />
            Save SEO Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
