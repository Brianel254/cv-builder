"use client"

import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe, Award, Book } from 'lucide-react';

const CreativeCV: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white font-sans">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">{`${data.personalInfo.firstName} ${data.personalInfo.surname}`}</h1>
        <p className="text-2xl">{data.experience[0]?.jobTitle}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>{data.personalInfo.phoneNumber}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{data.personalInfo.address}</span>
            </div>
            {data.personalInfo.linkedIn && (
              <div className="flex items-center">
                <Linkedin className="w-5 h-5 mr-2" />
                <span>{data.personalInfo.linkedIn}</span>
              </div>
            )}
            {data.personalInfo.portfolio && (
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                <span>{data.personalInfo.portfolio}</span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-3">Skills</h2>
            <div className="flex flex-wrap">
              {data.skills.technical.map((skill, index) => (
                <span key={index} className="bg-white text-purple-600 px-2 py-1 rounded-full mr-2 mb-2">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-3">About Me</h2>
            <p className="text-lg">{data.personalStatement}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-3">Experience</h2>
            {data.experience.map((job, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-2xl font-semibold">{job.jobTitle}</h3>
                <p className="text-xl">{job.company}, {job.city}, {job.country}</p>
                <p className="italic">{job.startDate} - {job.endDate}</p>
                <ul className="list-disc list-inside mt-2">
                  {job.responsibilities.split('\n').map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-3">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-2xl font-semibold">{edu.degree}</h3>
                <p className="text-xl">{edu.institution}, {edu.city}, {edu.country}</p>
                <p className="italic">{edu.startDate} - {edu.endDate}</p>
                <p>Field of Study: {edu.fieldOfStudy}</p>
              </div>
            ))}
          </section>

          {data.certifications.length > 0 && (
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-3">Certifications</h2>
              <ul className="list-none">
                {data.certifications.map((cert, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <Award className="w-5 h-5 mr-2" />
                    <span>{cert.name} - {cert.organization} ({cert.dateReceived})</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeCV;