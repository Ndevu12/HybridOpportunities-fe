import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../components/atoms/Typography/Typography";
import Button from "../../components/atoms/Button/Button";
import Icon from "../../components/atoms/Icon/Icon";
import Badge from "../../components/atoms/Badge/Badge";
import Card from "../../components/molecules/Card/Card";
import SearchBar from "../../components/molecules/SearchBar/SearchBar";
import JobList from "../../components/organisms/JobList/JobList";
import Navigation from "../../components/organisms/Navigation/Navigation";
import { useJobs } from "../../context/jobs/JobsContext";

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { loading, featuredJobs, error, fetchJobs } = useJobs();

  // Categories for job exploration
  const categories = [
    { name: "Software Development", icon: "code", count: 243 },
    { name: "Design", icon: "design_services", count: 157 },
    { name: "Marketing", icon: "campaign", count: 132 },
    { name: "Customer Support", icon: "support_agent", count: 108 },
    { name: "Sales", icon: "attach_money", count: 97 },
    { name: "Finance", icon: "account_balance", count: 85 },
  ];

  // Stats for the platform
  const stats = [
    { value: "10K+", label: "Remote Jobs", icon: "work" },
    { value: "5K+", label: "Companies", icon: "business" },
    { value: "50K+", label: "Job Seekers", icon: "people" },
    { value: "35+", label: "Countries", icon: "language" },
  ];

  // Initial fetch on mount - will use cached data if available
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    navigate(`/jobs?search=${encodeURIComponent(term)}`);
  };

  // Handle category click
  const handleCategoryClick = (category: string) => {
    navigate(`/jobs?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-blue-to-purple py-16 md:py-24">
        <div className="container-fluid mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Typography
              variant="h1"
              color="white"
              weight="bold"
              className="mb-6 leading-tight"
            >
              Find Your Dream Remote Job Anywhere in the World
            </Typography>

            <Typography variant="h6" color="white" className="mb-8 opacity-90">
              Browse thousands of remote positions from top companies and
              startups worldwide
            </Typography>

            <div className="max-w-3xl mx-auto">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search jobs, companies, or keywords..."
                variant="large"
                initialValue={searchTerm}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Icon name="search" />}
                onClick={() => navigate("/jobs")}
              >
                Browse All Jobs
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-white/30 border-white text-white hover:bg-white/40"
                leftIcon={<Icon name="person_add" />}
                onClick={() => navigate("/auth?type=signup")}
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-fluid mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-50 p-4 rounded-full inline-block mb-3">
                  <Icon name={stat.icon} size="lg" color="primary" />
                </div>
                <Typography
                  variant="h3"
                  weight="bold"
                  className="text-gradient-blue-to-purple"
                >
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {stat.label}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-fluid mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="primary" size="lg" className="mb-3">
              Featured Opportunities
            </Badge>
            <Typography variant="h3" weight="bold" gutterBottom>
              Popular Remote Positions
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className="max-w-2xl mx-auto"
            >
              Discover some of our most popular remote positions from top
              companies worldwide
            </Typography>
          </div>

          <div className="mb-8">
            <JobList jobs={featuredJobs} loading={loading} error={error} />
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/jobs")}
              rightIcon={<Icon name="arrow_forward" />}
            >
              View All Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-fluid mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" size="lg" className="mb-3">
              Explore
            </Badge>
            <Typography variant="h3" weight="bold" gutterBottom>
              Browse by Category
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className="max-w-2xl mx-auto"
            >
              Find remote jobs in your field of expertise
            </Typography>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                hoverable
                elevation="sm"
                className="text-center cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="flex flex-col items-center p-4">
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    <Icon name={category.icon} size="lg" color="primary" />
                  </div>
                  <Typography variant="h6" weight="semibold" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {category.count} open positions
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-fluid mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="success" size="lg" className="mb-3">
              Simple Process
            </Badge>
            <Typography variant="h3" weight="bold" gutterBottom>
              How RemoteJobs Works
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className="max-w-2xl mx-auto"
            >
              Your journey to landing the perfect remote job is just a few steps
              away
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-blue-to-purple text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Typography variant="h3" weight="bold" color="white">
                  1
                </Typography>
              </div>
              <Typography variant="h5" weight="semibold" gutterBottom>
                Create Your Profile
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Sign up and build your profile with your skills, experience, and
                preferences
              </Typography>
            </div>

            <div className="text-center">
              <div className="bg-gradient-blue-to-purple text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Typography variant="h3" weight="bold" color="white">
                  2
                </Typography>
              </div>
              <Typography variant="h5" weight="semibold" gutterBottom>
                Discover Opportunities
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Browse and search for remote jobs that match your skills and
                interests
              </Typography>
            </div>

            <div className="text-center">
              <div className="bg-gradient-blue-to-purple text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Typography variant="h3" weight="bold" color="white">
                  3
                </Typography>
              </div>
              <Typography variant="h5" weight="semibold" gutterBottom>
                Apply with Ease
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Submit your application with just a few clicks and track your
                progress
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-blue-to-purple text-white">
        <div className="container-fluid mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Typography variant="h3" weight="bold" color="white" gutterBottom>
              Ready to Start Your Remote Journey?
            </Typography>
            <Typography
              variant="body1"
              color="white"
              className="opacity-90 mb-8"
            >
              Join thousands of professionals who have found their dream remote
              jobs through our platform
            </Typography>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/auth?type=signup")}
              >
                Sign Up for Free
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/20"
                onClick={() => navigate("/jobs")}
              >
                Browse Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
