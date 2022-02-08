import create from "zustand";

type AnswerState = {
  answer: string[];
  setAnswer: (answer: string[]) => void;
};

const useAnswer = create<AnswerState>((set) => ({
  answer: ["F", "R", "I", "E", "N", "D"],
  setAnswer: (answer: string[]) => set((state) => ({ ...state, answer })),
}));

export default useAnswer;
