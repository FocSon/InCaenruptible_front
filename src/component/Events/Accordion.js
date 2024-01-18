import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';

function AccordionComponent({ items }) {
  const [accordionItems, setAccordionItems] = useState([]);

  useEffect(() => {
    setAccordionItems(items);
  }, [items]);

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
      <Accordion>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton onClick={() => handleToggle(index)} _expanded={{ bg: "gray.100" }}>
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
