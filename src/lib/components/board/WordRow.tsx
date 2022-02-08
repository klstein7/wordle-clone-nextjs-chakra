import { Box, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { useMemo } from "react";

import useAnswer from "lib/store/answer";

import Letter from "./Letter";
import { Guess } from "lib/store/guesses";

type WordRowProps = {
  guess?: Guess;
};

const WordRow = ({ guess = undefined }: WordRowProps) => {
  const { answer } = useAnswer();
  console.log(guess);
  return (
    <SimpleGrid columns={6} spacing="3">
      {answer.map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Letter
          key={`letter-${index}`}
          index={index}
          row={0}
          letter={guess?.letters[index]}
        />
      ))}
    </SimpleGrid>
  );
};

export default WordRow;
