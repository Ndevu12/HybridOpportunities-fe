import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { mockJobsData } from "../../../DummyData/Jobs";
import { Job } from "../../lib/job";
import {
  filterJobs,
  JobFilters as JobFiltersType,
} from "../../utils/helpers/index";

// Define environment constants
const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

// Types
export interface JobFilters extends JobFiltersType {
  search?: string;
}

interface JobsContextType {
  jobs: Job[];
  featuredJobs: Job[];
  filteredJobs: Job[];
  jobDetails: Job | null;
  loading: boolean;
  error: string | null;
  fetchJobs: (filters?: JobFilters) => Promise<void>;
  fetchJobById: (id: string) => Promise<Job | null>;
  applyFilters: (filters: JobFilters) => void;
  currentFilters: JobFilters;
  hasAppliedFilters: boolean;
  refreshJobDetails: (jobId: string) => Promise<void>;
  postJob: (jobData: Job) => Promise<boolean>;
  updateJobStatus: (jobId: string, status: string) => Promise<boolean>;
}

// Create context with default values
const JobsContext = createContext<JobsContextType>({
  jobs: [],
  featuredJobs: [],
  filteredJobs: [],
  jobDetails: null,
  loading: false,
  error: null,
  fetchJobs: async () => {},
  fetchJobById: async () => null,
  applyFilters: () => {},
  currentFilters: {},
  hasAppliedFilters: false,
  refreshJobDetails: async () => {},
  postJob: async () => false,
  updateJobStatus: async () => false,
});

// Custom hook to use the context
export const useJobs = () => useContext(JobsContext);

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [jobDetails, setJobDetails] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<JobFilters>({});
  const [jobsCache, setJobsCache] = useState<Record<string, Job>>({});
  const [lastFetched, setLastFetched] = useState<number>(0);

  // Cache expiration time: 5 minutes
  const CACHE_EXPIRATION = 5 * 60 * 1000;

  // Fetch jobs from API or use cached data
  const fetchJobs = useCallback(
    async (filters?: JobFilters) => {
      // If we have recent data and no filters, use cached data
      const now = Date.now();
      if (jobs.length > 0 && now - lastFetched < CACHE_EXPIRATION && !filters) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Build query params for server side search/filters
        const queryParams = filters ? new URLSearchParams() : undefined;
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value) {
              queryParams?.append(key, value.toString());
            }
          });
        }

        const url = API_BASE_URL
          ? `${API_BASE_URL}/jobs${queryParams ? `?${queryParams}` : ""}`
          : "";

        // If API_BASE_URL is available, fetch from API, otherwise use dummy data
        let jobsData: Job[];
        if (url) {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch jobs");
            const data = await response.json();
            jobsData = data.jobs;
          } catch (err) {
            console.error("API fetch failed, using dummy data", err);
            jobsData = [...mockJobsData];
          }
        } else {
          jobsData = [...mockJobsData];
        }

        // Update cache with fetched jobs
        const newCache = { ...jobsCache };
        jobsData.forEach((job) => {
          const id = job._id || job.id;
          if (id) newCache[id] = job;
        });
        setJobsCache(newCache);
        setJobs(jobsData);

        // if filters were provided, update currentFilters and filter locally as well
        if (filters && Object.values(filters).some((v) => !!v)) {
          setCurrentFilters(filters);
          // map search to searchQuery like applyFilters
          const mapped = { ...filters, searchQuery: filters.search } as any;
          setFilteredJobs(filterJobs(jobsData, mapped));
        } else {
          setFilteredJobs(jobsData);
        }

        setLastFetched(now);

        // Set featured jobs (randomly select 3)
        const shuffled = [...jobsData].sort(() => 0.5 - Math.random());
        setFeaturedJobs(shuffled.slice(0, 3));
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    },
    [jobs.length, lastFetched, jobsCache],
  );

  // Fetch a single job by ID
  const fetchJobById = useCallback(
    async (id: string): Promise<Job | null> => {
      // Check if we have it in cache
      if (jobsCache[id]) {
        setJobDetails(jobsCache[id]);
        return jobsCache[id];
      }

      setLoading(true);
      setError(null);

      try {
        // Try to fetch from API
        if (API_BASE_URL) {
          try {
            const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
            if (response.ok) {
              const data = await response.json();
              const jobData = data.job;

              // Update cache
              setJobsCache((prev) => ({ ...prev, [id]: jobData }));
              setJobDetails(jobData);
              return jobData;
            }
          } catch (err) {
            console.error(
              "API fetch failed for job details, trying dummy data",
              err,
            );
          }
        }

        // Fall back to dummy data if API fetch fails or no API_BASE_URL
        const dummyJob = mockJobsData.find((job) => {
          const jobId = job._id || job.id;
          return jobId === id;
        });

        if (dummyJob) {
          setJobsCache((prev) => ({ ...prev, [id]: dummyJob }));
          setJobDetails(dummyJob);
          return dummyJob;
        }

        throw new Error("Job not found");
      } catch (err) {
        setError("Failed to fetch job details. Please try again later.");
        console.error("Error fetching job details:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [jobsCache],
  );

  // Refresh job details (force fetch from API)
  const refreshJobDetails = useCallback(async (jobId: string) => {
    if (!API_BASE_URL) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
      if (response.ok) {
        const data = await response.json();
        const refreshedJob = data.job;

        // Update cache and state
        setJobsCache((prev) => ({ ...prev, [jobId]: refreshedJob }));
        setJobDetails(refreshedJob);

        // Also update in jobs list if present
        setJobs((prevJobs) => {
          return prevJobs.map((job) => {
            const id = job._id || job.id;
            return id === jobId ? refreshedJob : job;
          });
        });

        // Update filteredJobs directly
        setFilteredJobs((prevJobs) => {
          return prevJobs.map((job) => {
            const id = job._id || job.id;
            return id === jobId ? refreshedJob : job;
          });
        });
      }
    } catch (err) {
      console.error("Failed to refresh job details:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Post a new job to the backend or dummy data
  const postJob = useCallback(
    async (jobData: Job): Promise<boolean> => {
      try {
        let newJob: Job;
        if (API_BASE_URL) {
          const response = await fetch(`${API_BASE_URL}/jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jobData),
          });
          if (!response.ok) throw new Error("Failed to post job");
          const data = await response.json();
          newJob = data.job;
        } else {
          // fallback dummy behavior
          newJob = { ...jobData, _id: Math.random().toString(36).substr(2, 9) };
        }

        setJobs((prev) => [...prev, newJob]);
        setJobsCache((prev) => {
          const id = newJob._id || newJob.id;
          if (id) return { ...prev, [id]: newJob };
          return prev;
        });

        // reapply filters so the new job only shows if it matches
        if (currentFilters && Object.values(currentFilters).some((v) => !!v)) {
          const mapped = {
            ...currentFilters,
            searchQuery: currentFilters.search,
          } as any;
          setFilteredJobs((prev) => filterJobs([...prev, newJob], mapped));
        } else {
          setFilteredJobs((prev) => [...prev, newJob]);
        }

        return true;
      } catch (err) {
        console.error("Error posting job:", err);
        return false;
      }
    },
    [currentFilters],
  );
  // Update the status of an existing job
  const updateJobStatus = useCallback(
    async (jobId: string, status: string): Promise<boolean> => {
      try {
        let updatedJob: Job;

        if (API_BASE_URL) {
          const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          });
          if (!response.ok) throw new Error("Failed to update job status");
          const data = await response.json();
          updatedJob = data.job;
        } else {
          // update locally
          updatedJob = { ...(jobsCache[jobId] || ({} as Job)), status };
        }

        setJobs((prev) =>
          prev.map((job) => {
            const id = job._id || job.id;
            return id === jobId ? updatedJob : job;
          }),
        );

        // reapply filters to make sure status change doesn't break list
        if (currentFilters && Object.values(currentFilters).some((v) => !!v)) {
          const mapped = {
            ...currentFilters,
            searchQuery: currentFilters.search,
          } as any;
          setFilteredJobs((prev) =>
            prev
              .map((job) => {
                const id = job._id || job.id;
                return id === jobId ? updatedJob : job;
              })
              .filter((job) => filterJobs([job], mapped).length > 0),
          );
        } else {
          setFilteredJobs((prev) =>
            prev.map((job) => {
              const id = job._id || job.id;
              return id === jobId ? updatedJob : job;
            }),
          );
        }

        setJobsCache((prev) => ({ ...prev, [jobId]: updatedJob }));
        return true;
      } catch (err) {
        console.error("Error updating job status:", err);
        return false;
      }
    },
    [currentFilters, jobsCache],
  );

  // Apply filters to jobs using our utility function
  const applyFilters = useCallback(
    (filters: JobFilters) => {
      setCurrentFilters(filters);

      if (Object.values(filters).every((val) => !val)) {
        // No active filters
        setFilteredJobs(jobs);
        return;
      }

      // Use the filterJobs utility function to apply filters
      const filtered = filterJobs(jobs, {
        ...filters,
        searchQuery: filters.search, // Map search to searchQuery for the utility
      });

      setFilteredJobs(filtered);
    },
    [jobs],
  );

  // whenever the raw job list or current filters change we
  // make sure the filtered list reflects the latest criteria
  useEffect(() => {
    if (currentFilters && Object.values(currentFilters).some((v) => !!v)) {
      const mapped = {
        ...currentFilters,
        searchQuery: currentFilters.search,
      } as any;
      setFilteredJobs(filterJobs(jobs, mapped));
    } else {
      setFilteredJobs(jobs);
    }
  }, [jobs, currentFilters]);

  // Initial fetch on mount
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Check if filters have been applied
  const hasAppliedFilters = Object.values(currentFilters).some((val) => !!val);

  const contextValue: JobsContextType = {
    jobs,
    featuredJobs,
    filteredJobs,
    jobDetails,
    loading,
    error,
    fetchJobs,
    fetchJobById,
    applyFilters,
    currentFilters,
    hasAppliedFilters,
    refreshJobDetails,
    postJob,
    updateJobStatus,
  };

  return (
    <JobsContext.Provider value={contextValue}>{children}</JobsContext.Provider>
  );
};

export default JobsContext;
