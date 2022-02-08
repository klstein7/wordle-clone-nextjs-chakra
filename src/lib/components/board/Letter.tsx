import { Flex, Input } from "@chakra-ui/react";
import { useMemo } from "react";
import FocusLock from "react-focus-lock";

import useAnswer from "lib/store/answer";
import useGuesses from "lib/store/guesses";
import useLetters from "lib/store/letters";

type LetterProps = {
  index: number;
  row: number;
  letter?: string;
};

const Letter = ({ index, row, letter = undefined }: LetterProps) => {
  const {
    letters,
    setLetterForIndex,
    getLetterForIndex,
    setFocusedIndex,
    focusedIndex,
  } = useLetters();

  const { answer } = useAnswer();

  const { checkGuess } = useGuesses();

  const isLetter = (str: string | undefined) => {
    if (!str) {
      return false;
    }
    return str.length === 1 && str.match(/[a-z]/i);
  };

  const isFocused = () => {
    if (letter) {
      return false;
    }
    return focusedIndex === index;
  };

  const backgroundColor = useMemo(() => {
    if (!letter) {
      return undefined;
    }

    if (letter === answer[index]) {
      return "green.700";
    }

    if (answer.includes(letter)) {
      return "yellow.600";
    }

    return "red.700";
  }, [answer, index, letter]);

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
          value={letter || getLetterForIndex(index)}
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
              checkGuess({ letters });
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
