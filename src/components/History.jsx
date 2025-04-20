import { ArrowRight, BookOpen, Clock } from "lucide-react";

const History = () => {
  const timelineEvents = [
    {
      year: "1900 BCE",
      civilization: "Ancient Babylonia",
      description: "The earliest implicit use of π appeared on a clay tablet where Babylonians calculated the circumference of a circle with a value of 3.125.",
      significance: "First recorded approximation of Pi"
    },
    {
      year: "1650 BCE",
      civilization: "Ancient Egypt",
      description: "The Rhind Papyrus showed Egyptians used a value of (16/9)² ≈ 3.16 for π in calculations.",
      significance: "Pi used in practical applications for architecture"
    },
    {
      year: "250 BCE",
      civilization: "Ancient Greece",
      description: "Archimedes used polygons with 96 sides to establish that 3.14085 < π < 3.14286.",
      significance: "First theoretical calculation method for Pi"
    },
    {
      year: "500 CE",
      civilization: "Ancient China",
      description: "Chinese mathematician Zu Chongzhi calculated π to seven decimal places (3.1415926).",
      significance: "Most accurate calculation for nearly 1,000 years"
    },
    {
      year: "1400 CE",
      civilization: "India",
      description: "Madhava of Sangamagrama developed infinite series for π and calculated it to 11 decimal places.",
      significance: "Pioneered infinite series method for calculating Pi"
    },
    {
      year: "1706",
      civilization: "Europe",
      description: "Welsh mathematician William Jones first used the Greek letter π to denote the constant.",
      significance: "Introduction of π symbol used today"
    },
    {
      year: "1761",
      civilization: "Europe",
      description: "Johann Heinrich Lambert proved that π is irrational.",
      significance: "Confirmed Pi never terminates or repeats"
    },
    {
      year: "1882",
      civilization: "Europe",
      description: "Ferdinand von Lindemann proved that π is transcendental.",
      significance: "Proved the impossibility of 'squaring the circle'"
    },
    {
      year: "1949",
      civilization: "Modern Era",
      description: "ENIAC computer calculated π to 2,037 decimal places.",
      significance: "First computer calculation of Pi"
    },
    {
      year: "2022",
      civilization: "Modern Era",
      description: "Emma Haruka Iwao and Google calculated π to 100 trillion digits.",
      significance: "Current record for most digits calculated"
    }
  ];

  const mathematicalRelations = [
    {
      name: "Circle Relationships",
      formula: "C = 2πr, A = πr²",
      description: "The circumference (C) of a circle equals 2πr, and the area (A) equals πr², where r is the radius."
    },
    {
      name: "Euler's Identity",
      formula: "e^(iπ) + 1 = 0",
      description: "Connects five fundamental constants in mathematics in a single equation."
    },
    {
      name: "Leibniz Formula",
      formula: "π/4 = 1 - 1/3 + 1/5 - 1/7 + ...",
      description: "An infinite series that converges to π/4, though very slowly."
    },
    {
      name: "Buffon's Needle",
      formula: "P = 2l/πd",
      description: "A probability problem where dropping needles on a lined surface can be used to estimate π."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-900 dark:to-purple-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            The Remarkable History of Pi (π)
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Journey through 4,000 years of mathematical discovery as civilizations across the globe pursued the mysterious number that connects all circles
          </p>
          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center px-6 py-3 bg-white text-blue-700 text-lg font-bold rounded-full shadow-lg">
              <Clock className="mr-2" size={24} />
              4,000+ Years of Mathematical Discovery
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Understanding Pi</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Pi (π) is the ratio of a circle's circumference to its diameter, approximately equal to 3.14159. It is one of the most important and fascinating 
              mathematical constants, appearing throughout mathematics, physics, engineering, and countless natural phenomena.
            </p>
            <p>
              What makes Pi truly remarkable is that it's an irrational number—it cannot be expressed as a simple fraction, and its decimal representation never 
              ends or repeats. Even more fascinating, it's a transcendental number, which means it is not the root of any non-zero polynomial equation with rational coefficients.
            </p>
            <p>
              The quest to understand and calculate Pi has driven mathematical innovation across civilizations for thousands of years, from ancient 
              Babylonia to modern supercomputers.
            </p>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              Through the Ages
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
              The Timeline of Pi
            </h2>
          </div>

          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-300 dark:bg-blue-800 z-0"></div>

            <div className="relative z-10">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`mb-12 flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-blue-100 dark:border-gray-900 z-10"></div>
                  </div>
                  <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md md:w-1/2 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                    <div className="font-semibold text-blue-800 dark:text-blue-400 text-lg mb-1">{event.year}</div>
                    <div className="font-bold text-lg mb-2">{event.civilization}</div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{event.description}</p>
                    <div className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full">
                      {event.significance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mathematical Relationships */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
              Mathematical Beauty
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
              Key Mathematical Relationships
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mathematicalRelations.map((relation, index) => (
              <div key={index} className="bg-purple-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{relation.name}</h3>
                <div className="p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg font-mono text-center text-lg font-semibold">
                  {relation.formula}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{relation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pi in Culture */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              Beyond Mathematics
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
              Pi in Culture and Society
            </h2>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Pi has transcended its mathematical origins to become a cultural icon. March 14 (3/14) is celebrated as "Pi Day" around the world, 
              with mathematics enthusiasts celebrating with pi-themed activities and, of course, pie.
            </p>
            <p>
              The quest to memorize digits of Pi has become a competitive sport. The current world record is held by Rajveer Meena, who recited 70,000 
              digits of Pi from memory in 2015, taking nearly 10 hours.
            </p>
            <p>
              Pi has inspired countless works of art, literature, and even music. Some composers have assigned musical notes to digits of Pi to create 
              "Pi symphonies." The mystery and beauty of this infinite, non-repeating number continues to captivate people worldwide, making it perhaps the 
              most famous mathematical constant.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-900 dark:to-purple-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <BookOpen className="h-12 w-12 text-blue-200" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Continue Your Journey With Pi
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Explore our interactive tools and challenges to deepen your understanding of this fascinating mathematical constant
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/pi-calculator"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition duration-300 ease-in-out"
            >
              Try Pi Calculator
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/pi-memorization"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Pi Memorization Challenge
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;