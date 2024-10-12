"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Box, Edit, Pin, Trash } from 'lucide-react';

interface Profile {
  id: number;
  name: string;
  dateAdded: string;
  pinned: boolean;
}

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('cvProfiles') || '[]');
    setProfiles(storedProfiles);
  }, []);

  const handleDelete = (id: number) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== id);
    setProfiles(updatedProfiles);
    localStorage.setItem('cvProfiles', JSON.stringify(updatedProfiles));
  };

  const handlePin = (id: number) => {
    const updatedProfiles = profiles.map(profile =>
      profile.id === id ? { ...profile, pinned: !profile.pinned } : profile
    );
    setProfiles(updatedProfiles);
    localStorage.setItem('cvProfiles', JSON.stringify(updatedProfiles));
  };

  const pinnedProfiles = profiles.filter(profile => profile.pinned);
  const unpinnedProfiles = profiles.filter(profile => !profile.pinned);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Profiles</h1>
      
      {profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-muted rounded-lg">
          <Box className="w-16 h-16 mb-4 text-muted-foreground" />
          <p className="text-lg mb-4">No profiles yet. Create your first CV profile!</p>
          <Link href="/add" passHref>
            <Button>Add New Profile</Button>
          </Link>
        </div>
      ) : (
        <>
          {pinnedProfiles.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Pinned Profiles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pinnedProfiles.map(profile => (
                  <ProfileCard key={profile.id} profile={profile} onDelete={handleDelete} onPin={handlePin} />
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h2 className="text-xl font-semibold mb-4">All Profiles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unpinnedProfiles.map(profile => (
                <ProfileCard key={profile.id} profile={profile} onDelete={handleDelete} onPin={handlePin} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ProfileCard({ profile, onDelete, onPin }: { profile: Profile; onDelete: (id: number) => void; onPin: (id: number) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{profile.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Created on: {new Date(profile.dateAdded).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Link href={`/profiles/${profile.id}`} passHref>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </Link>
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onPin(profile.id)}>
            <Pin className={`w-4 h-4 ${profile.pinned ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(profile.id)}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}