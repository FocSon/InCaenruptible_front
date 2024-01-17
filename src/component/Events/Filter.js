// FilterComponent.js
import React, { useState, useEffect } from 'react';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';

function FilterComponent({ onFilterChange }) {

  const [selectedFilters, setSelectedFilters] = useState([]);
  
  useEffect(() => {
    // Set all filters to be initially selected
    setSelectedFilters(['VOD', 'PICTURE', 'DATA', 'POLL', 'SOUND', 'TRASH']);
    
    // Call the callback function with the initially selected filters
    onFilterChange(['VOD', 'PICTURE', 'DATA', 'POLL', 'SOUND', 'TRASH']);
  }, [onFilterChange]);

  const handleCheckboxChange = (value) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters((prevFilters) => prevFilters.filter((filter) => filter !== value));
    } else {
      setSelectedFilters((prevFilters) => [...prevFilters, value]);
    }

    // Call the callback function with the updated selected filters
    onFilterChange(selectedFilters);
  };

  return (
    <CheckboxGroup colorScheme='green'>
        <Stack spacing={[1, 5]} direction={['column', 'row']} value={selectedFilters}>
            <Checkbox defaultChecked onChange={() => handleCheckboxChange('VOD')}>Video</Checkbox>
            <Checkbox defaultChecked onChange={() => handleCheckboxChange('PICTURE')}>Photo</Checkbox>
            <Checkbox defaultChecked onChange={() => handleCheckboxChange('DATA')}>Data</Checkbox>
            <Checkbox defaultChecked onChange={() => handleCheckboxChange('POLL')}>Pollution</Checkbox>
            <Checkbox defaultChecked onChange={() => handleCheckboxChange('SOUND')}>Nuissance Sonore</Checkbox>
            <Checkbox defaultChecked onChange={() => handleCheckboxChange('TRASH')}>Deterioration</Checkbox>
        </Stack>
    </CheckboxGroup>

  );
}

export default FilterComponent;
