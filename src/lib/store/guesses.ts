import create from "zustand";
import useAnswer from "./answer";

type GuessResult = "correct" | "incorrect" | "includes";

export type Guess = {
  letters: string[];
};

type GuessesState = {
  guesses: Guess[];
  getGuessByRow: (row: number) => Guess | undefined;
  addGuess: (guess: Guess) => void;
  checkGuess: (guess: Guess) => GuessResult[];
};

const useGuesses = create<GuessesState>((set, get) => ({
  guesses: [],
  getGuessByRow: (row: number) => {
    try {
      return get().guesses[row];
    } catch {
      return undefined;
    }
  },
  addGuess: (guess: Guess) =>
    set((state) => ({ ...state, guesses: [...state.guesses, guess] })),
  checkGuess: (guess: Guess) => {
    const { answer } = get();

    const result: GuessResult[] = [];

    for (let i = 0; i < answer.length; i += 1) {
      if (guess.letters[i] === answer[i]) {
        result.push("correct");
      } else if (answer.includes(guess.letters[i])) {
        result.push("includes");
      } else {
        result.push("incorrect");
      }
    }
    return result;
  },
}));

export default useGuesses;
