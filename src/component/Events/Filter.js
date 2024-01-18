import React, { useState, useEffect } from 'react';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';

function FilterComponent({ onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    // Call the callback function with the updated selected filters
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const handleCheckboxChange = (value) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(value)) {
        return prevFilters.filter((filter) => filter !== value);
      } else {
        return [...prevFilters, value];
      }
    });
  };

  return (
    <CheckboxGroup colorScheme='green'>
      <Stack spacing={[1, 5]} direction={['column', 'row']} value={selectedFilters}>
        <Checkbox defaultChecked onChange={() => handleCheckboxChange('VOD')}>
          Video
        </Checkbox>
        <Checkbox defaultChecked onChange={() => handleCheckboxChange('PICTURE')}>
          Photo
        </Checkbox>
        <Checkbox defaultChecked onChange={() => handleCheckboxChange('DATA')}>
          Data
        </Checkbox>
        <Checkbox defaultChecked onChange={() => handleCheckboxChange('POLL')}>
          Pollution
        </Checkbox>
        <Checkbox defaultChecked onChange={() => handleCheckboxChange('SOUND')}>
          Nuissance Sonore
        </Checkbox>
        <Checkbox defaultChecked onChange={() => handleCheckboxChange('TRASH')}>
          Deterioration
        </Checkbox>
      </Stack>
    </CheckboxGroup>
  );
}

export default FilterComponent;
