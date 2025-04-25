import React from "react";
import { Link } from "react-router-dom";
import Card from "../../molecules/Card/Card";
import Typography from "../../atoms/Typography/Typography";
import Badge from "../../atoms/Badge/Badge";
import Icon from "../../atoms/Icon/Icon";
import Button from "../../atoms/Button/Button";
import Spinner from "../../atoms/Spinner/Spinner";
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
  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
  };

  // Function to truncate long text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength).trim()}...`;
  };

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
      {jobs.map((job) => {
        const jobId = job.id || job._id || "";

        return (
          <Link to={`/jobs/${jobId}`} key={jobId} className="block">
            <Card
              hoverable
              elevation="sm"
              border
              className="transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center">
                {/* Company logo */}
                <div
                  className="flex-shrink-0 mr-4 w-16 h-16 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: job.company.logoBackground || "#f9fafb",
                  }}
                >
                  {job.company.logo ? (
                    <img
                      src={job.company.logo}
                      alt={`${job.company.name} logo`}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <Typography variant="h4" weight="bold" color="white">
                      {job.company.name.charAt(0)}
                    </Typography>
                  )}
                </div>

                {/* Job details */}
                <div className="flex-grow">
                  <div className="flex flex-wrap gap-y-1 justify-between">
                    <div>
                      <div className="flex items-center text-neutral-500 text-sm">
                        <span>{formatDate(job.postedAt)}</span>
                        <span className="mx-1.5">•</span>
                        <span>{job.contract}</span>
                      </div>
                      <Typography
                        variant="h6"
                        weight="semibold"
                        className="mt-1 group-hover:text-blue-600 transition-colors"
                      >
                        {job.position}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {job.company.name}
                      </Typography>
                    </div>

                    <div className="flex items-center">
                      {job.status === "active" || job.status === "open" ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="neutral">Closed</Badge>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mt-3 flex items-center text-sm">
                    <Icon
                      name="location_on"
                      size="sm"
                      color="primary"
                      className="mr-1"
                    />
                    <span className="text-blue-600 font-medium">
                      {job.location}
                    </span>
                  </div>

                  {/* Description preview */}
                  {job.shortDescription ? (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="mt-3"
                    >
                      {job.shortDescription}
                    </Typography>
                  ) : job.description ? (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="mt-3"
                    >
                      {truncateText(job.description, 140)}
                    </Typography>
                  ) : null}
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default JobList;
