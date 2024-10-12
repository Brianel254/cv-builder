"use client"

import React from 'react';
import { CVData } from '@/types/cv';

const ExecutiveCV: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 text-gray-800 font-serif">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{`${data.personalInfo.firstName} ${data.personalInfo.middleName} ${data.personalInfo.surname}`}</h1>
        <p className="text-xl text-gray-600">{data.experience[0]?.jobTitle}</p>
        <div className="mt-4 text-sm">
          <p>{data.personalInfo.email} | {data.personalInfo.phoneNumber}</p>
          <p>{data.personalInfo.address}</p>
          {data.personalInfo.linkedIn && <p>{data.personalInfo.linkedIn}</p>}
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300">Executive Summary</h2>
        <p className="text-lg leading-relaxed">{data.personalStatement}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300">Professional Experience</h2>
        {data.experience.map((job, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
            <p className="text-lg font-medium">{job.company}, {job.city}, {job.country}</p>
            <p className="text-gray-600 italic">{job.startDate} - {job.endDate}</p>
            <ul className="list-disc list-inside mt-2">
              {job.responsibilities.split('\n').map((resp, i) => (
                <li key={i} className="text-base">{resp}</li>
              ))}
            </ul>
            {job.achievements && (
              <div className="mt-2">
                <p className="font-medium">Key Achievements:</p>
                <p className="text-base">{job.achievements}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">{edu.degree}</h3>
            <p className="text-lg">{edu.institution}, {edu.city}, {edu.country}</p>
            <p className="text-gray-600 italic">{edu.startDate} - {edu.endDate}</p>
            <p>Field of Study: {edu.fieldOfStudy}</p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300">Core Competencies</h2>
        <ul className="list-disc list-inside grid grid-cols-2 gap-2">
          {data.skills.technical.concat(data.skills.soft).map((skill, index) => (
            <li key={index} className="text-base">{skill}</li>
          ))}
        </ul>
      </section>

      {data.certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300">Professional Certifications</h2>
          <ul className="list-disc list-inside">
            {data.certifications.map((cert, index) => (
              <li key={index} className="text-base">{cert.name} - {cert.organization} ({cert.dateReceived})</li>
            ))}
          </ul>
        </section>
      )}

      {data.awards.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300">Awards and Honors</h2>
          <ul className="list-disc list-inside">
            {data.awards.map((award, index) => (
              <li key={index} className="text-base">
                {award.title} - {award.organization} ({award.dateReceived})
                <p className="ml-4 text-sm">{award.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ExecutiveCV;