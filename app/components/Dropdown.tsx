import React, { useEffect, useState, useMemo, useCallback } from "react";
import Checkbox from "./Checkbox";
import Input from "./Input";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import SearchLineIcon from "remixicon-react/SearchLineIcon";
import ErrorWarningLineIcon from "remixicon-react/ErrorWarningLineIcon";
import { cn } from "../utils/utils";
import Label from "./Label";
import { Tooltip } from "./Tooltip";

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
  onApply?: () => void;
  dropdownText?: string;
  search?: boolean;
  multiple?: boolean;
  renderItem?: (option: Option) => React.ReactNode;
  children?: React.ReactNode;
  tooltipContent?: string;
  dropDownTooltip?: boolean | undefined;
  dropdownFooter?: boolean | undefined;
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
  tooltipContent,
  dropDownTooltip = false,
  dropdownFooter = false,
  onApply,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(
    options || []
  );

  const [dropdownMenu, setDropdownMenu] = useState(false);

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

  const handleReset = () => {
    setSelected?.([]);
  };

  return (
    <div className="relative w-[320px]">
      <div
        onClick={() => setDropdownMenu((prev) => !prev)}
        className="border border-gray-800 py-2 px-[14px] rounded-lg flex justify-between items-center text-gray-900 text-text-sm cursor-pointer"
      >
        <section>
          {multiple
            ? `${selected?.length || dropdownText}`
            : selected?.[0]?.label
            ? selected?.[0]?.label
            : dropdownText}
        </section>
        <ArrowDownSLineIcon size={18} />
      </div>
      {dropdownMenu && (
        <ul className="shadow-sm mt-1 rounded absolute text-[16px] bg-white z-[1000] w-full">
          {search && (
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded rounded-b-none bg-white w-full h-[35px]  text-gray-400"
              endIcon={<SearchLineIcon size={18} />}
            />
          )}
          <section className="max-h-[200px] overflow-y-scroll">
            {options
              ? memoizedFilteredOptions.map((option) => (
                  <>
                    {multiple ? (
                      <Label
                        className="has-[:checked]:bg-primary-50 has-[:checked]:border-primary-600 hover:bg-gray-50 flex py-1 px-[14px] gap-2 cursor-pointer items-center border-l-4 border-transparent"
                        htmlFor={`checkbox-${option.value}`}
                      >
                        <Checkbox
                          id={`checkbox-${option.value}`}
                          checked={selected?.some(
                            (item) => item.value === option.value
                          )}
                          onChange={() => handleCheckboxChange(option)}
                        />
                        <div className="flex items-center gap-1">
                          <span>{renderItem(option)}</span>
                          {dropDownTooltip && (
                            <DropdownTooltip tooltipContent={tooltipContent} />
                          )}
                        </div>
                      </Label>
                    ) : (
                      <Label
                        key={option.label}
                        className={cn(
                          "flex py-1 px-[14px] hover:bg-gray-50 gap-2 items-center border-l-4 border-transparent cursor-pointer",
                          {
                            "bg-primary-50 border-primary-600":
                              selected && selected[0]?.value === option.value,
                          }
                        )}
                        onClick={() => toggleOption(option)}
                      >
                        <div className="flex items-center gap-1">
                          <span>{renderItem(option)}</span>
                          {dropDownTooltip && (
                            <DropdownTooltip tooltipContent={tooltipContent} />
                          )}
                        </div>
                      </Label>
                    )}
                  </>
                ))
              : children}
          </section>
          {dropdownFooter && (
            <DropdownFooter onReset={handleReset} onApply={onApply} />
          )}
        </ul>
      )}
    </div>
  );
};

export const MenuItem: React.FC<MenuItemProps> = ({ label, children }) => {
  return <p>{label || children}</p>;
};

interface DropdownTooltipProps {
  tooltipContent?: string;
}

const DropdownTooltip: React.FC<DropdownTooltipProps> = ({
  tooltipContent,
}) => {
  const content = tooltipContent || "info";
  return (
    <Tooltip position="right" content={content}>
      <ErrorWarningLineIcon color="#98A2B3" size={14} />
    </Tooltip>
  );
};

interface DropdownFooterProps {
  onReset: () => void;
  onApply?: () => any;
}

export const DropdownFooter: React.FC<DropdownFooterProps> = ({
  onReset,
  onApply,
}) => {
  return (
    <div className="flex justify-between border-t border-gray-200 px-[14px] py-1 text-text-sm">
      <button className="text-warning-500 hover:text-warning-600" onClick={onReset}>Reset</button>
      <button className="text-brand-600 hover:text-brand-700" onClick={onApply}>Apply</button>
    </div>
  );
};

export default Dropdown;
