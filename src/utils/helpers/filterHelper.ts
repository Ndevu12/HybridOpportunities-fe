import { Job } from "../../lib/job";
import { getLocationFilterCategory, getSalaryBracket } from "./index";

/**
 * Filter interface that matches the structure used in JobFilters component
 */
export interface JobFilters {
  contract?: string;
  location?: string;
  category?: string;
  level?: string;
  salary?: string;
  remote?: boolean;
  searchQuery?: string;
  [key: string]: any;
}

/**
 * Filters jobs based on the provided criteria
 * @param jobs The list of jobs to filter
 * @param filters The filter criteria
 * @returns Filtered jobs
 */
export function filterJobs(jobs: Job[], filters: JobFilters): Job[] {
  if (!jobs || !jobs.length) return [];
  if (!filters || Object.keys(filters).length === 0) return jobs;

  return jobs.filter(job => {
    // Contract filter
    if (filters.contract && job.contract !== filters.contract) {
      return false;
    }

    // Category filter
    if (filters.category && job.category !== filters.category) {
      return false;
    }

    // Experience level filter
    if (filters.level && job.experienceLevel !== filters.level) {
      return false;
    }

    // Location filter - consider both location string and locationDetails
    if (filters.location && filters.location !== "Remote Only") {
      // First try with region or country from locationDetails
      const locationCategory = job.locationDetails 
        ? getLocationFilterCategory(job.locationDetails)
        : getLocationFilterCategory(job.location);

      if (locationCategory !== filters.location) {
        return false;
      }
    }

    // Remote filter - only show remote jobs if remote filter is active
    if (filters.remote === true) {
      const isRemote = job.locationDetails 
        ? job.locationDetails.isRemote 
        : job.location.toLowerCase().includes("remote");

      if (!isRemote) {
        return false;
      }
    }

    // Salary filter - check if job salary falls within the selected range
    if (filters.salary) {
      const salaryBracket = job.salaryRange 
        ? getSalaryBracket(job.salaryRange)
        : getSalaryBracket(job.salary);
      
      if (salaryBracket !== filters.salary) {
        return false;
      }
    }

    // Search query filter - search in position, description, company name
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const positionMatch = job.position.toLowerCase().includes(query);
      const descriptionMatch = job.description.toLowerCase().includes(query);
      const companyMatch = job.company.name.toLowerCase().includes(query);
      const keywordMatch = job.keywords?.some(keyword => 
        keyword.toLowerCase().includes(query)
      );

      if (!(positionMatch || descriptionMatch || companyMatch || keywordMatch)) {
        return false;
      }
    }

    // All filters passed
    return true;
  });
}

/**
 * Extracts unique values for filters from a collection of jobs
 * @param jobs The jobs to analyze
 * @returns An object containing possible filter values
 */
export function getFilterOptions(jobs: Job[]) {
  const options = {
    contracts: new Set<string>(),
    locations: new Set<string>(),
    categories: new Set<string>(),
    levels: new Set<string>(),
    salaries: new Set<string>(),
  };
  
  // Always include these default options
  options.locations.add("Remote Only");

  jobs.forEach(job => {
    // Contract types
    if (job.contract) options.contracts.add(job.contract as string);
    
    // Categories
    if (job.category) options.categories.add(job.category as string);
    
    // Experience levels
    if (job.experienceLevel) options.levels.add(job.experienceLevel as string);
    
    // Locations - extract regions and countries
    if (job.locationDetails) {
      const locationCategory = getLocationFilterCategory(job.locationDetails);
      if (locationCategory) options.locations.add(locationCategory);
    } else if (job.location) {
      const locationCategory = getLocationFilterCategory(job.location);
      if (locationCategory) options.locations.add(locationCategory);
    }
    
    // Salary ranges
    if (job.salaryRange) {
      options.salaries.add(getSalaryBracket(job.salaryRange));
    } else if (job.salary) {
      options.salaries.add(getSalaryBracket(job.salary));
    }
  });
  
  return {
    contracts: Array.from(options.contracts),
    locations: Array.from(options.locations),
    categories: Array.from(options.categories),
    levels: Array.from(options.levels),
    salaries: Array.from(options.salaries),
  };
}