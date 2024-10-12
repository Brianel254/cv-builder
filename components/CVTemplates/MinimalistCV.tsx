"use client"

import React from 'react';
import { CVData } from '@/types/cv';

const MinimalistCV: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-light mb-2">{`${data.personalInfo.firstName} ${data.personalInfo.surname}`}</h1>
        <p className="text-xl text-gray-600">{data.experience[0]?.jobTitle}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-3 border-b border-gray-200 pb-1">Experience</h2>
            {data.experience.map((job, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-normal">{job.jobTitle}</h3>
                <p className="text-gray-600">{job.company}, {job.city}, {job.country}</p>
                <p className="text-gray-500">{job.startDate} - {job.endDate}</p>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {job.responsibilities.split('\n').map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-3 border-b border-gray-200 pb-1">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-normal">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}, {edu.city}, {edu.country}</p>
                <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                <p className="text-gray-700">Field of Study: {edu.fieldOfStudy}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-1">
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-3 border-b border-gray-200 pb-1">Contact</h2>
            <p>{data.personalInfo.email}</p>
            <p>{data.personalInfo.phoneNumber}</p>
            <p>{data.personalInfo.address}</p>
            {data.personalInfo.linkedIn && <p>{data.personalInfo.linkedIn}</p>}
            {data.personalInfo.portfolio && <p>{data.personalInfo.portfolio}</p>}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-3 border-b border-gray-200 pb-1">Skills</h2>
            <ul className="list-none">
              {data.skills.technical.map((skill, index) => (
                <li key={index} className="mb-1">{skill}</li>
              ))}
            </ul>
          </section>

          {data.certifications.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-light mb-3 border-b border-gray-200 pb-1">Certifications</h2>
              <ul className="list-none">
                {data.certifications.map((cert, index) => (
                  <li key={index} className="mb-1">{cert.name} - {cert.organization}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalistCV;