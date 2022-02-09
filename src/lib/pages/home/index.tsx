import { Box, Button, Stack } from "@chakra-ui/react";

import WordRow from "lib/components/board/WordRow";
import useStore from "lib/store/useStore";

const Home = () => {
  const { letters, resetLetters, setFocusedIndex } = useStore();
  const { addGuess, guesses } = useStore();

  return (
    <Stack direction="column" spacing="5">
      {guesses.map((guess, index) => (
        <WordRow key={`guess-${index}`} guess={guess} />
      ))}
      <WordRow />
      <Button
        variant="outline"
        onClick={() => {
          addGuess();
        }}
      >
        Check
      </Button>
    </Stack>
  );
};

export default Home;
