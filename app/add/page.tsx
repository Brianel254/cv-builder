"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AddPage() {
  const [profileName, setProfileName] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (profileName.trim()) {
      // Save the profile name to localStorage
      const profiles = JSON.parse(localStorage.getItem('cvProfiles') || '[]');
      profiles.push({ id: Date.now(), name: profileName.trim() });
      localStorage.setItem('cvProfiles', JSON.stringify(profiles));

      // Redirect to the CV form page
      router.push(`/profiles/${profiles[profiles.length - 1].id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
      <p className="text-lg mb-8">Let's start by creating a new profile for your CV</p>
      <div className="flex items-center space-x-2 w-full max-w-md">
        <Input
          type="text"
          placeholder="New profile name"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleStart}>Start</Button>
      </div>
    </div>
  );
}