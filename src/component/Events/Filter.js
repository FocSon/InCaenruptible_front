import React, { useState, useEffect } from "react";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

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
    <CheckboxGroup colorScheme="green">
      <Stack
        spacing={[1, 5]}
        direction={["column", "row"]}
        wrap="wrap"
        value={selectedFilters}
        className="filter"
      >
        <Checkbox defaultChecked onChange={() => handleCheckboxChange("VOD")}>
          <div className="filterText"> Video</div>
        </Checkbox>
        <Checkbox
          defaultChecked
          onChange={() => handleCheckboxChange("PICTURE")}
        >
          <div className="filterText">Photo </div>
        </Checkbox>
        <Checkbox defaultChecked onChange={() => handleCheckboxChange("DATA")}>
          <div className="filterText"> Data</div>
        </Checkbox>
        <Checkbox defaultChecked onChange={() => handleCheckboxChange("POLL")}>
          <div className="filterText">Pollution</div>
        </Checkbox>
        <Checkbox defaultChecked onChange={() => handleCheckboxChange("SOUND")}>
          <div className="filterText">Nuissance Sonore</div>
        </Checkbox>
        <Checkbox defaultChecked onChange={() => handleCheckboxChange("TRASH")}>
          <div className="filterText">Deterioration</div>
        </Checkbox>
      </Stack>
    </CheckboxGroup>
  );
}

export default FilterComponent;
