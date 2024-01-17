// src/components/Accordion.js
import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';

function AccordionComponent({ items }) {
  const [accordionItems, setAccordionItems] = useState(items || []);

  const handleToggle = (index) => {
    setAccordionItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].isOpen = !newItems[index].isOpen;
      return newItems;
    });
  };

  return (
    <Box p={5}>
      <h1>Fil des alertes</h1>
      <Accordion allowToggle>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton onClick={() => handleToggle(index)}>
                <Box flex="1" textAlign="left">
                  {item.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <p>{item.content}</p>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export default AccordionComponent;
