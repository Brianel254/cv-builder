"use client"

import React from 'react';
import { CVData } from '@/types/cv';

const TraditionalCV: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{`${data.personalInfo.firstName} ${data.personalInfo.middleName} ${data.personalInfo.surname}`}</h1>
        <p>{data.personalInfo.email} | {data.personalInfo.phoneNumber}</p>
        <p>{data.personalInfo.address}</p>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-3">Professional Summary</h2>
        <p>{data.personalStatement}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-3">Work Experience</h2>
        {data.experience.map((job, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">{job.jobTitle}</h3>
            <p>{job.company}, {job.city}, {job.country}</p>
            <p className="italic">{job.startDate} - {job.endDate}</p>
            <ul className="list-disc list-inside">
              {job.responsibilities.split('\n').map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-3">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">{edu.degree}</h3>
            <p>{edu.institution}, {edu.city}, {edu.country}</p>
            <p className="italic">{edu.startDate} - {edu.endDate}</p>
            <p>Field of Study: {edu.fieldOfStudy}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-3">Skills</h2>
        <ul className="list-disc list-inside">
          {data.skills.technical.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      {data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-3">Certifications</h2>
          <ul className="list-disc list-inside">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert.name} - {cert.organization} ({cert.dateReceived})</li>
            ))}
          </ul>
        </section>
      )}

      {data.references.length > 0 && (
        <section>
          <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-3">References</h2>
          <p>Available upon request</p>
        </section>
      )}
    </div>
  );
};

export default TraditionalCV;