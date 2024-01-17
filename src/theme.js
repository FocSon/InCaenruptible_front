import { extendTheme } from "@chakra-ui/react";
import { cardTheme } from "./component/Card";

const theme = extendTheme({
  components: {
    Card: cardTheme,
    
  },
});

export default theme;
