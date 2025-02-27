"use client";
import React, { useState } from "react";

const QuizInstructions = ({ onStart }) => {
  const [exitQuiz, setExitQuiz] = useState(false);

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center px-4">
      {exitQuiz ? (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-100 px-4">
          <div className="bg-white rounded-md shadow-xl w-full max-w-lg py-4 transform scale-100 transition-all duration-300 sm:scale-105">
            <div className="border-b border-gray-300 px-6 py-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
                Some Rules of this Quiz
              </h2>
            </div>
            <div className="px-6 py-4 space-y-2 text-gray-700 text-sm sm:text-base">
              <p>
                1. You will have only{" "}
                <span className="font-semibold text-blue-500">30 seconds</span>{" "}
                per question.
              </p>
              <p>
                2. For multiple-choice questions, select the one best answer.
              </p>
              <p>
                3. For integer-type questions, write your numerical answer
                clearly.
              </p>
              <p>4. No calculators unless specified.</p>
              <p>5. You'll get points based on your correct answers.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end border-t border-gray-300 px-6 py-4 space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setExitQuiz(false)}
                className="px-4 py-2 text-gray-500 border border-gray-400 rounded-lg hover:bg-gray-100 transition w-full sm:w-auto"
              >
                Exit Quiz
              </button>
              <button
                onClick={onStart}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full text-center p-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Welcome to the Ultimate Quiz Challenge! 🎉
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-lg">
            Test your knowledge with fun and challenging questions. Are you
            ready to prove your skills? Answer correctly, beat the timer, and
            aim for a high score! 🚀
          </p>
          <button
            onClick={() => setExitQuiz(true)}
            className="text-xl sm:text-2xl font-medium text-blue-500 px-6 py-3 bg-white border-none rounded-lg shadow-lg hover:bg-slate-100 transition w-full sm:w-auto"
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizInstructions;
