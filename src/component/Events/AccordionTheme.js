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
      border: "2px solid",
      marginTop:"5px",
      borderColor: "#fffaee",
      backgroundColor:"#465a48c0",
      color: "gray.500",
      _hover: {
        backgroundColor:"#566c58",
        color: "white",
        transform: "scale(1.02)",
      },
      _focus: {
        backgroundColor:"#566c58",
        color: "blue.500",
      },
      _expanded:{
        backgroundColor:"#9fb0a1c0",
        color: "black",
      },
      fontFamily: "mono",
    },
    panel:{
      backgroundColor:"#fffaeea0",
      padding:"10px",
      justifyItems:"center",
    }
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
