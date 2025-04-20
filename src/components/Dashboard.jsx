import React, { useContext } from "react";
import { auth } from "../../Firebase/firebaseConfig";
import { MarksContext } from "../context/MarksContext";

function Dashboard() {
  const { marks } = useContext(MarksContext);
  const user = auth.currentUser;

  return (
    <div className="container mx-auto p-4  bg-slate-900 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Dashboard
      </h1>
      {user ? (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center space-x-6 mb-8">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-20 h-20 rounded-full border-4 border-indigo-500 shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                {user.displayName}
              </h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Pi Game Scores
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-indigo-500 text-white">
                  <th className="py-3 px-6 text-left">Game</th>
                  <th className="py-3 px-6 text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((mark, index) => (
                  <tr
                    key={index}
                    className="border-b text-gray-900 dark:text-gray-900 hover:bg-gray-100 transition duration-300"
                  >
                    <td className="py-3 px-6">{mark.game}</td>
                    <td className="py-3 px-6">{mark.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-white text-xl">Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
