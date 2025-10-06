import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '../atoms/Typography/Typography';
import Icon from '../atoms/Icon/Icon';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-800 text-white">
      {/* Main Footer Content */}
      <div className="container-fluid mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-gradient-blue-to-purple text-white p-2 rounded-md mr-2">
                <Icon name="work" size="lg" color="white" />
              </div>
              <Typography
                variant="h5"
                weight="bold"
                color="white"
                className="bg-gradient-to-r from-blue-300 to-red-300 bg-clip-text text-transparent"
              >
                RemoteJobs
              </Typography>
            </div>
            <Typography variant="body2" color="white" className="opacity-75 mb-4">
              Your gateway to remote work opportunities worldwide. Find your dream job without location constraints.
            </Typography>
            <div className="flex space-x-3">
              <a href="#" aria-label="Twitter" className="text-white hover:text-blue-300 transition-colors">
                <Icon name="twitter" />
              </a>
              <a href="#" aria-label="Facebook" className="text-white hover:text-blue-300 transition-colors">
                <Icon name="facebook" />
              </a>
              <a href="#" aria-label="Instagram" className="text-white hover:text-blue-300 transition-colors">
                <Icon name="instagram" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white hover:text-blue-300 transition-colors">
                <Icon name="linkedin" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <Typography variant="h6" weight="bold" color="white" gutterBottom>
              Quick Links
            </Typography>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-neutral-300 hover:text-white transition-colors">Browse Jobs</Link>
              </li>
              <li>
                <Link to="/user/jobs" className="text-neutral-300 hover:text-white transition-colors">My Applications</Link>
              </li>
              <li>
                <Link to="/profile" className="text-neutral-300 hover:text-white transition-colors">My Profile</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <Typography variant="h6" weight="bold" color="white" gutterBottom>
              Resources
            </Typography>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">Remote Work Guide</a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">Resume Tips</a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">Interview Prep</a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">Remote Job Trends</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <Typography variant="h6" weight="bold" color="white" gutterBottom>
              Contact Us
            </Typography>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Icon name="email" className="mr-2 text-neutral-400" />
                <a href="mailto:support@remotejobs.com" className="text-neutral-300 hover:text-white transition-colors">
                  support@remotejobs.com
                </a>
              </li>
              <li className="flex items-center">
                <Icon name="phone" className="mr-2 text-neutral-400" />
                <a href="tel:+11234567890" className="text-neutral-300 hover:text-white transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-start">
                <Icon name="location_on" className="mr-2 text-neutral-400 mt-1" />
                <span className="text-neutral-300">
                  123 Remote Ave, Digital City,<br />
                  Internet, 10001
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-neutral-900 py-4">
        <div className="container-fluid mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Typography variant="body2" color="white" className="opacity-75 text-center md:text-left">
              © {currentYear} RemoteJobs. All rights reserved.
            </Typography>
            <div className="mt-3 md:mt-0 flex space-x-4">
              <Link to="/terms" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;