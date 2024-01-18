import { extendTheme } from "@chakra-ui/react";
import { cardTheme } from "./Card";
import { accordionTheme } from "./Events/AccordionTheme";

const theme = extendTheme({
  components: {
    Card: cardTheme,
    Accordion: accordionTheme,
    
    
  },
});

export default theme;