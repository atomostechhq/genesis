import React, { useEffect, useState, useMemo, useCallback } from "react";
import Checkbox from "./Checkbox";

interface Option {
  label: string;
  value: string;
}

interface MenuItemProps {
  label?: string;
  value: string;
  children?: React.ReactNode;
}

interface DropdownProps {
  options: Option[];
  selected?: Option[];
  setSelected?: React.Dispatch<React.SetStateAction<Option[]>>;
  dropdownText?: string;
  search?: boolean;
  multiple?: boolean;
  renderItem?: (option: Option) => React.ReactNode;
  children?: React.ReactNode;
}

const defaultRenderItem = (option: Option) => {
  return <MenuItem label={option.label} value={option.value} />;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  setSelected,
  search = false,
  multiple = false,
  dropdownText = "Select...",
  renderItem = defaultRenderItem,
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(
    options || []
  );

  useEffect(() => {
    if (options) {
      setFilteredOptions(options);
    }
  }, [options]);

  const memoizedFilteredOptions = useMemo(() => {
    if (!search) return filteredOptions;
    return filteredOptions.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [search, searchQuery, filteredOptions]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const toggleOption = useCallback(
    (option: Option) => {
      if (multiple && setSelected) {
        setSelected((prevSelected) =>
          prevSelected.some((item) => item.value === option.value)
            ? prevSelected.filter((item) => item.value !== option.value)
            : [...prevSelected, option]
        );
      } else if (setSelected) {
        setSelected([option]);
      }
    },
    [multiple, setSelected]
  );

  const handleCheckboxChange = useCallback(
    (option: Option) => {
      if (multiple && setSelected) {
        setSelected((prevSelected) =>
          prevSelected.some((item) => item.value === option.value)
            ? prevSelected.filter((item) => item.value !== option.value)
            : [...prevSelected, option]
        );
      } else if (setSelected) {
        setSelected([option]);
      }
    },
    [multiple, setSelected]
  );

  return (
    <div className="c-multi-select-dropdown">
      <div className="test">
        {multiple
          ? `${selected?.length || dropdownText}`
          : selected?.[0]?.label
          ? selected?.[0]?.label
          : dropdownText}
      </div>
      <ul className="">
        {search && (
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="h-[40px] test"
          />
        )}
        {options
          ? memoizedFilteredOptions.map((option) => (
              <>
                {multiple ? (
                  <li key={option.label} className="flex gap-2 items-center">
                    <Checkbox
                      id={`checkbox-${option.value}`}
                      checked={selected?.some(
                        (item) => item.value === option.value
                      )}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    <label htmlFor={`checkbox-${option.value}`}>
                      {renderItem(option)}
                    </label>
                  </li>
                ) : (
                  <li
                    key={option.label}
                    className=""
                    onClick={() => toggleOption(option)}
                  >
                    {renderItem(option)}
                  </li>
                )}
              </>
            ))
          : children}
      </ul>
    </div>
  );
};

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  value,
  children,
}) => {
  return <p>{label || children}</p>;
};

export default Dropdown;
