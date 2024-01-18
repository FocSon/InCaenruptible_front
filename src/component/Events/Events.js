import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AccordionComponent from './Accordion';
import theme from './AccordionTheme';
import FilterComponent from './Filter';

const Event = () => {
  const [responses] = useState([
    {
      id: 1,
      title: 'Sample Alert',
      description: 'This is a sample alert.',
      startTime: 1644566400000,
      endTime: 1644570000000,
      type: 'video', //video, photo, data
      category: 'pollution', //pollution, son, dechet
    },
    {
      id: 2,
      title: 'Sample Alert 2',
      description: 'This is a sample alert.',
      startTime: 1644566400000,
      endTime: null,
      type: 'photo', //video, photo, data
      category: 'son', //pollution, son, dechet
    },
    {
      id: 3,
      title: 'Sample Alert 3',
      description: 'This is a sample alert.',
      startTime: 1644566400000,
      endTime: null,
      type: 'data', //video, photo, data
      category: 'pollution', //pollution, son, dechet
    },
    {
      id: 4,
      title: 'Sample Alert 4',
      description: 'This is a sample alert.',
      startTime: 1644566400000,
      endTime: null,
      type: 'data', //video, photo, data
      category: 'son', //pollution, son, dechet
    },
    {
      id: 5,
      title: 'Sample Alert 5',
      description: 'This is a sample alert.',
      startTime: 1644566400000,
      endTime: null,
      type: 'video', //video, photo, data
      category: 'dechet', //pollution, son, dechet
    },
    {
      id: 6,
      title: 'Sample Alert 6',
      description: 'This is a sample alert.',
      startTime: 1644566400000,
      endTime: null,
      type: 'photo', //video, photo, data
      category: 'dechet', //pollution, son, dechet
    },
    {
      id: 7,
      title: 'Sample Alert 7',
      description: 'This is a sample alert.',
      startTime: 1644566400000,
      endTime: null,
      type: 'data', //video, photo, data
      category: 'pollution', //pollution, son, dechet
    },
  ]);

  const [items, setItems] = useState([]);
  const handleFilterChange = (selectedFilters) => {
    setItems((prevItems) => {
      // Use the previous items to calculate the new items
      const filteredItems = responses
        .filter(doIDisplay)
        .map((response) => ({
          title: response.title,
          content: response.description,
          type: response.type,
          category: response.category,
          isOpen: false,
        }));
  
      return filteredItems;
    });
  
    function doIDisplay(item) {
      if (item.type === 'video') {
        if(selectedFilters.includes('VOD')) {
          return false;
        }
      } else if (item.type === 'photo') {
        if(selectedFilters.includes('PICTURE')) {
          return false;
        }
      } else if (item.type === 'data') {
        if(selectedFilters.includes('DATA')) {
          return false;
        }
      }

      if (item.category === 'pollution') {
        if(selectedFilters.includes('POLL')) {
          return false;
        }
      } else if (item.category === 'son') {
        if(selectedFilters.includes('SOUND')) {
          return false;
        }
      } else if (item.category === 'dechet') {
        if(selectedFilters.includes('TRASH')) {
          return false;
        }
      }
    
      return true;
    }
  };
  

  return (
    <ChakraProvider theme={theme}>
      <FilterComponent onFilterChange={handleFilterChange}/>
      <AccordionComponent items={items}/>
    </ChakraProvider>
  );
};

export default Event;
