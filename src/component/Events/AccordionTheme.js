import { accordionAnatomy } from '@chakra-ui/anatomy'
import { extendTheme } from '@chakra-ui/react'
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys)

// default base style from the Input theme
const baseStyle = definePartsStyle({
  container: defineStyle({
    boxShadow: "sm",
    _focus: {
      boxShadow: "outline",
    },
  }),
});

// Defining a custom variant called outline
const outline = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      border: "1px solid",
      borderColor: "gray.100",
    },
    button: {
      color: "gray.500",
      _hover: {
        color: "gray.600",
      },
      _focus: {
        color: "blue.500",
      },
      fontFamily: "mono",
    },
  };
});

const variants = {
  outline,
};

const size = {
  md: defineStyle({
    w: 5,
    h: 5,
  }),
};

const sizes = {
  md: definePartsStyle({
    icon: size.md,
  }),
};

export const accordionTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});

export const theme = extendTheme({
    components: { Accordion: accordionTheme },
  })

export default theme;
