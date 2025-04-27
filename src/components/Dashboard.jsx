import { useContext, useState } from "react";
import { auth } from "../../Firebase/firebaseConfig";
import { MarksContext } from "../context/MarksContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from "recharts";
import { Award, ChevronRight, Calculator, BookOpen, Brain, Eye } from "lucide-react";

function Dashboard() {
  const { marks } = useContext(MarksContext);
  const user = auth.currentUser;
  const [activeTab, setActiveTab] = useState("overview");

  const getTotalScore = () => {
    return marks.reduce((total, mark) => total + mark.score, 0);
  };
  
  const getAchievementLevel = (score) => {
    if (score >= 1000) return "Master";
    if (score >= 500) return "Expert";
    if (score >= 200) return "Advanced";
    if (score >= 100) return "Intermediate";
    return "Beginner";
  };
  
  const getNextLevel = (score) => {
    if (score < 100) return { name: "Intermediate", required: 100, remaining: 100 - score };
    if (score < 200) return { name: "Advanced", required: 200, remaining: 200 - score };
    if (score < 500) return { name: "Expert", required: 500, remaining: 500 - score };
    if (score < 1000) return { name: "Master", required: 1000, remaining: 1000 - score };
    return { name: "Grand Master", required: 2000, remaining: 2000 - score };
  };

  const getProgressPercent = (score) => {
    const nextLevel = getNextLevel(score);
    const prevLevel = nextLevel.required - nextLevel.remaining;
    return (score - prevLevel) / (nextLevel.required - prevLevel) * 100;
  };

  const getActivityIcon = (activity) => {
    if (activity.includes("Calculator")) return <Calculator className="h-5 w-5 text-blue-500" />;
    if (activity.includes("Memorization")) return <BookOpen className="h-5 w-5 text-green-500" />;
    if (activity.includes("Quiz")) return <Brain className="h-5 w-5 text-purple-500" />;
    if (activity.includes("Demonstrations")) return <Eye className="h-5 w-5 text-amber-500" />;
    return <ChevronRight className="h-5 w-5 text-gray-500" />;
  };

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const totalScore = getTotalScore();
  const achievementLevel = getAchievementLevel(totalScore);
  const nextLevel = getNextLevel(totalScore);
  const progressPercent = getProgressPercent(totalScore);

  // Sort marks by score (descending)
  const sortedMarks = [...marks].sort((a, b) => b.score - a.score);

  // Prepare data for charts
  const pieChartData = marks.map(mark => ({
    name: mark.game,
    value: mark.score
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {user ? (
          <>
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden mb-8">
              <div className="md:flex">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 md:w-2/5">
                  <div className="flex items-center space-x-6">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                    />
                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        {user.displayName}
                      </h2>
                      <p className="text-indigo-100">{user.email}</p>
                      <div className="mt-3 inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <Award className="h-4 w-4 text-yellow-300 mr-2" />
                        <span className="text-white font-medium">{achievementLevel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-8">
                    <div className="flex justify-between text-indigo-100 text-sm mb-1">
                      <span>Level Progress</span>
                      <span>{nextLevel.name}</span>
                    </div>
                    <div className="w-full bg-indigo-900/30 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500" 
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-indigo-100 text-sm">
                      <span>{nextLevel.remaining} points needed for next level</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 md:w-3/5">
                  <div className="flex space-x-6 mb-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{totalScore}</div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{marks.length}</div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">Activities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                        {marks.length > 0 ? Math.round(totalScore / marks.length) : 0}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">Avg Points</div>
                    </div>
                  </div>
                  
                  {/* Tab Navigation */}
                  <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`py-3 px-4 text-sm font-medium ${
                        activeTab === "overview" 
                          ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("activities")}
                      className={`py-3 px-4 text-sm font-medium ${
                        activeTab === "activities" 
                          ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                      }`}
                    >
                      Activities
                    </button>
                    <button
                      onClick={() => setActiveTab("analytics")}
                      className={`py-3 px-4 text-sm font-medium ${
                        activeTab === "analytics" 
                          ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                      }`}
                    >
                      Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden p-8">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Learning Progress Overview</h3>

                  {marks.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="h-12 w-12 text-indigo-500 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No activities yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                        Start exploring Pi through our interactive tools, quizzes, and challenges to track your progress.
                      </p>
                      <div className="mt-6">
                        <a
                          href="/projects"
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Explore Learning Tools
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Performance by Activity</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sortedMarks} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                              <XAxis type="number" />
                              <YAxis dataKey="game" type="category" width={150} />
                              <Tooltip />
                              <Bar dataKey="score" fill="#8884d8" radius={[0, 4, 4, 0]}>
                                {sortedMarks.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Points Distribution</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {pieChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                <LabelList dataKey="name" position="outside" />
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === "activities" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Your Activities</h3>
                  
                  {marks.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-600 dark:text-gray-400">No activities recorded yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                          {sortedMarks.map((mark, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0">
                                    {getActivityIcon(mark.game)}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{mark.game}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">{mark.score} points</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <a
                                  href={`/${mark.game.toLowerCase().replace(' ', '-')}`}
                                  className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-800/40"
                                >
                                  Continue
                                  <ChevronRight className="ml-1 h-3 w-3" />
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === "analytics" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Analytics & Insights</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Achievement Card */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 dark:text-white">Current Achievement Level</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Based on your total points</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
                          <Award className="h-6 w-6 text-yellow-500" />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                          {achievementLevel}
                        </div>
                        <div className="mt-2">
                          <div className="text-sm text-gray-600 dark:text-gray-400 flex justify-between mb-1">
                            <span>Progress to {nextLevel.name}</span>
                            <span>{Math.round(progressPercent)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Recommendations Card */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/30">
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white">Recommended Next Steps</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Activities to help you advance</p>
                      
                      <div className="space-y-3">
                        <a href="/pi-calculator" className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow transition-shadow">
                          <Calculator className="h-5 w-5 text-blue-500 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Try Pi Calculator</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Calculate Pi using different algorithms</div>
                          </div>
                        </a>
                        
                        <a href="/pi-memorization" className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow transition-shadow">
                          <BookOpen className="h-5 w-5 text-green-500 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Practice Memorization</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Challenge yourself to memorize Pi digits</div>
                          </div>
                        </a>
                        
                        <a href="/quiz" className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow transition-shadow">
                          <Brain className="h-5 w-5 text-purple-500 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Take Pi Quiz</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Test your knowledge about Pi</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin mb-4 mx-auto h-8 w-8 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300 text-lg">Loading your dashboard...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
