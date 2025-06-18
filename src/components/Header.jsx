import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Loader, Brain } from "lucide-react";
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
    { name: "Home", shortName: "Home", path: "/" },
    { name: "History of Pi", shortName: "History", path: "/history" },
    { name: "Learning Tools", shortName: "Tools", path: "/projects" },
    { name: "Quiz", shortName: "Quiz", path: "/quiz" },
    { name: "Contribute", shortName: "Contribute", path: "/contribute" },
    { name: "About", shortName: "About", path: "/about" },
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

  return (<header className="bg-gradient-to-r from-purple-800 to-indigo-900 dark:from-gray-800 dark:to-gray-900 text-white py-2 px-2 sm:px-4 md:px-6 shadow-lg sticky top-0 z-50">
    <div className="container mx-auto max-w-7xl px-1 sm:px-2 md:px-4">
      <div className="flex justify-between items-center">        <NavLink to="/" className="flex items-center space-x-1 sm:space-x-2">
        <img
          src="/pilab-logo.png"
          alt="PiLab Logo"
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        />
        <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wider">
          Pi
          <span className="text-purple-300 dark:text-purple-400">Lab</span>
        </h1>
      </NavLink>{/* Desktop Navigation */}          <nav className="hidden lg:flex items-center space-x-2 lg:space-x-3 xl:space-x-5">
          <ul className="flex space-x-0.5 lg:space-x-2 xl:space-x-4">
            {navItems.map((item) => (
              <li key={item.name}>                  <NavLink to={item.path}
                className={({ isActive }) => `
                      text-[10px] sm:text-xs lg:text-xs xl:text-sm uppercase tracking-wider font-medium
                      text-white hover:text-purple-300 dark:hover:text-purple-400 
                      transition duration-300 ease-in-out flex items-center
                      px-1 lg:px-1.5 xl:px-2 py-1
                      ${isActive
                    ? "border-b-2 border-purple-300 dark:border-purple-400"
                    : ""
                  }
                    `}
              >                {item.name === "Quiz" && (
                <Brain className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              )}
                <span className="hidden lg:inline">{item.name}</span>
                <span className="lg:hidden">{item.shortName}</span>
              </NavLink>
              </li>
            ))}
          </ul>            <button
            onClick={toggleTheme}
            className="text-white hover:text-purple-300 dark:hover:text-purple-400 transition duration-300 ease-in-out p-1.5 rounded-full hover:bg-purple-700/30"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {user && (<div className="relative ml-2 md:ml-4">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 sm:space-x-2 
                    bg-gradient-to-r from-purple-600 to-indigo-600 
                    hover:from-purple-700 hover:to-indigo-700 
                    text-white font-semibold 
                    py-1 px-2 sm:py-1.5 sm:px-3 md:py-1.5 md:px-4 
                    rounded-full transition duration-300 
                    ease-in-out shadow-lg hover:shadow-xl"
            >
              <span className="text-xs sm:text-sm hidden sm:block truncate max-w-[80px] md:max-w-[100px]">
                {user.displayName}
              </span>
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-white shadow-sm"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white text-black rounded-lg shadow-xl z-50 border border-gray-100">
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
                      className="flex w-full text-left px-4 py-2 hover:bg-red-50 items-center space-x-2"
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
        </nav>        {/* Mobile Menu and User Icons */}
        <div className="lg:hidden flex items-center space-x-2 sm:space-x-4"><button
          onClick={toggleTheme}
          className="text-white hover:text-purple-300 dark:hover:text-purple-400 transition duration-300 ease-in-out p-1.5 rounded-full hover:bg-purple-700/30"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
          {user && (<div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 sm:space-x-2 
                    bg-gradient-to-r from-purple-600 to-indigo-600 
                    hover:from-purple-700 hover:to-indigo-700 
                    text-white font-semibold 
                    py-1 px-2 sm:py-1.5 sm:px-3 
                    rounded-full transition duration-300 
                    ease-in-out shadow-md hover:shadow-lg"
            >
              <span className="text-xs sm:text-sm hidden sm:block truncate max-w-[80px]">
                {user.displayName}
              </span>
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white shadow-sm"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white text-black rounded-lg shadow-xl z-50 border border-gray-100">
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
                      className="flex w-full text-left px-4 py-2 hover:bg-red-50 items-center space-x-2"
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
          )}            <button
            className="text-white focus:outline-none p-1 rounded-md hover:bg-purple-700 transition duration-200"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>        {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden mt-3 bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg shadow-xl absolute left-2 right-2 z-50">
          <ul className="flex flex-col space-y-1 p-3">
            {navItems.map((item) => (
              <li key={item.name}>                  <NavLink
                to={item.path} className={({ isActive }) => `
                      flex text-white hover:text-purple-300 
                      dark:hover:text-purple-400 transition 
                      duration-300 ease-in-out py-2.5 px-3 
                      text-sm uppercase tracking-wider 
                      font-medium justify-center items-center
                      rounded-md
                      ${isActive
                    ? "bg-purple-600 bg-opacity-40 border-l-4 border-purple-300 dark:border-purple-400"
                    : ""
                  }
                    `}
                onClick={toggleMenu}
              >                {item.name === "Quiz" && (
                <Brain className="mr-1 h-4 w-4" />
              )}
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
