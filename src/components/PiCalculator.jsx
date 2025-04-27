import React, { useState, useContext, useEffect, useRef } from "react";
import { MarksContext } from "../context/MarksContext";
import { Calculator, Loader, AlertTriangle, Info } from "lucide-react";

const PiCalculator = () => {
  const [iterations, setIterations] = useState(1000);
  const [piEstimate, setPiEstimate] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationMethod, setCalculationMethod] = useState("monte-carlo");
  const [error, setError] = useState(null);
  const [showVisual, setShowVisual] = useState(false);
  const [points, setPoints] = useState([]);
  const canvasRef = useRef(null);
  const MAX_SAFE_ITERATIONS = 10000000;
  const MAX_VISUAL_POINTS = 5000;

  const { marks, addMark } = useContext(MarksContext);
  const [currentMark, setCurrentMark] = useState(0);

  useEffect(() => {
    const mark = marks.find((mark) => mark.game === "Pi Calculator");
    if (mark) {
      setCurrentMark(mark.score);
    }
  }, [marks]);

  // Draw visual representation when showing visuals or when points change
  useEffect(() => {
    if (showVisual && canvasRef.current && points.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const size = canvas.width;

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Draw circle and square
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, size, size);

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      ctx.strokeStyle = "#8b5cf6";
      ctx.stroke();

      // Draw points
      points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x * size, point.y * size, 2, 0, 2 * Math.PI);
        ctx.fillStyle = point.inside ? "#10b981" : "#ef4444";
        ctx.fill();
      });
    }
  }, [showVisual, points]);

  const calculatePi = () => {
    // Reset states
    setError(null);
    setPiEstimate(null);
    setPoints([]);

    // Validate iterations
    const iterationNum = parseInt(iterations);
    if (isNaN(iterationNum) || iterationNum <= 0) {
      setError("Please enter a valid positive number for iterations");
      return;
    }

    if (iterationNum > MAX_SAFE_ITERATIONS) {
      setError(`For performance reasons, please use ${MAX_SAFE_ITERATIONS} or fewer iterations`);
      return;
    }

    setIsCalculating(true);

    // Use setTimeout to prevent UI freeze and show the loading indicator
    setTimeout(() => {
      try {
        let result;
        switch (calculationMethod) {
          case "monte-carlo":
            result = monteCarloMethod(iterationNum);
            break;
          case "leibniz":
            result = leibnizMethod(iterationNum);
            break;
          case "nilakantha":
            result = nilakanthaMethod(iterationNum);
            break;
          default:
            result = monteCarloMethod(iterationNum);
        }

        setPiEstimate(result);
        addMark("Pi Calculator", 5); // Add 5 marks each time the game is played
      } catch (err) {
        setError("Calculation error: " + err.message);
      } finally {
        setIsCalculating(false);
      }
    }, 100);
  };

  const monteCarloMethod = (iterationNum) => {
    let insideCircle = 0;
    const newPoints = [];
    const visualInterval = Math.max(1, Math.floor(iterationNum / MAX_VISUAL_POINTS));

    for (let i = 0; i < iterationNum; i++) {
      const x = Math.random();
      const y = Math.random();
      const inside = x * x + y * y <= 1;

      if (inside) insideCircle++;

      // Store points for visualization, but limit the number
      if (showVisual && i % visualInterval === 0) {
        newPoints.push({ x, y, inside });
      }
    }

    if (showVisual) {
      setPoints(newPoints);
    }

    return (insideCircle / iterationNum) * 4;
  };

  const leibnizMethod = (iterationNum) => {
    let sum = 0;

    for (let i = 0; i < iterationNum; i++) {
      const term = 1 / (2 * i + 1);
      sum += i % 2 === 0 ? term : -term;
    }

    return 4 * sum;
  };

  const nilakanthaMethod = (iterationNum) => {
    let sum = 3;

    for (let i = 1; i < iterationNum; i++) {
      const term = 4 / (2 * i * (2 * i + 1) * (2 * i + 2));
      sum += i % 2 === 0 ? -term : term;
    }

    return sum;
  };

  const handleMethodChange = (method) => {
    setCalculationMethod(method);
    setPiEstimate(null); // Reset the result when changing method
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Pi Calculator</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-2">
            <Calculator className="h-5 w-5 text-blue-500" />
            Calculation Method
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => handleMethodChange("monte-carlo")}
              className={`px-3 py-2 text-sm font-medium rounded-md ${calculationMethod === "monte-carlo"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              Monte Carlo
            </button>
            <button
              onClick={() => handleMethodChange("leibniz")}
              className={`px-3 py-2 text-sm font-medium rounded-md ${calculationMethod === "leibniz"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              Leibniz Series
            </button>
            <button
              onClick={() => handleMethodChange("nilakantha")}
              className={`px-3 py-2 text-sm font-medium rounded-md ${calculationMethod === "nilakantha"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              Nilakantha Series
            </button>
          </div>

          {calculationMethod === "monte-carlo" && (
            <div className="flex items-center mt-4">
              <input
                id="showVisual"
                type="checkbox"
                checked={showVisual}
                onChange={() => setShowVisual(!showVisual)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="showVisual" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Show visual representation (may slow down calculation)
              </label>
            </div>
          )}

          <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm text-blue-800 dark:text-blue-300">
            <div className="flex">
              <Info className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>
                {calculationMethod === "monte-carlo" && "Monte Carlo method uses random points to estimate π based on the ratio of points inside vs outside a circle."}
                {calculationMethod === "leibniz" && "Leibniz formula: π/4 = 1 - 1/3 + 1/5 - 1/7 + ... (converges slowly)"}
                {calculationMethod === "nilakantha" && "Nilakantha series: π = 3 + 4/(2×3×4) - 4/(4×5×6) + 4/(6×7×8) - ..."}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Number of Iterations:
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              value={iterations}
              onChange={(e) => setIterations(e.target.value)}
              min="1"
              max={MAX_SAFE_ITERATIONS}
              disabled={isCalculating}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={calculatePi}
              disabled={isCalculating}
              className={`flex items-center justify-center px-6 py-2 rounded font-medium ${isCalculating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
            >
              {isCalculating ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Calculating...
                </>
              ) : (
                "Calculate π"
              )}
            </button>
          </div>

          {error && (
            <div className="flex items-start mt-3 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {showVisual && calculationMethod === "monte-carlo" && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Visual Representation
            </h3>
            <div className="border border-gray-300 dark:border-gray-600 rounded">
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="w-full h-auto bg-white"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Green dots are inside the circle, red dots are outside.
              π ≈ 4 × (green dots)/(total dots)
            </p>
          </div>
        )}

        {piEstimate !== null && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Estimated Pi: {piEstimate.toFixed(6)}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Actual value of π: 3.141592653589793...
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Difference: {Math.abs(Math.PI - piEstimate).toFixed(10)}
            </p>
          </div>
        )}

        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded">
          <p className="font-medium text-indigo-800 dark:text-indigo-300">
            Total Points Earned: {currentMark}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PiCalculator;
