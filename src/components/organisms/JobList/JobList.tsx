import React from "react";
import Typography from "../../atoms/Typography/Typography";
import Icon from "../../atoms/Icon/Icon";
import Button from "../../atoms/Button/Button";
import Spinner from "../../atoms/Spinner/Spinner";
import { JobCard } from "../../cards";
import { Job } from "../../../lib/job";

export interface JobListProps {
  jobs: Job[];
  loading: boolean;
  error?: string;
  emptyMessage?: string;
  className?: string;
}

const JobList: React.FC<JobListProps> = ({
  jobs,
  loading,
  error,
  emptyMessage = "No jobs found. Try adjusting your filters.",
  className = "",
}) => {

  // Render loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Spinner size="lg" color="primary" />
        <Typography variant="body1" color="textSecondary" className="mt-4">
          Loading jobs...
        </Typography>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-red-100 p-4 rounded-full">
          <Icon name="error" color="secondary" size="lg" />
        </div>
        <Typography variant="body1" color="error" className="mt-4">
          {error}
        </Typography>
        <Button variant="outline" className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  // Render empty state
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-neutral-100 p-4 rounded-full">
          <Icon name="search_off" color="neutral" size="lg" />
        </div>
        <Typography
          variant="body1"
          color="textSecondary"
          className="mt-4 text-center"
        >
          {emptyMessage}
        </Typography>
      </div>
    );
  }

  // Render job list
  return (
    <div className={`space-y-4 ${className}`}>
      {jobs.map((job) => (
        <JobCard
          key={job.id || job._id}
          job={job}
          variant="default"
          showDescription={true}
        />
      ))}
    </div>
  );
};

export default JobList;
