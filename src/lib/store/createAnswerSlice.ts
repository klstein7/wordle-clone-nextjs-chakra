import type { SetState } from "zustand";

import type { StoreState } from "./useStore";

export type AnswerState = {
  answer: string[];
  setAnswer: (answer: string[]) => void;
};

const createAnswerSlice = (set: SetState<StoreState>) => ({
  answer: ["F", "R", "I", "E", "N", "D"],
  setAnswer: (answer: string[]) => set((state) => ({ ...state, answer })),
});

export default createAnswerSlice;
