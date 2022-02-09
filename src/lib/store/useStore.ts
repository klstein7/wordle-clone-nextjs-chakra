import create from "zustand";

import type { AnswerState } from "./createAnswerSlice";
import createAnswerSlice from "./createAnswerSlice";
import type { GuessesState } from "./createGuessesSlice";
import createGuessesSlice from "./createGuessesSlice";
import type { LettersState } from "./createLettersSlice";
import createLettersSlice from "./createLettersSlice";

export type StoreState = AnswerState & GuessesState & LettersState;

const useStore = create<StoreState>((set, get) => ({
  ...createAnswerSlice(set),
  ...createGuessesSlice(set, get),
  ...createLettersSlice(set, get),
}));

export default useStore;
