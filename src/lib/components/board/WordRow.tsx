import { Box, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { useMemo } from "react";

import Letter from "./Letter";
import { Guess } from "lib/store/createGuessesSlice";
import useStore from "lib/store/useStore";

type WordRowProps = {
  guess?: Guess;
};

const WordRow = ({ guess = undefined }: WordRowProps) => {
  const { answer } = useStore();
  console.log(guess);
  return (
    <SimpleGrid columns={6} spacing="3">
      {answer.map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Letter
          key={`letter-${index}`}
          index={index}
          row={0}
          guessResult={guess?.value[index]}
        />
      ))}
    </SimpleGrid>
  );
};

export default WordRow;
