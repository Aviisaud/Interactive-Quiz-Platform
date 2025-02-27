"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faTrophy, faRedo } from "@fortawesome/free-solid-svg-icons";
import quizData from "@/data/quizData";

const page = () => {
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    if (index === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleSubmitIntegerAnswer = () => {
    if (parseInt(userInput) === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(0);
    console.log(userInput, score);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setcurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setUserInput("");
      setTimer(30);
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    if (selectedAnswer !== null) return; // Stop timer when answer is selected

    if (timer > 0) {
      const interval = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(interval); // Cleanup correctly
    } else {
      handleNextQuestion();
    }
  }, [timer, selectedAnswer]); // Runs only when timer or selectedAnswer changes

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-blue-100">
        {showResult ? (
          <div className="w-full max-w-2xl p-8 border rounded-lg shadow-2xl bg-white text-center">
            {/* Trophy Icon */}
            <div className="text-yellow-500 text-6xl mb-4">
              <FontAwesomeIcon icon={faTrophy} />
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold text-gray-800">
              Quiz Completed!
            </h1>

            {/* Score Section */}
            <p className="text-xl mt-4 font-semibold text-gray-700">
              Your Score:
              <span className="text-blue-600 text-3xl font-bold ml-2">
                {score}
              </span>
              / {quizData.length}
            </p>

            {/* Emoji-based Performance Feedback */}
            <p className="mt-2 text-gray-500 text-lg">
              {score === quizData.length
                ? "🎉 Perfect Score! You're a genius!"
                : score > quizData.length / 2
                ? "👏 Well done! Keep it up!"
                : "💪 Keep practicing, you'll get there!"}
            </p>

            {/* Restart Quiz Button */}
            <button
              className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={() => window.location.reload()} // Replace with proper state reset function
            >
              <FontAwesomeIcon icon={faRedo} className="mr-2" />
              Restart Quiz
            </button>
          </div>
        ) : (
          // Question Box
          <div className="bg-white rounded-md shadow-xl w-full max-w-xl transform scale-110 opacity-100 transition-all duration-300">
            {/* Question header */}
            <header className="flex items-center justify-between border-gray-300 px-6 py-3 shadow-lg">
              <h2 className="text-2xl font-semibold">Quiz Platform </h2>
              <div className="flex items-center bg-blue-100 border border-blue-300 text-blue-900 px-3 py-2 rounded-md">
                <span className="text-sm">Time Left</span>
                <span
                  className={`ml-4 px-3 py-1 text-white rounded-md transition-all 
            ${timer < 10 ? "bg-red-600 animate-heartbeat" : "bg-gray-800"}`}
                >
                  {timer}
                </span>
              </div>
            </header>
            {/* Question Section */}
            <div
              key={currentQuestion} // Ensures animation triggers on question change
              className="p-6 space-y-2 transition-opacity duration-1000 ease-in-out opacity-100 translate-y-0 animate-fadeIn"
            >
              <div className="space-y-2">
                <p className="text-lg mb-6">
                  {quizData[currentQuestion].question}
                </p>
              </div>

              {/* Options Section */}
              {quizData[currentQuestion].type === "mcq" ? (
                <div className="space-y-2">
                  {quizData[currentQuestion].options.map((option, index) => {
                    const isCorrect =
                      index === quizData[currentQuestion].answer;
                    const isSelected = index === selectedAnswer;

                    return (
                      <button
                        key={index}
                        className={`flex justify-between px-4 py-3 border rounded w-full transition-all duration-300
                ${
                  selectedAnswer !== null
                    ? isSelected
                      ? isCorrect
                        ? "bg-green-100 border-green-500" // Correct Answer Selected
                        : "bg-red-100 border-red-500" // Incorrect Answer Selected
                      : isCorrect
                      ? "bg-green-100 border-green-500" // Highlight Correct Answer if Incorrect Answer Selected
                      : "bg-transparent border-gray-300 cursor-default" // Disable Other Buttons
                    : "bg-blue-50 hover:bg-blue-100 hover:border-blue-400"
                }
              `}
                        onClick={() => handleAnswerClick(index)}
                        disabled={selectedAnswer !== null}
                      >
                        <p
                          className={
                            isSelected
                              ? isCorrect
                                ? "text-[#23903c]"
                                : "text-[#a42834]"
                              : ""
                          }
                        >
                          {option}
                        </p>

                        {/* Show ✅ or ❌ only if an answer is selected */}
                        {selectedAnswer !== null &&
                          (isCorrect ? (
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              size="xl"
                              style={{ color: "#23903c" }}
                            />
                          ) : isSelected ? (
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              size="xl"
                              style={{ color: "#a42834" }}
                            />
                          ) : null)}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4">
                  <input
                    type="number"
                    className="bg-blue-50 justify-between px-4 py-3 border rounded w-full"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmitIntegerAnswer();
                      }
                    }}
                  />
                  <button
                    className={`${
                      selectedAnswer !== null
                        ? "w-full p-2 mt-2 bg-slate-600 text-white rounded"
                        : "w-full p-2 mt-2 bg-blue-500 text-white rounded"
                    }`}
                    onClick={handleSubmitIntegerAnswer}
                    disabled={selectedAnswer !== null}
                  >
                    {selectedAnswer !== null
                      ? "Answer Submitted"
                      : "Submit Answer"}
                  </button>
                </div>
              )}
            </div>
            {/* Footer */}
            <footer className="flex items-center justify-between px-8 py-4 border-t border-gray-300">
              <div className="text-md">
                <span className="font-bold">{currentQuestion + 1}</span> of{" "}
                <span className="font-bold">{quizData.length}</span> Questions
              </div>
              <button
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition 
                  ${
                    selectedAnswer === null
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100 cursor-pointer"
                  }
                `}
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                {currentQuestion + 1 === quizData.length
                  ? "Submit Quiz"
                  : "Next Question"}
              </button>
            </footer>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
