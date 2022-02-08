import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import Button from "./components/button";
import fonts from "./fonts";

const customTheme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  fonts,
  colors,
  components: {
    Button,
  },
});

export default customTheme;
