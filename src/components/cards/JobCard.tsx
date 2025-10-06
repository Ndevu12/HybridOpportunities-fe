import React from "react";
import { Link } from "react-router-dom";
import { Job } from "../../lib/job";
import Typography from "../atoms/Typography/Typography";
import Badge from "../atoms/Badge/Badge";
import Icon from "../atoms/Icon/Icon";
import Card from "../molecules/Card/Card";
import transformTime from "../../utils/FormatTime";
import { truncateText } from "../../utils/truncateText";

export interface JobCardProps {
  job: Job;
  variant?: "default" | "featured" | "compact" | "detailed";
  showDescription?: boolean;
  className?: string;
  onClick?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  variant = "default", 
  showDescription = true,
  className = "",
  onClick 
}) => {
  const jobId = job.id || job._id || "";
  const truncatedDescription = truncateText(job.description || "", 120);
  
  // Format the date
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

  // Default card content
  const cardContent = (
    <Card
      hoverable
      elevation="sm"
      className={`transition-all duration-300 group cursor-pointer h-full border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl hover:scale-[1.02] ${className}`}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Company logo */}
          <div
            className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center shadow-md"
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
              <Typography variant="h4" weight="bold" className="text-white">
                {job.company.name.charAt(0)}
              </Typography>
            )}
          </div>

          {/* Job details */}
          <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <Typography
                  variant="h6"
                  weight="semibold"
                  className="group-hover:text-blue-600 transition-colors mb-1"
                >
                  {job.position}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  {job.company.name}
                </Typography>
              </div>
              <Badge variant={job.status === "active" || job.status === "open" ? "success" : "neutral"}>
                {job.status === "active" || job.status === "open" ? "Active" : "Closed"}
              </Badge>
            </div>

            {/* Location and contract */}
            <div className="flex items-center text-sm text-blue-600 mb-3">
              <Icon name="location_on" size="sm" className="mr-1" />
              <span className="font-medium">{job.location}</span>
              <span className="mx-2">•</span>
              <span>{job.contract}</span>
            </div>

            {/* Description preview */}
            {showDescription && (job.shortDescription || job.description) && (
              <Typography
                variant="body2"
                color="textSecondary"
                className="line-clamp-2"
              >
                {job.shortDescription || truncatedDescription}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  // Handle click
  const handleClick = () => {
    if (onClick) {
      onClick(jobId);
    }
  };

  // Return appropriate wrapper based on variant
  if (variant === "compact") {
    return (
      <div onClick={handleClick} className="block">
        {cardContent}
      </div>
    );
  }

  return (
    <Link to={`/jobs/${jobId}`} className="block" onClick={handleClick}>
      {cardContent}
    </Link>
  );
};

export default JobCard;
