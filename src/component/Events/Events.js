import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AccordionComponent from './Accordion';
import theme from './AccordionTheme'; // Import the theme
import FilterComponent from './Filter'; // Import the FilterComponent from the new file



const Event = () => {

  //-------------------------------fetch alert------------------------------------
  const responses = [];

  const responseData1 = {
    id: 1,
    title: 'Sample Alert',
    description: 'This is a sample alert.',
    startTime: 1644566400000, // Replace with an actual timestamp
    endTime: 1644570000000,   // Replace with an actual timestamp or null
    type: 'video',            // Replace with 'photo', 'data', etc.
    category: 'pollution',     // Replace with 'noise', 'deterioration', etc.
  };
  
  const responseData2 = {
    id: 2,
    title: 'Sample Alert 2',
    description: 'This is a sample alert.',
    startTime: 1644566400000, // Replace with an actual timestamp
    endTime: 1644570000000,   // Replace with an actual timestamp or null
    type: 'video',            // Replace with 'photo', 'data', etc.
    category: 'pollution',     // Replace with 'noise', 'deterioration', etc.
  };

  responses.push(responseData1);
  responses.push(responseData2);

  const items = [];

  //-------------------------------------filtering------------------------------------
  const handleFilterChange = (selectedFilters) => {
    for(const filter in selectedFilters) {
      console.log('Selected Filter:', filter);
      
    }
  };

  //TODO : add flags to add video or mesurment in the alert if necessary
  for (let i=0; i<responses.length; i++) { //creating the alert list
    items.push( {
      title: responses[i].title, content: responses[i].description, isOpen: false
    })
  }

  return (
    <ChakraProvider theme={theme}>
      <FilterComponent onFilterChange={handleFilterChange}/>
      <AccordionComponent items={items}/>
    </ChakraProvider>
  );
};

export default Event;
