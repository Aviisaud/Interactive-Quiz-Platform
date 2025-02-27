"use client";
import Quiz from "@/components/Quiz";
import QuizInstructions from "@/components/QuizInstructions";
import { useState } from "react";

export default function Home() {
  const [startQuiz, setStartQuiz] = useState(true);

  return (
    <>
      {startQuiz ? (
        <QuizInstructions onStart={() => setStartQuiz(false)} />
      ) : (
        <Quiz />
      )}
    </>
  );
}


