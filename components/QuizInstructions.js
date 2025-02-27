"use client";
import React, { useState } from "react";

const QuizInstructions = ({ onStart }) => {
  const [exitQuiz, setExitQuiz] = useState(false);

  return (
    <>
      <div className="bg-blue-100">
        {exitQuiz ? (
          <div className="fixed inset-0 flex items-center justify-center bg-blue-100">
            <div className="bg-white rounded-md shadow-xl w-full max-w-lg py-4 transform scale-110 opacity-100 transition-all duration-300">
              <div className="border-b border-gray-300 px-6 py-4">
                <h2 className="text-2xl font-semibold">
                  Some Rules of this Quiz
                </h2>
              </div>
              <div className="px-6 py-4 space-y-2 text-gray-700">
                <p key="rule1">
                  1. You will have only{" "}
                  <span className="font-semibold text-blue-500">
                    30 seconds
                  </span>{" "}
                  per question.
                </p>
                <p key="rule2">
                  2. For multiple-choice questions, select the one best answer.
                </p>
                <p key="rule3">
                  3. For integer-type questions, write your numerical answer
                  clearly
                </p>
                <p key="rule4">4. No calculators unless specified.</p>
                <p key="rule5">5. You'll get points based on your correct answers.</p>
              </div>
              <div className="flex justify-end border-t border-gray-300 px-6 py-4">
                <button
                  onClick={() => setExitQuiz(false)}
                  className="px-4 py-2 mt-2 text-gray-500 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
                >
                  Exit Quiz
                </button>
                <button
                  onClick={onStart}
                  className="ml-3 px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen ">
            <button
              onClick={() => setExitQuiz(true)}
              className="text-2xl font-medium text-blue-500 px-6 py-3 bg-white border-none rounded-lg shadow-lg hover:bg-slate-100 transition"
            >
              Start Quiz
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizInstructions;
