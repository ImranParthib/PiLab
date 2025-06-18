import { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (isVisible && (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-gradient-to-br from-teal-400 to-teal-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transform transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-50 z-50"
      aria-label="Back to Top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7-7-7 7M12 4v16"
        />
      </svg>
    </button>
  )
  );
};

export default BackToTopButton;
