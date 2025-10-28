"use client";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { RiArrowDownSLine, RiSearchLine } from "@remixicon/react";
import { cn } from "../utils/utils";
import Input from "./Input";
import Label from "./Label";
import Checkbox from "./Checkbox";

type Option = {
  label: string | number;
  value: string | number;
  info?: string;
  addInfo?: string;
  tooltipContent?: string;
  disabledOption?: boolean;
  labelTextColor?: string;
};

interface MenuItemProps {
  label?: string | number;
  value: string | number;
  children?: React.ReactNode;
}

interface DropdownProps {
  id?: string;
  icon?: JSX.Element;
  options: Option[];
  selected?: Option[];
  setSelected?: React.Dispatch<React.SetStateAction<Option[]>>;
  onApply?: () => void;
  onReset?: () => void;
  dropdownText?: string;
  search?: boolean;
  multiple?: boolean;
  renderItem?: (option: Option) => React.ReactNode;
  children?: React.ReactNode;
  position?: "top" | "bottom";
  info?: string | number;
  addInfo?: string | number;
  tooltipContent?: string;
  width?: string;
  dropdownFooter?: boolean | undefined;
  disabled?: boolean;
  labelTextColor?: string;
  footerAction?: React.ReactNode;
}

const defaultRenderItem = (option: Option) => {
  return <MenuItem label={option.label} value={option.value} />;
};

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      id = `dropdown-${Math.random().toString(36).substring(2, 11)}`,
      options,
      selected,
      setSelected,
      search = false,
      multiple = false,
      dropdownText = "Select",
      renderItem = defaultRenderItem,
      children,
      icon,
      position = "top",
      width,
      info,
      dropdownFooter = false,
      onApply,
      disabled = false,
      onReset,
      footerAction,
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(
      options || []
    );

    const [dropdownMenu, setDropdownMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => dropdownRef.current!);

    useEffect(() => {
      if (options) {
        setFilteredOptions(options);
      }
    }, [options]);

    const memoizedFilteredOptions = useMemo(() => {
      if (!search) return filteredOptions;
      return filteredOptions.filter((option) => {
        if (typeof option.label === "string") {
          return option.label.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return option.label.toString().includes(searchQuery.toLowerCase());
      });
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
      if (onReset) {
        onReset();
      }
      setSelected?.([]);
      setDropdownMenu(false);
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
      <div
        id={id}
        ref={dropdownRef}
        className={cn(
          "relative bg-gray-25 shadow-[0px_1px_2px_0px_#1018280D] rounded-lg",
          !width && "w-full",
          disabled && "cursor-not-allowed opacity-50"
        )}
        style={{
          width: width,
        }}
      >
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={dropdownMenu}
          aria-labelledby={`${id}-label`}
          disabled={disabled}
          onClick={() => !disabled && setDropdownMenu((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              !disabled && setDropdownMenu((prev) => !prev);
            }
          }}
          className={cn(
            "w-full hover:bg-gray-50 py-2 px-[14px] rounded-lg flex justify-between items-center text-gray-900 bg-gray-25 text-text-sm cursor-pointer",
            dropdownMenu
              ? "border border-primary-600"
              : "border border-gray-200",
            disabled && "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
          )}
        >
          <section className="flex items-center gap-2 text-ellipsis overflow-hidden">
            {icon && <span aria-hidden="true">{icon}</span>}
            <span id={`${id}-label`} className="line-clamp-1 w-full">
              {multiple
                ? (selected?.length ?? 0) > 0
                  ? `${selected?.length} Selected`
                  : dropdownText
                : selected?.[0]?.label
                ? selected?.[0]?.label
                : dropdownText}
            </span>
          </section>
          <RiArrowDownSLine aria-hidden="true" size={18} />
        </button>
        <ul
          role="listbox"
          aria-multiselectable={multiple}
          aria-labelledby={`${id}-label`}
          className={cn(
            "max-h-0 opacity-0 overflow-hidden shadow-sm mt-1 rounded absolute text-[16px] bg-white z-[1000] w-full transition-all duration-75 delay-100 ease-in",
            position === "top" ? "top-10" : "bottom-10",
            dropdownMenu
              ? "border border-primary-600"
              : "border border-gray-200",
            dropdownMenu &&
              "max-h-[360px] h-fit opacity-[1] transition-all ease-in duration-150"
          )}
        >
          {search && (
            <Input
              id={`${id}-search`}
              type="text"
              placeholder="Search..."
              aria-label="Search options"
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded rounded-b-none text-gray-800 bg-white w-full h-[35px] pl-3 border-none"
              endIcon={<RiSearchLine size={18} />}
            />
          )}
          {multiple && (
            <section className="py-[6px] px-[14px] flex justify-between items-center">
              <button
                type="button"
                aria-label="Select all"
                onClick={handleSelectAll}
                className="text-text-sm  hover:text-primary-700 text-primary-600 cursor-pointer"
              >
                Select all
              </button>
              <button
                aria-label="Reset"
                type="button"
                className="text-text-sm text-warning-500 hover:text-warning-600"
                onClick={handleReset}
              >
                Reset
              </button>
            </section>
          )}
          <section className="max-h-[200px] transition-all duration-75 delay-100 ease-in-out overflow-y-scroll">
            {options
              ? memoizedFilteredOptions?.map((option, i) => (
                  <React.Fragment key={i}>
                    {multiple ? (
                      <Label
                        className={cn(
                          "has-[:checked]:bg-primary-50 has-[:checked]:border-primary-600 hover:bg-gray-50 flex flex-col py-[6px] px-[14px] cursor-pointer border-l-4 border-transparent",
                          option?.disabledOption &&
                            "opacity-50 cursor-not-allowed hover:bg-white text-gray-300 select-none"
                        )}
                        htmlFor={`${id}-checkbox-${option.value}`}
                        key={i}
                      >
                        <section className="flex items-center justify-between gap-2 w-full">
                          <div className="flex gap-2">
                            <Checkbox
                              id={`${id}-checkbox-${option.value}`}
                              checked={
                                selected?.some(
                                  (item) => item.value === option.value
                                ) ?? false
                              }
                              onChange={() => handleCheckboxChange(option)}
                              disabled={option?.disabledOption}
                            />
                            <div className="flex items-center gap-1">
                              <div
                                style={{
                                  color: option?.disabledOption
                                    ? "#D1D5DB"
                                    : option.labelTextColor,
                                }}
                                className={cn(
                                  "break-words",
                                  option?.disabledOption && "text-gray-300"
                                )}
                              >
                                {renderItem(option)}
                              </div>
                              {/* {dropDownTooltip && (
                                <DropdownTooltip
                                  tooltipContent={option?.tooltipContent}
                                />
                              )} */}
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
                        key={i}
                        htmlFor={`${id}-checkbox-${option.value}`}
                        className={cn(
                          "flex justify-between py-[6px] px-[14px] hover:bg-gray-50 gap-2 items-center border-l-4 border-transparent cursor-pointer",
                          {
                            "bg-primary-50 border-primary-600":
                              selected && selected[0]?.value === option.value,
                            "opacity-50 cursor-not-allowed hover:bg-white text-gray-500":
                              option?.disabledOption,
                          }
                        )}
                        onClick={() =>
                          !option?.disabledOption && toggleOption(option)
                        }
                      >
                        <div
                          style={{
                            color: option?.disabledOption
                              ? "#D1D5DB"
                              : option.labelTextColor,
                          }}
                          className={cn(
                            "break-words",
                            option?.disabledOption && "text-gray-300"
                          )}
                        >
                          {renderItem(option)}
                        </div>
                        <span className="text-gray-500">{info}</span>
                      </Label>
                    )}
                  </React.Fragment>
                ))
              : children}
          </section>
          {footerAction && (
            <div className="py-2 mt-1 px-2 border-t">{footerAction}</div>
          )}
          {dropdownFooter && (
            <DropdownFooter
              setDropdownMenu={setDropdownMenu}
              onApply={onApply}
            />
          )}
        </ul>
      </div>
    );
  }
);

export const MenuItem: React.FC<MenuItemProps> = ({ label, children }) => {
  return <p className="break-all">{label || children}</p>;
};

interface DropdownFooterProps {
  onApply?: (() => void) | undefined;
  setDropdownMenu?: (value: boolean) => void;
}

export const DropdownFooter: React.FC<DropdownFooterProps> = ({
  onApply,
  setDropdownMenu,
}) => {
  return (
    <div className="flex justify-end border-t border-gray-200 px-[14px] py-[8px] text-text-sm">
      <button
        type="button"
        className="text-primary-600 hover:text-primary-700"
        onClick={() => {
          if (onApply) {
            onApply();
          }
          if (setDropdownMenu) {
            setDropdownMenu(false);
          }
        }}
      >
        Apply
      </button>
    </div>
  );
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
