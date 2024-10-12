"use client"

import { useParams } from 'next/navigation';
import CVForm from '@/components/CVForm';

export default function EditProfilePage() {
  const params = useParams();
  const profileId = parseInt(params.id as string, 10);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <CVForm profileId={profileId} />
    </div>
  );
}