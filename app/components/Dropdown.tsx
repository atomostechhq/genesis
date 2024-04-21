import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import Label from "./Label";
import Input from "./Input";

export interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options?: Option[];
  selected: Option[];
  setSelected: React.Dispatch<React.SetStateAction<Option[]>>;
}

const Dropdown = ({ options, selected, setSelected }: DropdownProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(
    options || []
  );

  useEffect(() => {
    const filtered = options?.filter(
      (option, index, self) =>
        option.value.toLowerCase().includes(searchQuery.toLowerCase()) &&
        index === self.findIndex((t) => t.label === option.label)
    );

    setFilteredOptions(filtered || []);
  }, [searchQuery, options]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const toggleOption = ({ label, value }: Option) => {
    setSelected((prevSelected) => {
      const isSelected = prevSelected.some((item) => item.label === label);
      if (isSelected) {
        return prevSelected?.filter((item) => item.label !== label);
      } else {
        return [...prevSelected, { label, value }];
      }
    });
  };

  const handleSelectAll = () => {
    if (selected.length === filteredOptions.length) {
      setSelected([]);
    } else {
      setSelected(filteredOptions);
    }
  };

  return (
    <div className="c-multi-select-dropdown">
      <div>
        <div>
          <Input
            type="text"
            size="sm"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <ul className="c-multi-select-dropdown__options">
        <div className="flex items-center gap-1">
          <Checkbox
            id="select all"
            checked={selected.length === filteredOptions.length}
            onChange={handleSelectAll}
            size="lg"
          />
          <Label htmlFor="select all">Select all</Label>
        </div>
        {filteredOptions?.map((option: Option) => {
          const isSelected = selected?.some(
            (item) => item.label === option.label
          );
          return (
            <li
              key={option.label}
              className="c-multi-select-dropdown__option"
              onClick={() => toggleOption(option)}
            >
              <Checkbox
                id={`checkbox-${option.label}`}
                checked={isSelected}
                onChange={() => toggleOption(option)}
              />
              <Label htmlFor={`checkbox-${option.label}`}>
                {option.label}
              </Label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
