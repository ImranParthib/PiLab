import React, { useState, useContext, useEffect } from "react";
import { MarksContext } from "../context/MarksContext";
import { BookOpen, Award, RefreshCw, HelpCircle, CheckCircle2, XCircle, Info } from "lucide-react";

const PiMemorization = () => {
  // Extended Pi digits (100 digits)
  const piDigits = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(true);
  const [showDigitIndex, setShowDigitIndex] = useState(false);
  const { marks, addMark } = useContext(MarksContext);
  const [currentMark, setCurrentMark] = useState(0);
  const [hint, setHint] = useState("");
  const [highestReached, setHighestReached] = useState(0);
  const [mode, setMode] = useState("practice"); // practice or challenge
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const mark = marks.find((mark) => mark.game === "Pi Memorization");
    if (mark) {
      setCurrentMark(mark.score);
    }
  }, [marks]);

  // Update highest reached whenever input grows and is correct
  useEffect(() => {
    if (correct && input.length > highestReached) {
      setHighestReached(input.length);
    }
  }, [input, correct, highestReached]);

  const handleChange = (e) => {
    const value = e.target.value;

    // Only allow numbers and one decimal point
    if (!/^[0-9.]*$/.test(value)) return;
    if (value.split('.').length > 2) return;

    setInput(value);
    const isInputCorrect = piDigits.startsWith(value);
    setCorrect(isInputCorrect);

    // Clear hint when typing
    if (hint && value.length > input.length) {
      setHint("");
    }

    // Add marks every 5 correct digits (but only in challenge mode)
    if (mode === "challenge" && isInputCorrect && value.length % 5 === 0 && value.length > 0) {
      // Give more points for higher digits
      const basePoints = 5;
      const levelMultiplier = Math.floor(value.length / 10) + 1;
      const points = basePoints * levelMultiplier;

      addMark("Pi Memorization", points);

      // Show positive feedback
      setFeedback({
        type: "success",
        message: `Great job! +${points} points for reaching ${value.length} digits!`
      });

      // Clear feedback after a short delay
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const reset = () => {
    setInput("");
    setCorrect(true);
    setHint("");
    setFeedback(null);
  };

  const showHint = () => {
    const nextDigitIndex = input.length;
    const nextDigit = piDigits[nextDigitIndex];

    // If in challenge mode, deduct 1 point for using hint
    if (mode === "challenge") {
      addMark("Pi Memorization", -1);
      setHint(`The next digit is ${nextDigit}. (-1 point for using hint)`);
    } else {
      setHint(`The next digit is ${nextDigit}. Try to remember it!`);
    }
  };

  const switchMode = () => {
    setMode(mode === "practice" ? "challenge" : "practice");
    reset();
  };

  // Create chunks of pi digits for better readability
  const formatPiDigits = (digits, chunkSize = 5) => {
    if (!digits || digits.length <= 2) return digits; // Return as is if it's just "3." or less

    // Keep the "3." part separate
    const start = digits.substring(0, 2);
    const rest = digits.substring(2);

    // Split the rest into chunks
    const chunks = [];
    for (let i = 0; i < rest.length; i += chunkSize) {
      chunks.push(rest.substring(i, i + chunkSize));
    }

    return start + chunks.join(" ");
  };

  // For highlighting where the user is in the pi digits
  const renderPiDigits = () => {
    if (input.length === 0) return formatPiDigits(piDigits.substring(0, 20)) + "...";

    // Determine the range of digits to show
    const startIndex = Math.max(0, input.length - 10);
    const endIndex = Math.min(piDigits.length, input.length + 30);

    // Create the formatted string with highlight
    return (
      <div className="font-mono">
        {formatPiDigits(piDigits.substring(0, startIndex))}
        <span className="bg-green-200 dark:bg-green-800 px-1">
          {formatPiDigits(piDigits.substring(startIndex, input.length))}
        </span>
        <span className={correct ? "text-green-600 dark:text-green-400 font-bold" : "text-red-600 dark:text-red-400 font-bold"}>
          {formatPiDigits(piDigits.substring(input.length, endIndex))}
        </span>
        ...
      </div>
    );
  };

  const renderMnemonicHelp = () => (
    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
        <BookOpen className="h-4 w-4 mr-2" />
        Memorization Techniques
      </h4>
      <div className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
        <p>
          <strong>Chunking:</strong> Break digits into smaller groups (like phone numbers): 3.14159 → 3.14 | 159...
        </p>
        <p>
          <strong>Mnemonics:</strong> Create a phrase where word lengths match PI digits:
          "<u>M</u>ay <u>I</u> <u>h</u>ave <u>a</u> <u>l</u>arge <u>c</u>ontainer <u>o</u>f <u>c</u>offee?" = 3.1415926
        </p>
        <p>
          <strong>Visualization:</strong> Associate digits with images or create a memory journey.
        </p>
        <p>
          <strong>Practice regularly:</strong> Short daily practice is better than occasional long sessions.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">
        Pi Memorization Tool
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        {/* Mode selector */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {mode === "practice" ? "Practice Mode" : "Challenge Mode"}
          </h2>
          <button
            onClick={switchMode}
            className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800/30"
          >
            <RefreshCw className="h-3 w-3" />
            Switch to {mode === "practice" ? "Challenge" : "Practice"}
          </button>
        </div>

        {mode === "practice" && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm text-blue-800 dark:text-blue-300">
            <div className="flex">
              <Info className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>Practice Mode: Learn at your own pace with no pressure. Use hints freely to build your memory.</p>
            </div>
          </div>
        )}

        {mode === "challenge" && (
          <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded text-sm text-purple-800 dark:text-purple-300">
            <div className="flex">
              <Award className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>Challenge Mode: Earn points for every 5 digits correctly memorized. Using hints costs 1 point.</p>
            </div>
          </div>
        )}

        {/* Pi digits preview */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Pi Digits:</h3>
            <button
              onClick={() => setShowDigitIndex(!showDigitIndex)}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              {showDigitIndex ? "Hide" : "Show"} digit positions
            </button>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 overflow-x-auto whitespace-nowrap">
            {showDigitIndex && (
              <div className="text-xs text-gray-400 dark:text-gray-500 mb-1 font-mono">
                Positions: 0123456789012345678901234567890
              </div>
            )}
            {renderPiDigits()}
          </div>
        </div>

        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Enter digits of Pi:
        </label>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Start with 3.14..."
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline ${correct
              ? "border-green-500 dark:border-green-600"
              : "border-red-500 dark:border-red-600"
            }`}
        />

        {/* Feedback message */}
        {feedback && (
          <div className={`mt-3 p-2 rounded text-sm flex items-center
            ${feedback.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
              : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
            }`}
          >
            {feedback.type === "success"
              ? <CheckCircle2 className="h-4 w-4 mr-2" />
              : <XCircle className="h-4 w-4 mr-2" />
            }
            {feedback.message}
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={showHint}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            Hint
          </button>
          <button
            onClick={reset}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset
          </button>
        </div>

        {/* Display hint */}
        {hint && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-lg">
            {hint}
          </div>
        )}

        {/* Status message */}
        <div className="mt-4 flex items-center">
          {correct ? (
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 dark:text-green-400" />
          ) : (
            <XCircle className="h-5 w-5 mr-2 text-red-500 dark:text-red-400" />
          )}
          <p className={`${correct ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
            {correct
              ? input.length > 0
                ? `Correct! You've memorized ${input.length} digits. Keep going!`
                : "Start typing the digits of Pi beginning with 3.14..."
              : "Incorrect, try again!"
            }
          </p>
        </div>

        {/* Stats section */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-1">Your Record</h3>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {highestReached} <span className="text-sm font-normal">digits</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-1">Total Points</h3>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {currentMark} <span className="text-sm font-normal">pts</span>
            </div>
          </div>
        </div>

        {/* Memorization techniques toggle */}
        <div className="mt-6">
          <button
            onClick={() => setShowMnemonic(!showMnemonic)}
            className="flex items-center w-full justify-between px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30"
          >
            <span className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Memorization Tips & Techniques
            </span>
            <span>{showMnemonic ? "−" : "+"}</span>
          </button>

          {showMnemonic && renderMnemonicHelp()}
        </div>
      </div>
    </div>
  );
};

export default PiMemorization;
