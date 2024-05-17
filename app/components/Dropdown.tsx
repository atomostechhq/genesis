"use client";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Checkbox from "./Checkbox";
import Input from "./Input";
import {
  RiArrowDownSLine,
  RiSearchLine,
  RiErrorWarningLine,
} from "@remixicon/react";
import { cn } from "../utils/utils";
import Label from "./Label";
import Tooltip from "./Tooltip";

type Option = {
  label: string;
  value: string;
  info?: string;
  addInfo?: string;
  tooltipContent?: string;
};

interface MenuItemProps {
  label?: string;
  value: string;
  children?: React.ReactNode;
}

interface DropdownProps {
  icon?: JSX.Element;
  options: Option[];
  selected?: Option[];
  setSelected?: React.Dispatch<React.SetStateAction<Option[]>>;
  onApply?: () => void;
  dropdownText?: string;
  search?: boolean;
  multiple?: boolean;
  renderItem?: (option: Option) => React.ReactNode;
  children?: React.ReactNode;
  info?: any;
  addInfo?: any;
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
  icon,
  tooltipContent,
  info,
  addInfo,
  dropDownTooltip = false,
  dropdownFooter = false,
  onApply,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(
    options || []
  );

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        setDropdownMenu(false);
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

  const handleSelectAll = () => {
    if (selected?.length === filteredOptions.length) {
      setSelected?.([]);
    } else {
      setSelected?.(filteredOptions);
    }
  };

  const handleReset = () => {
    setSelected?.([]);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownMenu(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-[320px]">
      <div
        onClick={() => setDropdownMenu((prev) => !prev)}
        className={cn(
          "hover:bg-gray-50 py-2 px-[14px] rounded-lg flex justify-between items-center text-gray-900 text-text-sm cursor-pointer",
          dropdownMenu ? "border border-gray-800" : "border border-gray-200"
        )}
      >
        <section className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {multiple
            ? `${`${selected?.length} Selected` || dropdownText}`
            : selected?.[0]?.label
            ? selected?.[0]?.label
            : dropdownText}
        </section>
        <RiArrowDownSLine size={18} />
      </div>
      {dropdownMenu && (
        <ul className="shadow-sm mt-1 rounded absolute text-[16px] bg-white z-[1000] w-full transition-all duration-75 delay-100 ease-in-out">
          {search && (
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded rounded-b-none text-gray-800 bg-white w-full h-[35px] pl-3"
              endIcon={<RiSearchLine size={18} />}
            />
          )}
          {multiple && (
            <p
              onClick={handleSelectAll}
              className="text-text-sm py-[6px] hover:text-primary-700 px-[14px] text-primary-600 cursor-pointer"
            >
              Select all
            </p>
          )}
          <section className="max-h-[200px] transition-all duration-75 delay-100 ease-in-out overflow-y-scroll">
            {options
              ? memoizedFilteredOptions.map((option) => (
                  <>
                    {multiple ? (
                      <Label
                        className="has-[:checked]:bg-primary-50 has-[:checked]:border-primary-600 hover:bg-gray-50 flex flex-col py-[6px] px-[14px] cursor-pointer border-l-4 border-transparent"
                        htmlFor={`checkbox-${option.value}`}
                        key={option.label}
                      >
                        <section className="flex items-center justify-between gap-2 w-full">
                          <div className="flex gap-2">
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
                                <DropdownTooltip
                                  tooltipContent={option?.tooltipContent}
                                />
                              )}
                            </div>
                          </div>
                          <span className="text-gray-500">{option?.info}</span>
                        </section>
                        <span className="pt-[2px] text-text-sm text-gray-500">
                          {option?.addInfo}
                        </span>
                      </Label>
                    ) : (
                      <Label
                        key={option.label}
                        className={cn(
                          "flex justify-between py-[6px] px-[14px] hover:bg-gray-50 gap-2 items-center border-l-4 border-transparent cursor-pointer",
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
                            <DropdownTooltip
                              tooltipContent={option?.tooltipContent}
                            />
                          )}
                        </div>
                        <span className="text-gray-500">{info}</span>
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
  const content = tooltipContent || "";
  return (
    <Tooltip position="right" content={content}>
      <RiErrorWarningLine color="#98A2B3" size={14} />
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
    <div className="flex justify-between border-t border-gray-200 px-[14px] py-[8px] text-text-sm">
      <button
        className="text-warning-500 hover:text-warning-600"
        onClick={onReset}
      >
        Reset
      </button>
      <button className="text-brand-600 hover:text-brand-700" onClick={onApply}>
        Apply
      </button>
    </div>
  );
};

export default Dropdown;
