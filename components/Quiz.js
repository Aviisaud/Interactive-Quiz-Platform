"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faTrophy, faRedo } from "@fortawesome/free-solid-svg-icons";
import quizData from "@/data/quizData";

const QuizPage = () => {
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
      return () => clearTimeout(interval);
    } else {
      handleNextQuestion();
    }
  }, [timer, selectedAnswer]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-100 px-4 sm:px-6 md:px-8">
      {showResult ? (
        <div className="w-full max-w-lg p-6 border rounded-lg shadow-xl bg-white text-center">
          {/* Trophy Icon */}
          <div className="text-yellow-500 text-5xl sm:text-6xl mb-4">
            <FontAwesomeIcon icon={faTrophy} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            Quiz Completed!
          </h1>

          {/* Score Section */}
          <p className="text-lg sm:text-xl mt-4 font-semibold text-gray-700">
            Your Score:
            <span className="text-blue-600 text-2xl sm:text-3xl font-bold ml-2">
              {score}
            </span>{" "}
            / {quizData.length}
          </p>

          {/* Feedback Message */}
          <p className="mt-2 text-gray-500 text-md sm:text-lg">
            {score === quizData.length
              ? "🎉 Perfect Score! You're a genius!"
              : score > quizData.length / 2
              ? "👏 Well done! Keep it up!"
              : "💪 Keep practicing, you'll get there!"}
          </p>

          {/* Restart Quiz Button */}
          <button
            className="mt-6 px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition w-full sm:w-auto"
            onClick={() => window.location.reload()}
          >
            <FontAwesomeIcon icon={faRedo} className="mr-2" />
            Restart Quiz
          </button>
        </div>
      ) : (
        // Question Box
        <div className="bg-white rounded-md shadow-xl w-full max-w-xl p-4 sm:p-6 transform scale-100 transition-all duration-300">
          {/* Question header */}
          <header className="flex items-center justify-between border-b border-gray-300 px-4 py-3">
            <h2 className="text-lg sm:text-2xl font-semibold">Quiz Platform</h2>
            <div className="flex items-center bg-blue-100 border border-blue-300 text-blue-900 px-3 py-2 rounded-md">
              <span className="text-sm">Time Left</span>
              <span
                className={`ml-3 px-3 py-1 text-white rounded-md transition-all 
                ${timer < 10 ? "bg-red-600 animate-pulse" : "bg-gray-800"}`}
              >
                {timer}
              </span>
            </div>
          </header>

          {/* Question Section */}
          <div className="p-4 sm:p-6 space-y-3">
            <p className="text-md sm:text-lg">
              {quizData[currentQuestion].question}
            </p>

            {/* Options Section */}
            {quizData[currentQuestion].type === "mcq" ? (
              <div className="space-y-2">
                {quizData[currentQuestion].options.map((option, index) => {
                  const isCorrect = index === quizData[currentQuestion].answer;
                  const isSelected = index === selectedAnswer;

                  return (
                    <button
                      key={index}
                      className={`flex justify-between px-4 py-3 border rounded w-full text-left transition-all duration-300 
                        ${
                          selectedAnswer !== null
                            ? isSelected
                              ? isCorrect
                                ? "bg-green-100 border-green-500"
                                : "bg-red-100 border-red-500"
                              : isCorrect
                              ? "bg-green-100 border-green-500"
                              : "bg-gray-100 cursor-default"
                            : "bg-blue-50 hover:bg-blue-100"
                        }`}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                    >
                      <p>{option}</p>

                      {selectedAnswer !== null &&
                        (isCorrect ? (
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            size="lg"
                            className="text-green-600"
                          />
                        ) : isSelected ? (
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            size="lg"
                            className="text-red-600"
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
                  className="w-full px-4 py-3 border rounded bg-blue-50"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmitIntegerAnswer();
                    }
                  }}
                />
                <button
                  className={`w-full p-2 mt-2 text-white rounded ${
                    selectedAnswer !== null
                      ? "bg-gray-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={handleSubmitIntegerAnswer}
                  disabled={selectedAnswer !== null}
                >
                  {selectedAnswer !== null ? "Answer Submitted" : "Submit Answer"}
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-300">
            <span className="text-sm sm:text-md">
              <strong>{currentQuestion + 1}</strong> of <strong>{quizData.length}</strong> Questions
            </span>
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
              {currentQuestion + 1 === quizData.length ? "Submit Quiz" : "Next Question"}
            </button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
