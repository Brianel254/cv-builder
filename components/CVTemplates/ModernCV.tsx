"use client"

import React from 'react';
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const ModernCV: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 font-sans">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{`${data.personalInfo.firstName} ${data.personalInfo.surname}`}</h1>
            <p className="text-xl text-gray-600">{data.experience[0]?.jobTitle}</p>
          </div>
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
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-3">Skills</h2>
            <div className="flex flex-wrap">
              {data.skills.technical.map((skill, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2 mb-2">{skill}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-2/3 p-6">
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3 text-gray-700">Professional Summary</h2>
            <p>{data.personalStatement}</p>
          </section>
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3 text-gray-700">Work Experience</h2>
            {data.experience.map((job, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                <p className="text-gray-600">{job.company}, {job.city}, {job.country}</p>
                <p className="text-gray-500 italic">{job.startDate} - {job.endDate}</p>
                <ul className="list-disc list-inside mt-2">
                  {job.responsibilities.split('\n').map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3 text-gray-700">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}, {edu.city}, {edu.country}</p>
                <p className="text-gray-500 italic">{edu.startDate} - {edu.endDate}</p>
                <p>Field of Study: {edu.fieldOfStudy}</p>
              </div>
            ))}
          </section>
          {data.certifications.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-3 text-gray-700">Certifications</h2>
              <ul className="list-disc list-inside">
                {data.certifications.map((cert, index) => (
                  <li key={index}>{cert.name} - {cert.organization} ({cert.dateReceived})</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernCV;