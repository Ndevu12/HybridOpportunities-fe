import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Job } from "../lib/job";
import { mockJobsData } from "../../DummyData/Jobs";

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined. Please set it in your environment variables.");
}

export const useFetchJobs = (filterData?: { title?: string; location?: string; fulltime?: string }) => {
  const [loading, setLoading] = useState(true);
  const [jobsData, setJobsData] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/jobs`);

        if (response.ok) {
          const jobs: Job[] = (await response.json()).jobs;
          setJobsData(filterJobs(jobs, filterData));
        } else {
          toast.error("Failed to fetch jobs: App is populated with dummy data.");
          setJobsData(filterJobs(mockJobsData, filterData));
        }
      } catch (error: any) {
        toast.error(`Error fetching jobs: ${error.message}`);
        setJobsData(filterJobs(mockJobsData, filterData));
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filterData]);

  const filterJobs = (jobs: Job[], filterData?: { title?: string; location?: string; fulltime?: string }) => {
    if (!filterData) return jobs;

    return jobs.filter(job => {
      const matchesTitle = filterData.title ? job.position?.toLowerCase().includes(filterData.title.toLowerCase()) : true;
      const matchesLocation = filterData.location ? job.location?.toLowerCase().includes(filterData.location.toLowerCase()) : true;
      const matchesContract = filterData.fulltime ? job.contract?.toLowerCase() === (filterData.fulltime === "on" ? "full time" : "part time") : true;

      return matchesTitle && matchesLocation && matchesContract;
    });
  };

  return { loading, jobsData };
};