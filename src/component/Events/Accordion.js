import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AspectRatio,
  Image,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

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
      <Accordion allowToggle>
        {accordionItems.map((item, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton onClick={() => handleToggle(index)}>
                <Box className="borderBox">
                  <div className="accordionButtonText">
                    {item.title +
                      " | categorie : " +
                      item.category +
                      " | type : " +
                      item.type}
                  </div>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <div className="accordionPanelText">{item.content}</div>
              <div className="center">
              {(() => {
                switch (item.type) {
                  case "video":
                    return (
                      <video width="auto" height="auto" controls>
                        <source src={item.link}></source>
                        Your browser does not support the video tag.
                      </video>
                    );
                  case "photo":
                    return (
                      <img src={item.link} width="200" height="auto" className="centered-image"></img>
                    );
                  // Add more cases as needed
                  default:
                    return null;
                }
              })()}
              </div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export default AccordionComponent;
