import React, { useState } from "react";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import JobFilters from "../../organisms/JobFilters/JobFilters";
import JobList from "../../organisms/JobList/JobList";
import Typography from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";
import { Job } from "../../../lib/job";
import { JobFilters as JobFiltersType } from "../../../utils/helpers";

export interface JobListingTemplateProps {
  jobs: Job[];
  loading: boolean;
  error?: string;
  onSearch: (searchTerm: string) => void;
  onApplyFilters: (filters: JobFiltersType) => void;
  onReset?: () => void;
  searchTerm?: string;
  totalJobs?: number;
  availableJobs?: Job[];
}

const JobListingTemplate: React.FC<JobListingTemplateProps> = ({
  jobs,
  loading,
  error,
  onSearch,
  onApplyFilters,
  onReset,
  searchTerm = "",
  totalJobs = 0,
  availableJobs = [],
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Toggle mobile filter drawer
  const toggleFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Search section */}
      <div className="bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-50 border-b border-neutral-200 py-12">
        <div className="w-full px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="max-w-2xl mx-auto">
              <SearchBar
                onSearch={onSearch}
                placeholder="Search for job titles, companies, or skills..."
                initialValue={searchTerm}
                variant="large"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full px-4 mx-auto py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar filters - Desktop */}
            <div className="hidden md:block w-full md:w-80 lg:w-96 flex-shrink-0">
              <div className="sticky top-24">
                <JobFilters
                  onApplyFilters={onApplyFilters}
                  availableJobs={availableJobs}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              {/* Mobile filter button */}
              <div className="md:hidden mb-4">
                <Button
                  variant="outline"
                  leftIcon={<Icon name="filter_list" />}
                  onClick={toggleFilters}
                  className="w-full"
                >
                  Filters
                </Button>

                {/* Mobile filters drawer */}
                {showMobileFilters && (
                  <div className="fixed inset-0 z-50 bg-neutral-900 bg-opacity-50 flex items-end">
                    <div className="bg-white rounded-t-xl p-4 max-h-[80vh] w-full overflow-y-auto animate-slideInFromTop">
                      <div className="flex justify-between items-center pb-4 border-b mb-4">
                        <Typography variant="h6" weight="semibold">
                          Filters
                        </Typography>
                        <button
                          onClick={toggleFilters}
                          className="text-neutral-500 p-1"
                        >
                          <Icon name="close" />
                        </button>
                      </div>
                      <JobFilters
                        onApplyFilters={(filters) => {
                          onApplyFilters(filters);
                          setShowMobileFilters(false);
                        }}
                        availableJobs={availableJobs}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Results count and sorting */}
              {!loading && !error && (
                <div className="flex flex-wrap justify-between items-center mb-8 p-4 bg-white rounded-lg shadow-sm border border-neutral-200">
                  <Typography variant="subtitle1" weight="medium" className="text-neutral-700">
                    {jobs.length > 0 ? (
                      <>
                        Showing{" "}
                        <span className="text-blue-600 font-semibold">
                          {jobs.length}
                        </span>{" "}
                        of{" "}
                        <span className="text-blue-600 font-semibold">
                          {totalJobs}
                        </span>{" "}
                        jobs
                      </>
                    ) : (
                      "No jobs found"
                    )}
                  </Typography>

                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <Typography variant="body2" color="textSecondary">
                      Sort by:
                    </Typography>
                    <select className="bg-white border border-neutral-300 text-neutral-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-3 py-2 shadow-sm">
                      <option value="relevance">Relevance</option>
                      <option value="recent">Most Recent</option>
                      <option value="old">Oldest</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Job listings */}
              <JobList
                jobs={jobs}
                loading={loading}
                error={error}
                className="mb-8"
              />

              {/* Pagination */}
              {jobs.length > 0 && !loading && !error && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center space-x-1">
                    <Button variant="outline" className="px-3 py-2">
                      <Icon name="chevron_left" />
                    </Button>

                    <Button variant="primary" className="px-4 py-2">
                      1
                    </Button>

                    <Button variant="outline" className="px-4 py-2">
                      2
                    </Button>

                    <Button variant="outline" className="px-4 py-2">
                      3
                    </Button>

                    <span className="px-2">...</span>

                    <Button variant="outline" className="px-4 py-2">
                      10
                    </Button>

                    <Button variant="outline" className="px-3 py-2">
                      <Icon name="chevron_right" />
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingTemplate;
