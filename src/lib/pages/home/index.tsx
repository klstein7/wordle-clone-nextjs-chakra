import { Box, Button, Stack } from "@chakra-ui/react";

import WordRow from "lib/components/board/WordRow";
import useAnswer from "lib/store/answer";
import useGuesses from "lib/store/guesses";
import useLetters from "lib/store/letters";

const Home = () => {
  const { letters, resetLetters, setFocusedIndex } = useLetters();
  const { addGuess, guesses } = useGuesses();

  return (
    <Stack direction="column" spacing="5">
      {guesses.map((guess, index) => (
        <WordRow key={`guess-${index}`} guess={guess} />
      ))}
      <WordRow />
      <Button
        variant="outline"
        onClick={() => {
          const savedLetters = letters;
          addGuess({ letters: savedLetters });
          resetLetters();
          setFocusedIndex(0);
        }}
      >
        Check
      </Button>
    </Stack>
  );
};

export default Home;
