import { ContractType, ExperienceLevel, JobCategory, JobStatus } from './enums';

export type SalaryRange = {
  min: number;
  max: number;
  currency: string;
  displayText: string; // Formatted string like "$50K-$100K"
};

export type Location = {
  city?: string;
  country?: string;
  region?: string; // Can be "United States", "Europe", "Asia", etc.
  isRemote: boolean;
  displayText: string; // The full location string for display
};

/**
 * Comprehensive job type to be used across the platform
 */
export interface Job {
  id?: string;
  _id?: string;
  position: string;
  description: string;
  shortDescription?: string;
  company: {
    name: string;
    logo: string;
    website: string;
    logoBackground?: string;
  };
  // Updated to use enum types with string values for better filtering
  contract: ContractType | string;
  category?: JobCategory | string;
  experienceLevel?: ExperienceLevel | string;
  status: JobStatus | string;
  
  // Enhanced location structure for better filtering
  location: string; // Kept for backwards compatibility
  locationDetails?: Location;
  
  // Enhanced salary structure for better filtering and analytics
  salary?: string; // Kept for backwards compatibility
  salaryRange?: SalaryRange;
  
  qualifications: {
    content: string;
    items: string[];
  };
  responsibilities: {
    content: string;
    items: string[];
  };
  benefits: {
    content: string;
    items: string[];
  };
  role?: {
    content: string;
    items: string[];
  };
  
  // Enhanced metadata for filtering and analytics
  applicationDeadline?: string;
  applicants?: number;
  postedAt: string;
  applyUrl?: string;
  AppliedJobs?: any[];
  
  // Analytics-specific fields
  views?: number;
  clickThroughRate?: number;
  applicationRate?: number;
  keywords?: string[];
  tags?: string[];
}

/**
 * Minimalistic job type used for job listings
 */
export interface JobListItem {
  id: string;
  position: string;
  shortDescription?: string;
  company: {
    name: string;
    logo?: string;
    logoBackground?: string;
  };
  contract: ContractType | string;
  category?: JobCategory | string;
  experienceLevel?: ExperienceLevel | string;
  location: string;
  locationDetails?: Pick<Location, 'isRemote' | 'displayText'>;
  salary?: string;
  salaryRange?: Pick<SalaryRange, 'displayText'>;
  postedAt: string;
  description?: string;
}

// Export the original JobType as an alias to Job for backward compatibility
export type JobType = Job;