import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AccordionComponent from './Accordion';
import theme from './AccordionTheme'; // Import the theme


const Event = () => {
  const items = [
    { title: 'Ceci est l alerte 1', content: 'Contenu de la section 1', isOpen: false },
    { title: 'Section 2', content: 'Contenu de la section 2', isOpen: false },
    { title: 'Section 3', content: 'Contenu de la section 3', isOpen: false },
    // ... more items
  ];

  return (
    <ChakraProvider theme={theme}>
      <AccordionComponent items={items} />
    </ChakraProvider>
  );
};

export default Event;
