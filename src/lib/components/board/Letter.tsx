import { Flex, Input } from "@chakra-ui/react";
import { useMemo } from "react";
import FocusLock from "react-focus-lock";

import useStore from "lib/store/useStore";
import { GuessResult } from "lib/store/createGuessesSlice";

type LetterProps = {
  index: number;
  row: number;
  guessResult?: GuessResult | undefined;
};

const Letter = ({ index, row, guessResult = undefined }: LetterProps) => {
  const {
    letters,
    setLetterForIndex,
    getLetterForIndex,
    setFocusedIndex,
    focusedIndex,
    addGuess,
  } = useStore();

  const isLetter = (str: string | undefined) => {
    if (!str) {
      return false;
    }
    return str.length === 1 && str.match(/[a-z]/i);
  };

  const isFocused = () => {
    if (guessResult) {
      return false;
    }
    return focusedIndex === index;
  };

  const backgroundColor = useMemo(() => {
    if (!guessResult) {
      return undefined;
    }

    if (guessResult.result === "correct") {
      return "green.700";
    }

    if (guessResult.result === "includes") {
      return "yellow.600";
    }

    return "red.700";
  }, [guessResult]);

  console.log(isFocused());

  return (
    <FocusLock disabled={!isFocused()}>
      <Flex
        bg={backgroundColor}
        border="1px"
        borderColor="whiteAlpha.400"
        w="16"
        h="16"
        align="center"
        justify="center"
      >
        <Input
          size="lg"
          value={guessResult?.letter || getLetterForIndex(index)}
          w="100%"
          h="100%"
          border="none"
          borderRadius="none"
          textAlign="center"
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              if (getLetterForIndex(index) === "") {
                setFocusedIndex(index - 1);
              } else {
                setLetterForIndex("", index);
              }
            } else if (e.key === "Enter") {
              addGuess();
            }
          }}
          onChange={(e) => {
            const lastLetter = e.target.value[e.target.value.length - 1];

            if (isLetter(lastLetter)) {
              setLetterForIndex(lastLetter.toUpperCase(), index);
              setFocusedIndex(index + 1);
            } else {
              setLetterForIndex("", index);
            }
          }}
        />
      </Flex>
    </FocusLock>
  );
};

export default Letter;
