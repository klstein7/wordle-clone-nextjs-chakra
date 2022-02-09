import type { GetState, SetState } from "zustand";

import type { StoreState } from "./useStore";

export type GuessResult = {
  result: "correct" | "includes" | "incorrect";
  letter: string;
};

export type Guess = {
  value: GuessResult[];
};

export type GuessesState = {
  guesses: Guess[];
  getGuessByRow: (row: number) => Guess | undefined;
  addGuess: () => void;
};

const createGuessesSlice = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => ({
  guesses: [],
  getGuessByRow: (row: number) => {
    try {
      return get().guesses[row];
    } catch {
      return undefined;
    }
  },
  addGuess: () => {
    const { answer, resetLetters, setFocusedIndex, letters } = get();

    const result: GuessResult[] = [];

    for (let i = 0; i < answer.length; i += 1) {
      if (letters[i] === answer[i]) {
        result.push({
          result: "correct",
          letter: letters[i],
        });
      } else if (answer.includes(letters[i])) {
        result.push({
          result: "includes",
          letter: letters[i],
        });
      } else {
        result.push({
          result: "incorrect",
          letter: letters[i],
        });
      }
    }

    set((state) => ({
      ...state,
      guesses: [...state.guesses, { value: result }],
    }));
    resetLetters();
    setFocusedIndex(0);
  },
});

export default createGuessesSlice;
