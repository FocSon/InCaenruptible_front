import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'


const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys)
  
const baseStyle = definePartsStyle({
// define the part you're going to style
container: {
    bg: 'red.200', // change the backgroundColor of the container
},
})

export const accordionTheme = defineMultiStyleConfig({ baseStyle })
