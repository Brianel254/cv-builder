"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import TraditionalCV from '@/components/CVTemplates/TraditionalCV';
import ModernCV from '@/components/CVTemplates/ModernCV';
import CreativeCV from '@/components/CVTemplates/CreativeCV';
import MinimalistCV from '@/components/CVTemplates/MinimalistCV';
import InfographicCV from '@/components/CVTemplates/InfographicCV';
import ExecutiveCV from '@/components/CVTemplates/ExecutiveCV';
import FunctionalCV from '@/components/CVTemplates/FunctionalCV';
import { CVData } from '@/types/cv';

const cvTemplates = [
  { name: 'Traditional', component: TraditionalCV },
  { name: 'Modern', component: ModernCV },
  { name: 'Creative', component: CreativeCV },
  { name: 'Minimalist', component: MinimalistCV },
  { name: 'Infographic', component: InfographicCV },
  { name: 'Executive', component: ExecutiveCV },
  { name: 'Functional', component: FunctionalCV },
];

export default function DesignPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('Traditional');
  const [profiles, setProfiles] = useState<CVData[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<CVData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('cvProfiles') || '[]');
    setProfiles(storedProfiles);
    if (storedProfiles.length > 0) {
      setSelectedProfile(storedProfiles[0]);
    }
  }, []);

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
  };

  const handleProfileChange = (value: string) => {
    const profile = profiles.find(p => p.id.toString() === value);
    if (profile) {
      setSelectedProfile(profile);
    }
  };

  const SelectedCVComponent = cvTemplates.find(template => template.name === selectedTemplate)?.component || TraditionalCV;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Design Your CV</h1>
      
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Profile</label>
          <Select onValueChange={handleProfileChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a profile" />
            </SelectTrigger>
            <SelectContent>
              {profiles.map((profile) => (
                <SelectItem key={profile.id} value={profile.id.toString()}>
                  {profile.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Template</label>
          <Select onValueChange={handleTemplateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {cvTemplates.map((template) => (
                <SelectItem key={template.name} value={template.name}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedProfile && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <SelectedCVComponent data={selectedProfile} />
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end mt-8">
        <Button onClick={() => router.push('/profiles')}>Back to Profiles</Button>
      </div>
    </div>
  );
}