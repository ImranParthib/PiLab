import React, { useRef, useState, useEffect, useContext } from "react";
import { MarksContext } from "../context/MarksContext";
import {
  Play, Square, RotateCcw, Pause, PlusCircle, Info,
  BookOpen, ChevronDown, ChevronUp, Circle, Award
} from "lucide-react";

const VisualDemonstrations = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [insideCircle, setInsideCircle] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [piEstimate, setPiEstimate] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(10); // Points per animation frame
  const [selectedDemo, setSelectedDemo] = useState("monte-carlo");
  const [expandedInfo, setExpandedInfo] = useState(null);
  const animationRef = useRef(null);
  const [accuracy, setAccuracy] = useState(0);
  const [autoPoints, setAutoPoints] = useState(false);
  const [autoPointsInterval, setAutoPointsInterval] = useState(null);
  const [batchSize, setBatchSize] = useState(10);

  const { marks, addMark } = useContext(MarksContext);
  const [currentMark, setCurrentMark] = useState(0);

  useEffect(() => {
    const mark = marks.find((mark) => mark.game === "Visual Demonstrations");
    if (mark) {
      setCurrentMark(mark.score);
    }
  }, [marks]);

  // Handle animation loop for Monte Carlo simulation
  useEffect(() => {
    if (isRunning && selectedDemo === "monte-carlo") {
      let count = 0;

      const animate = () => {
        for (let i = 0; i < speed; i++) {
          addPointToCanvas();
        }

        count++;
        // Add points every 10 frames to prevent too many mark updates
        if (count % 10 === 0) {
          addMark("Visual Demonstrations", 1);
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isRunning, speed, selectedDemo]);

  // Handle auto-adding points with interval
  useEffect(() => {
    if (autoPoints && !isRunning) {
      const interval = setInterval(() => {
        for (let i = 0; i < batchSize; i++) {
          addPointToCanvas();
        }
      }, 500);

      setAutoPointsInterval(interval);

      return () => {
        clearInterval(interval);
      };
    } else if (!autoPoints && autoPointsInterval) {
      clearInterval(autoPointsInterval);
      setAutoPointsInterval(null);
    }
  }, [autoPoints, batchSize, isRunning]);

  // Update canvas based on selected demo and points
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY);

    // Clear canvas
    context.clearRect(0, 0, width, height);
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // Draw based on selected demo
    switch (selectedDemo) {
      case "monte-carlo":
        // Draw square boundary
        context.strokeStyle = "#3b82f6"; // blue
        context.lineWidth = 2;
        context.strokeRect(0, 0, width, height);

        // Draw circle
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.strokeStyle = "#8b5cf6"; // purple
        context.stroke();

        // Draw points
        points.forEach((point) => {
          context.fillStyle = point.inside ? "#10b981" : "#ef4444"; // green : red
          context.beginPath();
          context.arc(point.x, point.y, 2, 0, Math.PI * 2);
          context.fill();
        });

        // Show ratio information
        context.fillStyle = "#1f2937"; // dark gray
        context.font = "14px Arial";
        context.fillText(`Points in circle: ${insideCircle}`, 10, 20);
        context.fillText(`Total points: ${totalPoints}`, 10, 40);
        context.fillText(`Ratio: ${insideCircle}/${totalPoints} = ${(insideCircle / totalPoints).toFixed(6)}`, 10, 60);
        context.fillText(`π estimate: ${piEstimate.toFixed(6)}`, 10, 80);
        break;

      case "circle-area":
        // Draw grid background
        drawGrid(context, width, height);

        // Draw circle
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.strokeStyle = "#8b5cf6"; // purple
        context.lineWidth = 2;
        context.stroke();

        // Add radius and diameter lines
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(centerX + radius, centerY);
        context.strokeStyle = "#ef4444"; // red
        context.stroke();

        context.beginPath();
        context.moveTo(centerX - radius, centerY);
        context.lineTo(centerX + radius, centerY);
        context.strokeStyle = "#3b82f6"; // blue
        context.setLineDash([5, 5]);
        context.stroke();
        context.setLineDash([]);

        // Labels
        context.fillStyle = "#1f2937";
        context.font = "16px Arial";
        context.textAlign = "center";
        context.fillText("r", centerX + radius / 2, centerY - 10);
        context.fillText("d", centerX, centerY - 10);

        // Formula
        context.textAlign = "left";
        context.fillText("Area = π × r²", 10, 30);
        context.fillText("π = Area ÷ r²", 10, 60);
        break;

      case "circle-circumference":
        // Draw grid background
        drawGrid(context, width, height);

        // Draw circle
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.strokeStyle = "#8b5cf6"; // purple
        context.lineWidth = 2;
        context.stroke();

        // Draw diameter
        context.beginPath();
        context.moveTo(centerX - radius, centerY);
        context.lineTo(centerX + radius, centerY);
        context.strokeStyle = "#3b82f6"; // blue
        context.lineWidth = 2;
        context.stroke();

        // Draw circumference highlight
        context.beginPath();
        context.arc(centerX, centerY, radius, -Math.PI / 4, Math.PI / 4);
        context.strokeStyle = "#ef4444"; // red
        context.lineWidth = 4;
        context.stroke();

        // Labels
        context.fillStyle = "#1f2937";
        context.font = "16px Arial";
        context.textAlign = "center";
        context.fillText("d", centerX, centerY + 20);
        context.fillText("C", centerX + radius * 0.7, centerY - radius * 0.7);

        // Formula
        context.textAlign = "left";
        context.fillText("Circumference = π × d", 10, 30);
        context.fillText("π = Circumference ÷ d", 10, 60);
        break;
    }

    // Calculate accuracy if we have enough points for Monte Carlo
    if (selectedDemo === "monte-carlo" && totalPoints > 0) {
      const currentAccuracy = 100 - (Math.abs(Math.PI - piEstimate) / Math.PI * 100);
      setAccuracy(currentAccuracy);
    }
  }, [points, selectedDemo, insideCircle, totalPoints, piEstimate]);

  // Helper function to draw grid
  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = "#e5e7eb"; // light gray
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x <= width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const addPointToCanvas = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const inside =
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <=
      Math.pow(Math.min(centerX, centerY), 2);

    setPoints(prevPoints => {
      // Keep points array manageable by limiting to 2000 points
      const newPoints = [...prevPoints, { x, y, inside }];
      if (newPoints.length > 2000) {
        return newPoints.slice(newPoints.length - 2000);
      }
      return newPoints;
    });

    setTotalPoints(prev => prev + 1);
    if (inside) {
      setInsideCircle(prev => prev + 1);
    }

    // Update pi estimate
    const newInsideCircle = inside ? insideCircle + 1 : insideCircle;
    const newTotalPoints = totalPoints + 1;
    const pi = (newInsideCircle / newTotalPoints) * 4;
    setPiEstimate(pi);
  };

  const addPoint = () => {
    addPointToCanvas();

    // Only add marks when manually adding points, not during animation
    if (!isRunning && !autoPoints) {
      addMark("Visual Demonstrations", 1);
    }
  };

  const addMultiplePoints = (count) => {
    for (let i = 0; i < count; i++) {
      addPointToCanvas();
    }

    // Add marks based on how many points were added
    addMark("Visual Demonstrations", Math.ceil(count / 10));
  };

  const toggleRunning = () => {
    if (isRunning) {
      setIsRunning(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      setIsRunning(true);
    }
  };

  const reset = () => {
    setPoints([]);
    setInsideCircle(0);
    setTotalPoints(0);
    setPiEstimate(0);
    setAccuracy(0);

    // Stop animation if running
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Stop auto points if running
    setAutoPoints(false);
    if (autoPointsInterval) {
      clearInterval(autoPointsInterval);
      setAutoPointsInterval(null);
    }
  };

  const toggleInfo = (infoKey) => {
    if (expandedInfo === infoKey) {
      setExpandedInfo(null);
    } else {
      setExpandedInfo(infoKey);
    }
  };

  const demoDescriptions = {
    "monte-carlo": {
      title: "Monte Carlo Method",
      description: "This method uses random points to estimate π based on the ratio of points that fall inside a circle versus the total points within a square. Since the ratio of the circle's area to the square's area is π/4, we can estimate π as 4 times this ratio.",
      steps: [
        "Generate random points within a square",
        "Count how many points fall inside the circle",
        "Calculate: π ≈ 4 × (points inside circle) ÷ (total points)"
      ]
    },
    "circle-area": {
      title: "Circle Area Relation",
      description: "The area of a circle is given by A = πr². This equation defines π as the ratio of a circle's area to the square of its radius.",
      steps: [
        "For any circle, measure its area (A)",
        "Measure its radius (r)",
        "Calculate: π = A ÷ r²"
      ]
    },
    "circle-circumference": {
      title: "Circle Circumference Relation",
      description: "The circumference of a circle is given by C = πd, where d is the diameter. This is the original definition of π: the ratio of a circle's circumference to its diameter.",
      steps: [
        "For any circle, measure its circumference (C)",
        "Measure its diameter (d)",
        "Calculate: π = C ÷ d"
      ]
    }
  };

  // Render list of demonstrations
  const renderDemoList = () => {
    return Object.keys(demoDescriptions).map(key => (
      <button
        key={key}
        onClick={() => {
          setSelectedDemo(key);
          reset();
        }}
        className={`px-4 py-2 rounded-md text-sm font-medium ${selectedDemo === key
            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
          }`}
      >
        {demoDescriptions[key].title}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">
        Visual Demonstrations of Pi
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Demo selector */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center">
            <Circle className="h-5 w-5 mr-2 text-purple-500" />
            Demonstrations
          </h2>
          <div className="flex flex-wrap gap-2">
            {renderDemoList()}
          </div>
        </div>

        {/* Current demo description */}
        <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
              {demoDescriptions[selectedDemo].title}
            </h3>
            <button
              onClick={() => toggleInfo("description")}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
            >
              {expandedInfo === "description" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {expandedInfo === "description" && (
            <div className="mt-3 text-gray-700 dark:text-gray-300 space-y-3">
              <p>{demoDescriptions[selectedDemo].description}</p>
              <div>
                <h4 className="font-medium mb-1">Steps:</h4>
                <ol className="list-decimal list-inside">
                  {demoDescriptions[selectedDemo].steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Canvas container */}
        <div className="mb-6">
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            className="border border-gray-300 dark:border-gray-600 rounded w-full h-auto bg-white"
          ></canvas>
        </div>

        {/* Controls */}
        {selectedDemo === "monte-carlo" && (
          <>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={toggleRunning}
                    className={`flex items-center px-3 py-2 rounded ${isRunning
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      }`}
                  >
                    {isRunning ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                    {isRunning ? "Pause" : "Run Simulation"}
                  </button>

                  <button
                    onClick={addPoint}
                    disabled={isRunning}
                    className={`flex items-center px-3 py-2 rounded ${isRunning
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Point
                  </button>

                  <button
                    onClick={reset}
                    className="flex items-center px-3 py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      Simulation Speed: {speed} points per frame
                    </label>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="auto-points"
                    type="checkbox"
                    checked={autoPoints}
                    onChange={() => setAutoPoints(!autoPoints)}
                    disabled={isRunning}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="auto-points" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Auto-add points (slower but less intensive)
                  </label>
                </div>

                {autoPoints && (
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                      Batch size: {batchSize} points every 0.5s
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={batchSize}
                      onChange={(e) => setBatchSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => addMultiplePoints(100)}
                    disabled={isRunning}
                    className={`px-2 py-1 text-xs rounded ${isRunning
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                  >
                    +100
                  </button>
                  <button
                    onClick={() => addMultiplePoints(1000)}
                    disabled={isRunning}
                    className={`px-2 py-1 text-xs rounded ${isRunning
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                  >
                    +1,000
                  </button>
                  <button
                    onClick={() => addMultiplePoints(10000)}
                    disabled={isRunning}
                    className={`px-2 py-1 text-xs rounded ${isRunning
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                  >
                    +10,000
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Results</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Points inside circle:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{insideCircle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Total points:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{totalPoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Ratio:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {totalPoints > 0 ? (insideCircle / totalPoints).toFixed(6) : "0"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">π estimate:</span>
                    <span className="font-bold text-purple-700 dark:text-purple-300">
                      {piEstimate.toFixed(6)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Actual π:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">3.141593</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Accuracy:</span>
                    <span className={`font-medium ${accuracy > 99
                        ? "text-green-600 dark:text-green-400"
                        : accuracy > 95
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                      }`}>
                      {accuracy.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mathematical significance section */}
        <div className="mb-6">
          <button
            onClick={() => toggleInfo("math-significance")}
            className="flex items-center justify-between w-full px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30"
          >
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>Mathematical Significance of π</span>
            </div>
            {expandedInfo === "math-significance" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {expandedInfo === "math-significance" && (
            <div className="mt-3 p-4 bg-white dark:bg-gray-700 border border-blue-100 dark:border-blue-800 rounded-lg">
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                <p>
                  Pi (π) is one of mathematics' most important constants, defined as the ratio of a circle's circumference to its diameter.
                  It appears in countless mathematical formulas beyond just circle calculations.
                </p>
                <h4>Some key appearances of π:</h4>
                <ul className="list-disc pl-5">
                  <li>The area of a circle: A = πr²</li>
                  <li>The volume of a sphere: V = (4/3)πr³</li>
                  <li>Euler's Identity: e^(iπ) + 1 = 0</li>
                  <li>Normal distribution (bell curve): f(x) = (1/σ√(2π)) e^(-(x-μ)²/(2σ²))</li>
                  <li>Heisenberg's uncertainty principle in quantum physics: ΔxΔp ≥ ħ/2</li>
                </ul>
                <p>
                  What makes π fascinating is that it's an irrational number—its decimal representation never ends or repeats.
                  It's also transcendental, meaning it can't be expressed as the root of any polynomial equation with rational coefficients.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Points display */}
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <Award className="h-5 w-5 text-indigo-500 mr-2" />
            <h3 className="font-medium text-indigo-800 dark:text-indigo-300">
              Points Earned: {currentMark}
            </h3>
          </div>
          <div className="text-sm text-indigo-600 dark:text-indigo-400">
            {selectedDemo === "monte-carlo" && "Earn points by adding data points"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualDemonstrations;
