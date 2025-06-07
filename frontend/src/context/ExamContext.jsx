import { createContext } from "react";

const ExamContext = createContext({
  timeLeft: 0,
  totalQuestions: 0,
  examPhase: "listening",
  setTimeLeft: () => {},
  setTotalQuestions: () => {},
  setExamPhase: () => {},
  questionList: [],
});

export default ExamContext;