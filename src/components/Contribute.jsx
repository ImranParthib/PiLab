import { ArrowRight, Book, Code, Edit, MessageSquare, Users } from "lucide-react";

const Contribute = () => {
  const contributionWays = [
    {
      title: "Content Creation",
      description: "Develop articles, lessons, or educational materials about Pi and related mathematical concepts",
      icon: <Edit className="h-10 w-10 text-indigo-500" />,
      examples: [
        "Write an article on Pi in different number bases",
        "Create a lesson plan for high school students",
        "Develop instructional materials for younger students"
      ]
    },
    {
      title: "Code Development",
      description: "Contribute to our interactive tools, visualizations, or create new software for exploring Pi",
      icon: <Code className="h-10 w-10 text-blue-500" />,
      examples: [
        "Improve our Pi calculation algorithms",
        "Create new interactive visualizations",
        "Develop educational games around Pi"
      ]
    },
    {
      title: "Research",
      description: "Explore mathematical aspects of Pi or conduct educational research on how students learn about Pi",
      icon: <Book className="h-10 w-10 text-purple-500" />,
      examples: [
        "Investigate patterns in Pi's digits",
        "Research effective teaching methods for irrational numbers",
        "Study historical calculation methods used for Pi"
      ]
    },
    {
      title: "Community Engagement",
      description: "Help grow our community through events, outreach, and social media",
      icon: <Users className="h-10 w-10 text-green-500" />,
      examples: [
        "Organize Pi Day events",
        "Connect PiLab with schools and universities",
        "Promote Pi education on social media"
      ]
    }
  ];

  const studentProjects = [
    {
      title: "Digital Pi Art Gallery",
      student: "Aisha Johnson",
      description: "Created a website showcasing mathematical art generated from Pi's digits",
      impact: "Helped thousands of visitors appreciate the beauty in mathematical patterns"
    },
    {
      title: "Pi Calculation Methodology Comparison",
      student: "Marco Chen",
      description: "Researched and documented different methods for calculating Pi throughout history",
      impact: "Now used as a reference material in several university mathematics courses"
    },
    {
      title: "Elementary Pi Curriculum",
      student: "Sophia Rodriguez",
      description: "Developed lesson plans introducing Pi concepts to elementary students",
      impact: "Adopted by over 30 elementary schools nationwide"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Contribute to PiLab
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Join our community of students, educators, and enthusiasts in developing educational resources about Pi and mathematics
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="#ways-to-contribute"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-700 text-lg font-bold rounded-full shadow-lg hover:bg-indigo-50 transition duration-300"
            >
              How You Can Contribute
              <ArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Contribute Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Why Contribute to PiLab?</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              PiLab is more than just a website—it's a collaborative community dedicated to making mathematical education 
              accessible, engaging, and inspiring. When you contribute to PiLab, you help build a valuable resource for 
              students around the world while developing your own skills and knowledge.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-indigo-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-indigo-700 dark:text-indigo-300">Benefits for You</h3>
                <ul className="space-y-2 text-gray-800 dark:text-gray-200">
                  <li>Enhance your understanding of mathematical concepts</li>
                  <li>Build your portfolio and demonstrate your expertise</li>
                  <li>Collaborate with other passionate learners and educators</li>
                  <li>Make a meaningful impact on mathematics education</li>
                  <li>Receive mentorship from experienced mathematicians</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300">Benefits for the Community</h3>
                <ul className="space-y-2 text-gray-800 dark:text-gray-200">
                  <li>Expand the range of educational resources available</li>
                  <li>Increase accessibility of mathematical concepts</li>
                  <li>Develop innovative teaching and learning tools</li>
                  <li>Create a community of mathematical exploration</li>
                  <li>Inspire the next generation of mathematicians</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ways to Contribute */}
      <section id="ways-to-contribute" className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">
              Get Involved
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
              Ways to Contribute
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whatever your skills and interests, there's a way for you to make a difference in our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contributionWays.map((way, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {way.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{way.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{way.description}</p>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Examples:</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                      {way.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
              Success Stories
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
              Student Contributors Making an Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentProjects.map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-indigo-600 dark:text-indigo-300 font-medium mb-4">{project.student}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Impact:</h4>
                  <p className="text-gray-900 dark:text-white">{project.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <MessageSquare className="h-12 w-12 text-indigo-200" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Contact us to discuss how you can contribute to PiLab and join our community of mathematical enthusiasts
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition duration-300 ease-in-out"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="https://github.com/pilab/pilab"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-500 transition duration-300 ease-in-out"
            >
              View GitHub Repository
              <Code className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contribute;