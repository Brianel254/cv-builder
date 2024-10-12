export interface CVData {
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