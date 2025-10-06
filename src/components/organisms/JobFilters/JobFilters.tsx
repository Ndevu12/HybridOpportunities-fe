import React, { useState, useEffect } from "react";
import Typography from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";
import Badge from "../../atoms/Badge/Badge";
import Card from "../../molecules/Card/Card";
import {
  ContractType,
  ExperienceLevel,
  JobCategory,
  Region,
} from "../../../lib/enums";
import { Job } from "../../../lib/job";
import {
  getFilterOptions,
  JobFilters as JobFiltersType,
} from "../../../utils/helpers";

interface JobFiltersProps {
  onApplyFilters: (filters: JobFiltersType) => void;
  initialFilters?: JobFiltersType;
  availableJobs?: Job[];
}

const JobFilters: React.FC<JobFiltersProps> = ({
  onApplyFilters,
  initialFilters = {},
  availableJobs = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<JobFiltersType>({
    contract: initialFilters.contract || "",
    location: initialFilters.location || "",
    category: initialFilters.category || "",
    level: initialFilters.level || "",
    salary: initialFilters.salary || "",
    remote: initialFilters.remote || false,
    ...initialFilters,
  });

  // Dynamic filter options
  const [filterOptions, setFilterOptions] = useState({
    contracts: Object.values(ContractType),
    locations: ["Remote Only", ...Object.values(Region)],
    categories: Object.values(JobCategory),
    levels: Object.values(ExperienceLevel),
    salaries: ["$0-$50K", "$50K-$100K", "$100K-$150K", "$150K+"],
  });

  // Update filter options based on available jobs
  useEffect(() => {
    if (availableJobs && availableJobs.length > 0) {
      const options = getFilterOptions(availableJobs);
      setFilterOptions((prevOptions) => ({
        contracts:
          options.contracts.length > 0
            ? options.contracts
            : prevOptions.contracts,
        locations:
          options.locations.length > 0
            ? options.locations
            : prevOptions.locations,
        categories:
          options.categories.length > 0
            ? options.categories
            : prevOptions.categories,
        levels: options.levels.length > 0 ? options.levels : prevOptions.levels,
        salaries:
          options.salaries.length > 0 ? options.salaries : prevOptions.salaries,
      }));
    }
  }, [availableJobs]);

  const handleFilterChange = (filterKey: string, value: string | boolean) => {
    setFilters({
      ...filters,
      [filterKey]: filters[filterKey] === value ? "" : value,
    });
  };

  const handleRemoteChange = () => {
    setFilters({
      ...filters,
      remote: !filters.remote,
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters: JobFiltersType = {
      contract: "",
      location: "",
      category: "",
      level: "",
      salary: "",
      remote: false,
    };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  // Count active filters
  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (typeof value === "boolean" && value) return true;
    if (typeof value === "string" && value !== "") return true;
    return false;
  }).length;

  return (
    <Card elevation="sm" className="mb-6">
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <Button
          variant="outline"
          isFullWidth
          leftIcon={<Icon name="filter_list" />}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between"
        >
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Desktop Filter Header */}
      <div className="hidden md:flex items-center justify-between pb-4 border-b border-neutral-200">
        <div className="flex items-center">
          <Icon name="filter_list" color="primary" className="mr-2" />
          <Typography variant="h6" weight="semibold">
            Filters
          </Typography>
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="text" size="sm" onClick={handleClearFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Content - Hidden on mobile unless expanded */}
      <div className={`${isExpanded || "hidden md:block"} mt-4`}>
        <div className="space-y-6">
          {/* Contract Type Filter */}
          <div>
            <Typography variant="subtitle1" weight="medium" className="mb-3">
              Contract Type
            </Typography>
            <div className="flex flex-wrap gap-2">
              {filterOptions.contracts.map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterChange("contract", type)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.contract === type
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  } transition-colors`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <Typography variant="subtitle1" weight="medium" className="mb-3">
              Location
            </Typography>
            <div className="flex flex-wrap gap-2">
              {filterOptions.locations.map((location) => (
                <button
                  key={location}
                  onClick={() => handleFilterChange("location", location)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.location === location
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  } transition-colors`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <Typography variant="subtitle1" weight="medium" className="mb-3">
              Category
            </Typography>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange("category", category)}
                  className={`px-2 py-1 rounded-md text-sm text-left ${
                    filters.category === category
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  } transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <Typography variant="subtitle1" weight="medium" className="mb-3">
              Experience Level
            </Typography>
            <div className="flex flex-wrap gap-2">
              {filterOptions.levels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleFilterChange("level", level)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.level === level
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  } transition-colors`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <Typography variant="subtitle1" weight="medium" className="mb-3">
              Salary Range
            </Typography>
            <div className="flex flex-wrap gap-2">
              {filterOptions.salaries.map((range) => (
                <button
                  key={range}
                  onClick={() => handleFilterChange("salary", range)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.salary === range
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  } transition-colors`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Remote Only Switch */}
          <div className="flex items-center">
            <button
              className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                filters.remote ? "bg-blue-600" : "bg-neutral-300"
              } transition-colors focus:outline-none`}
              onClick={handleRemoteChange}
              role="switch"
              aria-checked={filters.remote}
            >
              <span
                className={`${
                  filters.remote ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </button>
            <Typography variant="body2" className="ml-3">
              Remote Only
            </Typography>
          </div>

          {/* Apply Filters Button - Mobile Only */}
          <div className="md:hidden mt-4">
            <Button
              variant="primary"
              isFullWidth
              onClick={() => {
                handleApplyFilters();
                setIsExpanded(false);
              }}
            >
              Apply Filters
            </Button>
            <Button
              variant="text"
              isFullWidth
              className="mt-2"
              onClick={() => {
                handleClearFilters();
                setIsExpanded(false);
              }}
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobFilters;
