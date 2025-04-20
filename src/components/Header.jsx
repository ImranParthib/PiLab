import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Loader } from "lucide-react";
import { auth } from "../../Firebase/firebaseConfig";
import PropTypes from "prop-types";

function Header({ user }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "History of Pi", path: "/history" },
    { name: "Learning Tools", path: "/projects" },
    { name: "Contribute", path: "/contribute" },
    { name: "About", path: "/about" },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await auth.signOut();
      setIsDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-900 dark:from-gray-800 dark:to-gray-900 text-white py-3 px-2 sm:px-4 shadow-lg">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <img
              src="/pilab-logo.png"
              alt="PiLab Logo"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-wider">
              Pi
              <span className="text-purple-300 dark:text-purple-400">Lab</span>
            </h1>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <ul className="flex space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      text-xs sm:text-sm uppercase tracking-wider font-medium
                      text-white hover:text-purple-300 dark:hover:text-purple-400 
                      transition duration-300 ease-in-out
                      ${isActive
                        ? "border-b-2 border-purple-300 dark:border-purple-400"
                        : ""
                      }
                    `}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <button
              onClick={toggleTheme}
              className="text-white hover:text-purple-300 dark:hover:text-purple-400 transition duration-300 ease-in-out"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {user && (
              <div className="relative ml-4">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 sm:space-x-3 
                    bg-gradient-to-r from-purple-600 to-indigo-600 
                    hover:from-purple-700 hover:to-indigo-700 
                    text-white font-semibold 
                    py-1.5 px-3 sm:py-1 sm:px-4 
                    rounded-full transition duration-300 
                    ease-in-out shadow-lg hover:shadow-xl"
                >
                  <span className="text-xs sm:text-sm hidden sm:block truncate max-w-[100px]">
                    {user.displayName}
                  </span>
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-sm"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                    <ul>
                      <li>
                        <NavLink
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100 transition"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Learning Progress
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-red-50 flex items-center space-x-2"
                        >
                          {isLoggingOut && (
                            <Loader className="animate-spin" size={16} />
                          )}
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu and User Icons */}
          <div className="md:hidden flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleTheme}
              className="text-white hover:text-purple-300 dark:hover:text-purple-400 transition duration-300 ease-in-out"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 sm:space-x-3 
                    bg-gradient-to-r from-purple-600 to-indigo-600 
                    hover:from-purple-700 hover:to-indigo-700 
                    text-white font-semibold 
                    py-1.5 px-3 sm:py-2 sm:px-4 
                    rounded-full transition duration-300 
                    ease-in-out shadow-lg hover:shadow-xl"
                >
                  <span className="text-xs sm:text-sm hidden sm:block truncate max-w-[100px]">
                    {user.displayName}
                  </span>
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-sm"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                    <ul>
                      <li>
                        <NavLink
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100 transition"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Learning Progress
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-red-50 flex items-center space-x-2"
                        >
                          {isLoggingOut && (
                            <Loader className="animate-spin" size={16} />
                          )}
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg">
            <ul className="flex flex-col space-y-2 p-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      block text-white hover:text-purple-300 
                      dark:hover:text-purple-400 transition 
                      duration-300 ease-in-out py-2 
                      text-sm uppercase tracking-wider 
                      font-medium text-center
                      ${isActive
                        ? "border-b-2 border-purple-300 dark:border-purple-400"
                        : ""
                      }
                    `}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;
