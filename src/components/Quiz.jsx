import { useState, useContext, useEffect } from "react";
import { MarksContext } from "../context/MarksContext";
import { BookOpen, CheckCircle, XCircle, Award } from "lucide-react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { marks, addMark } = useContext(MarksContext);
  const [currentMark, setCurrentMark] = useState(0);
  
  useEffect(() => {
    const mark = marks.find((mark) => mark.game === "Pi Quiz");
    if (mark) {
      setCurrentMark(mark.score);
    }
  }, [marks]);

  const questions = [
    {
      question: "What is Pi (π) approximately equal to?",
      options: ["3.14159", "2.71828", "1.61803", "4.66920"],
      correctAnswer: "3.14159",
      explanation: "Pi (π) is approximately equal to 3.14159 and represents the ratio of a circle's circumference to its diameter."
    },
    {
      question: "Pi is classified as what type of number?",
      options: ["Natural number", "Rational number", "Irrational number", "Complex number"],
      correctAnswer: "Irrational number",
      explanation: "Pi is an irrational number, which means it cannot be expressed as a fraction and its decimal representation never ends or repeats."
    },
    {
      question: "Who first used the Greek letter π to represent the constant?",
      options: ["Archimedes", "Euler", "William Jones", "Isaac Newton"],
      correctAnswer: "William Jones",
      explanation: "Welsh mathematician William Jones was the first to use the Greek letter π to denote the constant in 1706."
    },
    {
      question: "Which civilization calculated π as (16/9)² ≈ 3.16?",
      options: ["Ancient Greece", "Ancient Egypt", "Ancient China", "Ancient Babylonia"],
      correctAnswer: "Ancient Egypt",
      explanation: "The Ancient Egyptians used a value of (16/9)² ≈ 3.16 for π in calculations, as documented in the Rhind Papyrus."
    },
    {
      question: "In what year did Emma Haruka Iwao and Google calculate π to 100 trillion digits?",
      options: ["2010", "2015", "2020", "2022"],
      correctAnswer: "2022",
      explanation: "In 2022, Emma Haruka Iwao and Google calculated π to 100 trillion digits, setting a new world record."
    },
    {
      question: "Which formula correctly represents the area of a circle?",
      options: ["A = πr", "A = 2πr", "A = πr²", "A = 2πr²"],
      correctAnswer: "A = πr²",
      explanation: "The area of a circle is calculated using the formula A = πr², where r is the radius."
    },
    {
      question: "Which day is celebrated as 'Pi Day'?",
      options: ["March 14", "April 13", "July 22", "January 31"],
      correctAnswer: "March 14",
      explanation: "March 14 (3/14) is celebrated as Pi Day, as the date resembles the first three digits of Pi (3.14)."
    },
    {
      question: "Who proved that π is transcendental?",
      options: ["Archimedes", "Ferdinand von Lindemann", "Johann Lambert", "Leonhard Euler"],
      correctAnswer: "Ferdinand von Lindemann",
      explanation: "Ferdinand von Lindemann proved that π is transcendental in 1882, meaning it is not the root of any non-zero polynomial equation with rational coefficients."
    },
    {
      question: "Which of the following mathematical constants is related to Pi in Euler's Identity?",
      options: ["The golden ratio", "Euler's number (e)", "Avogadro's number", "The Fibonacci sequence"],
      correctAnswer: "Euler's number (e)",
      explanation: "Euler's Identity (e^(iπ) + 1 = 0) connects five fundamental mathematical constants, including Pi and Euler's number e."
    },
    {
      question: "Which method involves dropping needles on lined paper to estimate π?",
      options: ["Monte Carlo method", "Buffon's Needle", "Gauss-Legendre algorithm", "Ramanujan's infinite series"],
      correctAnswer: "Buffon's Needle",
      explanation: "Buffon's Needle is a method for estimating π by dropping needles on a lined paper and calculating the probability of the needles crossing a line."
    }
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      addMark("Pi Quiz", 10); // Add 10 marks for each correct answer
    }
    
    const nextQuestion = currentQuestion + 1;
    
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const progressPercentage = (currentQuestion / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-600 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {!quizCompleted ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2">
              <div 
                className="h-2 bg-gradient-to-r from-blue-500 to-purple-600" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            {/* Question header */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded-full">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  Score: {score}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {questions[currentQuestion].question}
              </h2>
            </div>
            
            {/* Options */}
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedAnswer === option
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700"
                    }`}
                    disabled={showResult}
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-white">
                      {option}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Result display after answering */}
              {showResult && (
                <div className={`mt-6 p-4 rounded-lg ${
                  selectedAnswer === questions[currentQuestion].correctAnswer
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                }`}>
                  <div className="flex items-start">
                    {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                      <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <p className={`font-semibold ${
                        selectedAnswer === questions[currentQuestion].correctAnswer
                          ? "text-green-700 dark:text-green-400" 
                          : "text-red-700 dark:text-red-400"
                      }`}>
                        {selectedAnswer === questions[currentQuestion].correctAnswer 
                          ? "Correct!" 
                          : `Incorrect. The correct answer is: ${questions[currentQuestion].correctAnswer}`}
                      </p>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        {questions[currentQuestion].explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="mt-8 flex justify-end">
                {!showResult && selectedAnswer ? (
                  <button
                    onClick={handleShowResult}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Check Answer
                  </button>
                ) : showResult ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Award className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Quiz Completed!
              </h2>
              <p className="text-xl font-medium mb-2">
                Your Score: <span className="text-blue-600 dark:text-blue-400">{score}</span> out of {questions.length}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {score === questions.length 
                  ? "Perfect score! You're a Pi expert!"
                  : score >= questions.length * 0.7 
                  ? "Great job! You know Pi very well!"
                  : "Good effort! Keep learning about Pi!"}
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <a
                  href="/history"
                  className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Learn More About Pi
                </a>
              </div>
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  Total Points Earned: {currentMark}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;