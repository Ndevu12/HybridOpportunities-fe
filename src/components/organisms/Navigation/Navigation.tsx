import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";
import Typography from "../../atoms/Typography/Typography";

interface NavigationItem {
  name: string;
  path: string;
  icon?: string;
  requiresAuth?: boolean;
}

const Navigation: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigation items
  const navigationItems: NavigationItem[] = [
    { name: "Home", path: "/", icon: "home" },
    { name: "Jobs", path: "/jobs", icon: "work" },
    {
      name: "My Jobs",
      path: "/user/jobs",
      icon: "person_search",
      requiresAuth: true,
    },
    { name: "Profile", path: "/profile", icon: "person", requiresAuth: true },
  ];

  // Handle scroll event to add shadow to navigation when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white ${
        scrolled ? "shadow-navbar" : ""
      } transition-shadow duration-300`}
    >
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-primary text-white p-2 rounded-md mr-2">
                <Icon name="work" size="lg" color="white" />
              </div>
              <Typography
                variant="h5"
                weight="bold"
                className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
              >
                RemoteJobs
              </Typography>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigationItems
                .filter(
                  (item) =>
                    !item.requiresAuth || (item.requiresAuth && isLoggedIn)
                )
                .map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-700"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    {item.icon && <Icon name={item.icon} className="mr-1.5" />}
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                leftIcon={<Icon name="logout" />}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/auth?type=login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/auth?type=signup">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Icon name={isMenuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems
              .filter(
                (item) =>
                  !item.requiresAuth || (item.requiresAuth && isLoggedIn)
              )
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-700"
                      : "text-neutral-700 hover:bg-neutral-100"
                  } flex items-center`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <Icon name={item.icon} className="mr-2" />}
                  {item.name}
                </Link>
              ))}

            {/* Auth buttons for mobile */}
            <div className="pt-4 pb-3 border-t border-neutral-200">
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  leftIcon={<Icon name="logout" />}
                  className="w-full justify-center"
                >
                  Logout
                </Button>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/auth?type=login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button variant="outline" className="w-full justify-center">
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/auth?type=signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button variant="primary" className="w-full justify-center">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
