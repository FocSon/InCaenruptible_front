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
                  {item.title + " | categorie : "+ item.category + " | type : " + item.type}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <p>{item.content}</p>
              {(() => {
                switch (item.type) {
                  case 'video':
                    return <video width="200" height="100" controls>
                              <source src={item.link}></source>
                              Your browser does not support the video tag.
                          </video>;
                  case 'photo':
                    return <img src={item.link} width="200" height="100"></img>;
                  // Add more cases as needed
                  default:
                    return null;
                }
              })()}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export default AccordionComponent;
