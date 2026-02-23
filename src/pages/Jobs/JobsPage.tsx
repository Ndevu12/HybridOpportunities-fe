import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import JobListingTemplate from "../../components/templates/JobListingTemplate/JobListingTemplate";
import Navigation from "../../components/organisms/Navigation/Navigation";
import { useJobs } from "../../context/jobs/JobsContext";
import { JobFilters as JobFiltersType } from "../../utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";

const JobsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const { jobs, filteredJobs, loading, error, applyFilters, fetchJobs } =
    useJobs();
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");

  // Extract initial filters from URL params
  useEffect(() => {
    const initialFilters: JobFiltersType = {
      search: queryParams.get("search") || undefined,
      category: queryParams.get("category") || undefined,
      location: queryParams.get("location") || undefined,
      contract: queryParams.get("contract") || undefined,
      level: queryParams.get("level") || undefined,
      salary: queryParams.get("salary") || undefined,
      remote: queryParams.get("remote") === "true" ? true : false,
    };

    // Always try to fetch jobs with the initial filters (empty filters will be ignored by caching)
    fetchJobs(initialFilters);
    // keep local searchTerm in sync with URL param
    setSearchTerm(queryParams.get("search") || "");
  }, []);

  // Handle search submission
  const handleSearch = (term: string) => {
    setSearchTerm(term);

    // optimistically filter client‑side for instant feedback
    applyFilters({ search: term });

    // also request the backend in case results differ
    fetchJobs({ search: term });

    // Update URL to reflect the search
    const newParams = new URLSearchParams(location.search);
    if (term) {
      newParams.set("search", term);
    } else {
      newParams.delete("search");
    }

    // Update URL without reloading the page
    navigate(
      {
        pathname: location.pathname,
        search: newParams.toString() ? `?${newParams.toString()}` : "",
      },
      { replace: true },
    );
  };

  // Handle filter application
  const handleApplyFilters = (filters: JobFiltersType) => {
    // Apply filters including the current search term
    const combinedFilters = {
      ...filters,
      search: searchTerm || undefined,
    };

    applyFilters(combinedFilters);
    fetchJobs(combinedFilters);

    // Update URL to reflect all filters
    const newParams = new URLSearchParams();

    if (searchTerm) newParams.set("search", searchTerm);

    if (filters.category) newParams.set("category", filters.category);
    if (filters.location) newParams.set("location", filters.location);
    if (filters.contract) newParams.set("contract", filters.contract);
    if (filters.level) newParams.set("level", filters.level);
    if (filters.salary) newParams.set("salary", filters.salary);
    if (filters.remote) newParams.set("remote", "true");

    // Update URL without reloading the page
    navigate(
      {
        pathname: location.pathname,
        search: newParams.toString() ? `?${newParams.toString()}` : "",
      },
      { replace: true },
    );
  };

  // Handle resetting all filters
  const handleResetFilters = () => {
    applyFilters({});
    setSearchTerm("");

    // Clear all URL parameters
    navigate(
      {
        pathname: location.pathname,
      },
      { replace: true },
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="flex-grow">
        <JobListingTemplate
          jobs={filteredJobs}
          loading={loading}
          error={error}
          onSearch={handleSearch}
          onApplyFilters={handleApplyFilters}
          onReset={handleResetFilters}
          searchTerm={searchTerm}
          totalJobs={jobs.length}
          availableJobs={jobs}
        />
      </main>
    </div>
  );
};

export default JobsPage;
