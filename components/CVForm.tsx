"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CVData {
  id: number;
  name: string;
  personalInfo: {
    firstName: string;
    middleName: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    linkedIn: string;
    portfolio: string;
  };
  personalStatement: string;
  education: Array<{
    institution: string;
    city: string;
    country: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
  }>;
  experience: Array<{
    jobTitle: string;
    company: string;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
    achievements: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  certifications: Array<{
    name: string;
    organization: string;
    dateReceived: string;
  }>;
  awards: Array<{
    title: string;
    organization: string;
    dateReceived: string;
    description: string;
  }>;
  references: Array<{
    name: string;
    jobTitle: string;
    company: string;
    contact: string;
  }>;
}

export default function CVForm({ profileId }: { profileId: number }) {
  const router = useRouter();
  const [cvData, setCVData] = useState<CVData>({
    id: profileId,
    name: '',
    personalInfo: {
      firstName: '',
      middleName: '',
      surname: '',
      address: '',
      phoneNumber: '',
      email: '',
      linkedIn: '',
      portfolio: '',
    },
    personalStatement: '',
    education: [{ institution: '', city: '', country: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
    experience: [{ jobTitle: '', company: '', city: '', country: '', startDate: '', endDate: '', responsibilities: '', achievements: '' }],
    skills: { technical: [], soft: [], languages: [] },
    certifications: [{ name: '', organization: '', dateReceived: '' }],
    awards: [{ title: '', organization: '', dateReceived: '', description: '' }],
    references: [{ name: '', jobTitle: '', company: '', contact: '' }],
  });

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('cvProfiles') || '[]');
    const currentProfile = storedProfiles.find((profile: any) => profile.id === profileId);
    if (currentProfile) {
      setCVData(prevData => ({ ...prevData, ...currentProfile }));
    }
  }, [profileId]);

  const handleInputChange = (section: string, field: string, value: string) => {
    setCVData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section as keyof CVData],
        [field]: value,
      },
    }));
  };

  const handleArrayInputChange = (section: string, index: number, field: string, value: string) => {
    setCVData(prevData => ({
      ...prevData,
      [section]: prevData[section as keyof CVData].map((item: any, i: number) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddItem = (section: string) => {
    setCVData(prevData => ({
      ...prevData,
      [section]: [...prevData[section as keyof CVData], {}],
    }));
  };

  const handleRemoveItem = (section: string, index: number) => {
    setCVData(prevData => ({
      ...prevData,
      [section]: prevData[section as keyof CVData].filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedProfiles = JSON.parse(localStorage.getItem('cvProfiles') || '[]');
    const updatedProfiles = storedProfiles.map((profile: any) =>
      profile.id === profileId ? { ...profile, ...cvData } : profile
    );
    localStorage.setItem('cvProfiles', JSON.stringify(updatedProfiles));
    router.push('/profiles');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{cvData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={cvData.personalInfo.firstName}
                    onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    value={cvData.personalInfo.middleName}
                    onChange={(e) => handleInputChange('personalInfo', 'middleName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    value={cvData.personalInfo.surname}
                    onChange={(e) => handleInputChange('personalInfo', 'surname', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={cvData.personalInfo.address}
                onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={cvData.personalInfo.phoneNumber}
                onChange={(e) => handleInputChange('personalInfo', 'phoneNumber', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="linkedIn">LinkedIn Profile</Label>
              <Input
                id="linkedIn"
                value={cvData.personalInfo.linkedIn}
                onChange={(e) => handleInputChange('personalInfo', 'linkedIn', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="portfolio">Portfolio Website</Label>
              <Input
                id="portfolio"
                value={cvData.personalInfo.portfolio}
                onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="personalStatement">Personal Statement</Label>
              <Textarea
                id="personalStatement"
                value={cvData.personalStatement}
                onChange={(e) => handleInputChange('personalStatement', '', e.target.value)}
                rows={5}
              />
            </div>

            {/* Education Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Education</h2>
              {cvData.education.map((edu, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <Input
                    placeholder="Institution Name"
                    value={edu.institution}
                    onChange={(e) => handleArrayInputChange('education', index, 'institution', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="City"
                      value={edu.city}
                      onChange={(e) => handleArrayInputChange('education', index, 'city', e.target.value)}
                    />
                    <Input
                      placeholder="Country"
                      value={edu.country}
                      onChange={(e) => handleArrayInputChange('education', index, 'country', e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleArrayInputChange('education', index, 'degree', e.target.value)}
                  />
                  <Input
                    placeholder="Field of Study"
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleArrayInputChange('education', index, 'fieldOfStudy', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      placeholder="Start Date"
                      value={edu.startDate}
                      onChange={(e) => handleArrayInputChange('education', index, 'startDate', e.target.value)}
                    />
                    <Input
                      type="date"
                      placeholder="End Date"
                      value={edu.endDate}
                      onChange={(e) => handleArrayInputChange('education', index, 'endDate', e.target.value)}
                    />
                  </div>
                  {index > 0 && (
                    <Button type="button" variant="destructive" onClick={() => handleRemoveItem('education', index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={() => handleAddItem('education')}>
                + Add Education
              </Button>
            </div>

            {/* Experience Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Professional Experience</h2>
              {cvData.experience.map((exp, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <Input
                    placeholder="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) => handleArrayInputChange('experience', index, 'jobTitle', e.target.value)}
                  />
                  <Input
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => handleArrayInputChange('experience', index, 'company', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="City"
                      value={exp.city}
                      onChange={(e) => handleArrayInputChange('experience', index, 'city', e.target.value)}
                    />
                    <Input
                      placeholder="Country"
                      value={exp.country}
                      onChange={(e) => handleArrayInputChange('experience', index, 'country', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => handleArrayInputChange('experience', index, 'startDate', e.target.value)}
                    />
                    <Input
                      type="date"
                      placeholder="End Date"
                      value={exp.endDate}
                      onChange={(e) => handleArrayInputChange('experience', index, 'endDate', e.target.value)}
                    />
                  </div>
                  <Textarea
                    placeholder="Key Responsibilities"
                    value={exp.responsibilities}
                    onChange={(e) => handleArrayInputChange('experience', index, 'responsibilities', e.target.value)}
                  />
                  <Textarea
                    placeholder="Achievements"
                    value={exp.achievements}
                    onChange={(e) => handleArrayInputChange('experience', index, 'achievements', e.target.value)}
                  />
                  {index > 0 && (
                    <Button type="button" variant="destructive" onClick={() => handleRemoveItem('experience', index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={() => handleAddItem('experience')}>
                + Add Experience
              </Button>
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Skills</h2>
              <div className="space-y-2">
                <Label htmlFor="technicalSkills">Technical Skills</Label>
                <Input
                  id="technicalSkills"
                  placeholder="Add technical skills (comma-separated)"
                  value={cvData.skills.technical.join(', ')}
                  onChange={(e) => handleInputChange('skills', 'technical', e.target.value.split(', '))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="softSkills">Soft Skills</Label>
                <Input
                  id="softSkills"
                  placeholder="Add soft skills (comma-separated)"
                  value={cvData.skills.soft.join(', ')}
                  onChange={(e) => handleInputChange('skills', 'soft', e.target.value.split(', '))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="languages">Languages</Label>
                <Input
                  id="languages"
                  placeholder="Add languages (comma-separated)"
                  value={cvData.skills.languages.join(', ')}
                  onChange={(e) => handleInputChange('skills', 'languages', e.target.value.split(', '))}
                />
              </div>
            </div>

            {/* Certifications Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Certifications and Training</h2>
              {cvData.certifications.map((cert, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <Input
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => handleArrayInputChange('certifications', index, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Issuing Organization"
                    value={cert.organization}
                    onChange={(e) => handleArrayInputChange('certifications', index, 'organization', e.target.value)}
                  />
                  <Input
                    type="date"
                    placeholder="Date Received"
                    value={cert.dateReceived}
                    onChange={(e) => handleArrayInputChange('certifications', index, 'dateReceived', e.target.value)}
                  />
                  {index > 0 && (
                    <Button type="button" variant="destructive" onClick={() => handleRemoveItem('certifications', index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={() => handleAddItem('certifications')}>
                + Add Certification
              </Button>
            </div>

            {/* Awards Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Awards and Honors</h2>
              {cvData.awards.map((award, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <Input
                    placeholder="Award Title"
                    value={award.title}
                    onChange={(e) => handleArrayInputChange('awards', index, 'title', e.target.value)}
                  />
                  <Input
                    placeholder="Organization Name"
                    value={award.organization}
                    onChange={(e) => handleArrayInputChange('awards', index, 'organization', e.target.value)}
                  />
                  <Input
                    type="date"
                    placeholder="Date Received"
                    value={award.dateReceived}
                    onChange={(e) => handleArrayInputChange('awards', index, 'dateReceived', e.target.value)}
                  />
                  <Textarea
                    placeholder="Description"
                    value={award.description}
                    onChange={(e) => handleArrayInputChange('awards', index, 'description', e.target.value)}
                  />
                  {index > 0 && (
                    <Button type="button" variant="destructive" onClick={() => handleRemoveItem('awards', index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={() => handleAddItem('awards')}>
                + Add Award
              </Button>
            </div>

            {/* References Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">References</h2>
              {cvData.references.map((ref, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <Input
                    placeholder="Name"
                    value={ref.name}
                    onChange={(e) => handleArrayInputChange('references', index, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Job Title"
                    value={ref.jobTitle}
                    onChange={(e) => handleArrayInputChange('references', index, 'jobTitle', e.target.value)}
                  />
                  <Input
                    placeholder="Company"
                    value={ref.company}
                    onChange={(e) => handleArrayInputChange('references', index, 'company', e.target.value)}
                  />
                  <Input
                    placeholder="Contact Information"
                    value={ref.contact}
                    onChange={(e) => handleArrayInputChange('references', index, 'contact', e.target.value)}
                  />
                  {index > 0 && (
                    <Button type="button" variant="destructive" onClick={() => handleRemoveItem('references', index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={() => handleAddItem('references')}>
                + Add Reference
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">Save CV</Button>
      </div>
    </form>
  );
}