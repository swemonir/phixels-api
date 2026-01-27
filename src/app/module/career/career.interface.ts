export type TCareer = {
  jobTitle: string;
  jobType: 'Full-time' | 'Part-time' | 'Remote' | 'Contract' | 'Internship';
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange?: string;
  deadline?: Date;
  applicationLink?: string;
  applicationEmail?: string;
  isDeleted?: boolean;
};
