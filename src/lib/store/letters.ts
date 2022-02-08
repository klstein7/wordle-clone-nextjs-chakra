import create from "zustand";

type LettersState = {
  letters: string[];
  focusedIndex: number;
  getLetterForIndex: (index: number) => string;
  setLetterForIndex: (letter: string, index: number) => void;
  setFocusedIndex: (index: number) => void;
  resetLetters: () => void;
};

const useLetters = create<LettersState>((set, get) => ({
  letters: ["", "", "", "", "", ""],
  focusedIndex: 0,
  getLetterForIndex: (index: number) => get().letters[index],
  setLetterForIndex: (letter, index) =>
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
}));

export default useLetters;
