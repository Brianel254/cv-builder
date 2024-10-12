"use client"

import React from 'react';
import { CVData } from '@/types/cv';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const InfographicCV: React.FC<{ data: CVData }> = ({ data }) => {
  const skillsData = data.skills.technical.map((skill, index) => ({
    name: skill,
    value: 100 - index * 10, // Just for visualization, adjust as needed
  }));

  const experienceData = data.experience.map(job => ({
    name: job.company,
    years: calculateYears(job.startDate, job.endDate),
  }));

  function calculateYears(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 text-gray-800 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{`${data.personalInfo.firstName} ${data.personalInfo.surname}`}</h1>
        <p className="text-xl text-gray-600">{data.experience[0]?.jobTitle}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {skillsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={experienceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="years" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>

        <div>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-lg">{data.personalStatement}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p>{edu.institution}, {edu.city}, {edu.country}</p>
                <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p>{data.personalInfo.email}</p>
            <p>{data.personalInfo.phoneNumber}</p>
            <p>{data.personalInfo.address}</p>
            {data.personalInfo.linkedIn && <p>{data.personalInfo.linkedIn}</p>}
            {data.personalInfo.portfolio && <p>{data.personalInfo.portfolio}</p>}
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfographicCV;