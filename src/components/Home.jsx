import { ArrowRight, BookOpen, Calculator, PieChart, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
              Welcome to <span className="text-purple-600 dark:text-purple-400">PiLab</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              Explore the fascinating history of Pi, learn mathematical concepts, and contribute to Pi-related projects on our interactive educational platform
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href="/history"
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition duration-300 ease-in-out"
              >
                Explore Pi History
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-purple-600 text-sm sm:text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 dark:text-purple-400 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                Try Learning Tools
                <Calculator className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Pi Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">What is Pi (π)?</h2>
            <div className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <p>Pi (π) is the ratio of a circle&apos;s circumference to its diameter. It&apos;s an irrational number that continues infinitely without repeating, approximately equal to 3.14159.</p>
              <p className="mt-4">For over 4,000 years, mathematicians have been fascinated by this mysterious constant that appears throughout mathematics and physics.</p>
            </div>
          </div>          <div className="flex justify-center mb-8">
            <div className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 tracking-wider overflow-x-auto max-w-full px-2">
              <div className="whitespace-nowrap overflow-hidden text-ellipsis">3.14159265358979323846...</div>
            </div>
          </div>
        </div>
      </section>      {/* Features Section */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-purple-50 dark:bg-gray-900" id="features">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6 sm:mb-8 md:mb-12">
            Discover Pi with Our Learning Platform
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {[
              {
                icon: <BookOpen className="h-8 w-8 text-purple-500 dark:text-purple-400" />,
                title: "History of Pi",
                description: "Journey through time and explore how Pi was discovered and calculated across different civilizations"
              },
              {
                icon: <Calculator className="h-8 w-8 text-purple-500 dark:text-purple-400" />,
                title: "Interactive Tools",
                description: "Engage with our interactive calculators and visualizations to understand Pi through hands-on learning"
              },
              {
                icon: <PieChart className="h-8 w-8 text-purple-500 dark:text-purple-400" />,
                title: "Learning Challenges",
                description: "Test your knowledge with memorization challenges and mathematical puzzles related to Pi"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Join Community Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 dark:from-purple-900 dark:to-indigo-900 py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Users className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-200" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4">
            Join Our Community of Pi Enthusiasts
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Connect with fellow students, share your discoveries, and contribute to our growing collection of Pi-related resources
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 dark:text-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 transition duration-300 ease-in-out"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href="/contribute"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-white text-sm sm:text-base font-medium rounded-md text-white hover:bg-purple-600 transition duration-300 ease-in-out"
            >
              Contribute
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
