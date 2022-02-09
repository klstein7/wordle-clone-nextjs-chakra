import type { GetState, SetState } from "zustand";

import type { StoreState } from "./useStore";

export type LettersState = {
  letters: string[];
  focusedIndex: number;
  getLetterForIndex: (index: number) => string;
  setLetterForIndex: (letter: string, index: number) => void;
  setFocusedIndex: (index: number) => void;
  resetLetters: () => void;
};

const createLettersSlice = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => ({
  letters: ["", "", "", "", "", ""],
  focusedIndex: 0,
  getLetterForIndex: (index: number) => get().letters[index],
  setLetterForIndex: (letter: string, index: number) =>
    set((state) => ({
      ...state,
      letters: [
        ...state.letters.slice(0, index),
        letter,
        ...state.letters.slice(index + 1),
      ],
    })),
  setFocusedIndex: (index: number) =>
    set((state) => ({ ...state, focusedIndex: index })),
  resetLetters: () =>
    set((state) => ({ ...state, letters: ["", "", "", "", "", ""] })),
});

export default createLettersSlice;
