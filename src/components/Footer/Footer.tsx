import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '../atoms/Typography/Typography';
import Icon from '../atoms/Icon/Icon';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Main Footer Content */}
      <div className="w-full py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-primary text-white p-3 rounded-xl mr-3 shadow-lg">
                  <Icon name="work" size="lg" color="white" />
                </div>
                <Typography
                  variant="h4"
                  weight="bold"
                  className="text-white bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
                >
                  RemoteJobs
                </Typography>
              </div>
              <Typography variant="body1" className="text-white/90 mb-6 leading-relaxed max-w-md">
                Your gateway to remote work opportunities worldwide. Find your dream job without location constraints and build your career from anywhere.
              </Typography>
              
              {/* Social Links */}
              <div className="mb-4">
                <Typography variant="h6" weight="semibold" className="text-white mb-3">
                  Follow Us
                </Typography>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                <a 
                  href="#" 
                  aria-label="Twitter" 
                  className="bg-neutral-700 hover:bg-blue-500 text-white p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center min-w-[44px] min-h-[44px]"
                >
                  <Icon name="twitter" size="sm" />
                </a>
                <a 
                  href="#" 
                  aria-label="Facebook" 
                  className="bg-neutral-700 hover:bg-blue-600 text-white p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center min-w-[44px] min-h-[44px]"
                >
                  <Icon name="facebook" size="sm" />
                </a>
                <a 
                  href="#" 
                  aria-label="Instagram" 
                  className="bg-neutral-700 hover:bg-pink-500 text-white p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center min-w-[44px] min-h-[44px]"
                >
                  <Icon name="instagram" size="sm" />
                </a>
                <a 
                  href="#" 
                  aria-label="LinkedIn" 
                  className="bg-neutral-700 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center min-w-[44px] min-h-[44px]"
                >
                  <Icon name="linkedin" size="sm" />
                </a>
                </div>
              </div>

            </div>

            {/* Quick Links */}
            <div>
              <Typography variant="h6" weight="bold" className="text-white mb-6">
                Quick Links
              </Typography>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <Icon name="home" size="sm" className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <Icon name="search" size="sm" className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/user/jobs" className="text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <Icon name="work" size="sm" className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    My Applications
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <Icon name="person" size="sm" className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/auth" className="text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <Icon name="login" size="sm" className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <Typography variant="h6" weight="bold" className="text-white mb-6">
                Resources
              </Typography>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <Icon name="book" size="sm" className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Remote Work Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <Icon name="description" size="sm" className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Resume Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <Icon name="quiz" size="sm" className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Interview Prep
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <Icon name="trending_up" size="sm" className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Job Trends
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <Icon name="help" size="sm" className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <Typography variant="h6" weight="bold" className="text-white mb-6">
                Contact Us
              </Typography>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-3 mt-1">
                    <Icon name="email" size="sm" className="text-blue-400" />
                  </div>
                  <div>
                    <Typography variant="body2" className="text-neutral-400 mb-1">Email</Typography>
                    <a href="mailto:support@remotejobs.com" className="text-neutral-300 hover:text-white transition-colors duration-200">
                      support@remotejobs.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-2 rounded-lg mr-3 mt-1">
                    <Icon name="phone" size="sm" className="text-green-400" />
                  </div>
                  <div>
                    <Typography variant="body2" className="text-neutral-400 mb-1">Phone</Typography>
                    <a href="tel:+11234567890" className="text-neutral-300 hover:text-white transition-colors duration-200">
                      +250 78 888 8888
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-2 rounded-lg mr-3 mt-1">
                    <Icon name="location_on" size="sm" className="text-purple-400" />
                  </div>
                  <div>
                    <Typography variant="body2" className="text-neutral-400 mb-1">Address</Typography>
                    <span className="text-neutral-300">
                      123 Remote Ave, Kigali City,<br />
                      Internet, 10001
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-neutral-900/80 backdrop-blur-sm border-t border-neutral-700 py-6 relative z-10">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <Typography variant="body2" className="text-neutral-400 text-center md:text-left">
                © {currentYear} RemoteJobs. All rights reserved. Made with ❤️ for remote workers worldwide.
              </Typography>
              <div className="flex flex-wrap justify-center md:justify-end gap-6">
                <Link to="/terms" className="text-sm text-neutral-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="text-sm text-neutral-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="/cookies" className="text-sm text-neutral-400 hover:text-white transition-colors duration-200">
                  Cookie Policy
                </Link>
                <Link to="/sitemap" className="text-sm text-neutral-400 hover:text-white transition-colors duration-200">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;