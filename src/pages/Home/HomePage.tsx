import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "../../components/atoms/Typography/Typography";
import Button from "../../components/atoms/Button/Button";
import Icon from "../../components/atoms/Icon/Icon";
import Badge from "../../components/atoms/Badge/Badge";
import Card from "../../components/molecules/Card/Card";
import SearchBar from "../../components/molecules/SearchBar/SearchBar";
import JobList from "../../components/organisms/JobList/JobList";
import { JobCard } from "../../components/cards";
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

      {/* Hero Section - Trust & Confidence */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-16 md:py-24 relative overflow-hidden">
        {/* Subtle pattern overlay for depth */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="w-full px-4 mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <Typography
              variant="h1"
              weight="bold"
              className="mb-6 leading-tight text-white text-center"
            >
              Find Your Dream Remote Job Anywhere in the World
            </Typography>

            <Typography variant="h6" className="mb-8 opacity-95 text-shadow-sm text-white text-center">
              Browse thousands of remote positions from top companies and
              startups worldwide
            </Typography>

            <div className="w-full">
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

      {/* Stats Section - Social Proof & Credibility */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50/20 to-blue-50/40 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230066ff' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="w-full px-4 mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="text-neutral-800 mb-4 text-center">
                Trusted by Professionals Worldwide
              </Typography>
              <Typography variant="body1" color="textSecondary" className="max-w-2xl mx-auto text-center text-lg">
                Join thousands of job seekers who have found their dream remote positions
              </Typography>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  {/* Icon Container */}
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
                    <Icon name={stat.icon} size="lg" color="primary" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex flex-col items-center space-y-2">
                    <Typography
                      variant="h3"
                      weight="bold"
                      className="text-gradient-primary text-center leading-tight"
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="textSecondary" 
                      className="font-medium text-center leading-relaxed"
                    >
                      {stat.label}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section - Opportunity & Excitement */}
      <section className="py-20 bg-gradient-to-b from-blue-50/30 via-purple-50/20 to-purple-50/30 relative overflow-hidden">
        {/* Dynamic background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl"></div>
        
        <div className="w-full px-4 mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="primary" size="lg" className="mb-4 px-6 py-2">
                ⭐ Featured Opportunities
              </Badge>
              <Typography variant="h2" weight="bold" className="text-neutral-800 mb-4 text-center">
                Popular Remote Positions
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="max-w-3xl mx-auto text-lg text-center"
              >
                Discover some of our most popular remote positions from top
                companies worldwide. These opportunities are handpicked for their
                quality and growth potential.
              </Typography>
            </div>

            <div className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredJobs.slice(0, 4).map((job) => (
                  <JobCard
                    key={job.id || job._id}
                    job={job}
                    variant="featured"
                    showDescription={true}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/jobs")}
                rightIcon={<Icon name="arrow_forward" />}
                className="px-8 py-4 text-lg font-semibold"
              >
                Explore All Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Exploration & Discovery */}
      <section className="py-20 bg-gradient-to-b from-purple-50/20 via-white to-purple-50/10 relative overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-purple-200/30 rounded-lg rotate-45 blur-sm"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-300/20 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-100/40 rounded-full blur-md"></div>
        
        <div className="w-full px-4 mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" size="lg" className="mb-4 px-6 py-2">
                🔍 Explore
              </Badge>
              <Typography variant="h2" weight="bold" className="text-neutral-800 mb-4 text-center">
                Browse by Category
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="max-w-3xl mx-auto text-lg text-center"
              >
                Find remote jobs in your field of expertise. Discover opportunities
                that match your skills and career aspirations.
              </Typography>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <Card
                  key={index}
                  hoverable
                  elevation="sm"
                  className="text-center cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className="flex flex-col items-center p-8">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <Icon name={category.icon} size="lg" color="secondary" />
                    </div>
                    <Typography variant="h5" weight="semibold" className="mb-3 text-neutral-800">
                      {category.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" className="font-medium">
                      {category.count} open positions
                    </Typography>
                    <div className="mt-4 w-12 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Process & Success */}
      <section className="py-20 bg-gradient-to-b from-white via-green-50/20 to-green-50/40 relative overflow-hidden">
        {/* Success-themed background elements */}
        <div className="absolute top-10 right-20 w-24 h-24 bg-green-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-green-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-green-100/40 rounded-lg rotate-45 blur-lg"></div>
        
        <div className="w-full px-4 mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="success" size="lg" className="mb-4 px-6 py-2">
                🚀 Simple Process
              </Badge>
              <Typography variant="h2" weight="bold" className="text-neutral-800 mb-4 text-center">
                How RemoteJobs Works
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="max-w-3xl mx-auto text-lg text-center"
              >
                Your journey to landing the perfect remote job is just a few steps
                away. Follow our proven process to success.
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group relative">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Typography variant="h2" weight="bold" className="text-white">
                    1
                  </Typography>
                </div>
                <Typography variant="h4" weight="semibold" className="mb-4 text-neutral-800">
                  Create Your Profile
                </Typography>
                <Typography variant="body1" color="textSecondary" className="text-lg leading-relaxed">
                  Sign up and build your profile with your skills, experience, and
                  preferences. Showcase your expertise to employers.
                </Typography>
                <div className="mt-6 w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto group-hover:w-20 transition-all duration-300"></div>
              </div>

              <div className="text-center group relative">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Typography variant="h2" weight="bold" className="text-white">
                    2
                  </Typography>
                </div>
                <Typography variant="h4" weight="semibold" className="mb-4 text-neutral-800">
                  Discover Opportunities
                </Typography>
                <Typography variant="body1" color="textSecondary" className="text-lg leading-relaxed">
                  Browse and search for remote jobs that match your skills and
                  interests. Find opportunities that align with your career goals.
                </Typography>
                <div className="mt-6 w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto group-hover:w-20 transition-all duration-300"></div>
              </div>

              <div className="text-center group relative">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Typography variant="h2" weight="bold" className="text-white">
                    3
                  </Typography>
                </div>
                <Typography variant="h4" weight="semibold" className="mb-4 text-neutral-800">
                  Apply with Ease
                </Typography>
                <Typography variant="body1" color="textSecondary" className="text-lg leading-relaxed">
                  Submit your application with just a few clicks and track your
                  progress. Get hired faster with our streamlined process.
                </Typography>
                <div className="mt-6 w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Urgency & Action */}
      <section className="py-20 bg-gradient-to-br from-blue-800 via-blue-700 to-purple-700 text-white relative overflow-hidden">
        {/* Dynamic background pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating action elements */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-400/20 rounded-lg rotate-45 blur-lg"></div>
        
        <div className="w-full px-4 mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <Typography variant="h2" weight="bold" className="text-white mb-6 text-shadow text-center">
              Ready to Start Your Remote Journey?
            </Typography>
            <Typography
              variant="body1"
              className="opacity-95 mb-12 text-shadow-sm text-white text-lg max-w-2xl mx-auto leading-relaxed text-center"
            >
              Join thousands of professionals who have found their dream remote
              jobs through our platform. Your next opportunity is just one click away.
            </Typography>

            <div className="flex flex-wrap justify-center gap-6">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/auth?type=signup")}
                className="px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                🚀 Sign Up for Free
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/jobs")}
              >
                🔍 Browse Jobs
              </Button>
            </div>
            
            <div className="mt-12 flex justify-center items-center space-x-8 text-white/80">
              <div className="flex items-center">
                <Icon name="check_circle" className="mr-2" />
                <span className="text-sm">No hidden fees</span>
              </div>
              <div className="flex items-center">
                <Icon name="check_circle" className="mr-2" />
                <span className="text-sm">Instant access</span>
              </div>
              <div className="flex items-center">
                <Icon name="check_circle" className="mr-2" />
                <span className="text-sm">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
