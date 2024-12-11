"use client";
import React, {
  useEffect,
  useState,
  useMemo,
  forwardRef,
  useCallback,
  useRef,
  useImperativeHandle,
} from "react";
import { RiErrorWarningLine, RiSearchLine } from "@remixicon/react";
import { cn } from "../utils/utils";
import Input from "./Input";
import Label from "./Label";
import Checkbox from "./Checkbox";
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

interface DropdownFooterProps {
  //   onReset?: () => void;
  onApply?: (() => void) | undefined;
  setDropdownMenu?: any;
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
  trigger?: React.ReactNode;
  dropdownMenu?: boolean;
  position?: "top" | "bottom" | "left" | "right" | "left" | "right";
  setDropdownMenu?: (value: boolean) => void;
  info?: any;
  addInfo?: any;
  tooltipContent?: string;
  width?: string;
  dropDownTooltip?: boolean | undefined;
  dropdownFooter?: boolean;
  disabled?: boolean;
}

const defaultRenderItem = (option: Option) => {
  return <MenuItem label={option.label} value={option.value} />;
};

const DropdownWithIcon = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      selected = [],
      setSelected,
      search = false,
      multiple = false,
      renderItem = defaultRenderItem,
      children,
      trigger,
      //   dropdownMenu = false,
      position = "top",
      //   setDropdownMenu = () => {},
      width,
      info,
      dropDownTooltip = false,
      dropdownFooter = false,
      onApply,
      disabled = false,
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const localDropdownRef = useRef<HTMLDivElement>(null);
    const [dropdownMenu, setDropdownMenu] = useState(false);

    useImperativeHandle(ref, () => localDropdownRef.current!);

    const memoizedFilteredOptions = useMemo(() => {
      if (!search) return options;
      return options?.filter(
        (option) =>
          typeof option?.label === "string" &&
          option?.label?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }, [search, searchQuery, options]);

    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e?.target?.value);
      },
      []
    );

    const toggleOption = useCallback(
      (option: Option) => {
        if (multiple && setSelected) {
          setSelected((prevSelected) =>
            prevSelected?.some((item) => item?.value === option?.value)
              ? prevSelected?.filter((item) => item?.value !== option?.value)
              : [...prevSelected, option]
          );
        } else if (setSelected) {
          setSelected([option]);
          setDropdownMenu(false);
        }
      },
      [multiple, setSelected, setDropdownMenu]
    );

    const handleCheckboxChange = useCallback(
      (option: Option) => {
        if (multiple && setSelected) {
          setSelected((prevSelected) =>
            prevSelected?.some((item) => item?.value === option?.value)
              ? prevSelected?.filter((item) => item?.value !== option?.value)
              : [...prevSelected, option]
          );
        } else if (setSelected) {
          setSelected([option]);
        }
      },
      [multiple, setSelected]
    );

    const handleSelectAll = () => {
      if (selected?.length === options?.length) {
        setSelected?.([]);
      } else {
        setSelected?.(options);
      }
    };

    const handleReset = () => {
      setSelected?.([]);
      setDropdownMenu(false);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          localDropdownRef?.current &&
          !localDropdownRef?.current?.contains(event?.target as Node)
        ) {
          setDropdownMenu(false);
        }
      };

      document?.addEventListener("mousedown", handleClickOutside);
      return () => {
        document?.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setDropdownMenu]);

    return (
      <div
        ref={localDropdownRef}
        className={cn(
          "relative",
          !width && "w-full",
          disabled && "cursor-not-allowed opacity-50"
        )}
        style={{
          width: width,
        }}
      >
        {/* <div onClick={() => setDropdownMenu(!dropdownMenu)}>{trigger}</div> */}
        <div onClick={() => !disabled && setDropdownMenu((prev) => !prev)}>
          {trigger}
        </div>
        <ul
          className={cn(
            "max-h-0 opacity-0 overflow-hidden shadow-sm mt-1 rounded absolute text-[16px] bg-white z-[1000] w-full transition-all duration-75 delay-100 ease-in",
            position === "top"
              ? "top-10"
              : position === "bottom"
              ? "bottom-10"
              : position === "left"
              ? "left-0"
              : position === "right"
              ? "right-[90%]"
              : "top-10",
            dropdownMenu &&
              "max-h-[320px] opacity-[1] transition-all ease-in duration-150"
          )}
          style={{
            width: width,
            minWidth: "200px",
            top: "calc(100% + 4px)",
          }}
        >
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
            <section className="py-[6px] px-[14px] flex justify-between items-center">
              <p
                onClick={handleSelectAll}
                className="text-text-sm  hover:text-primary-700  text-primary-600 cursor-pointer"
              >
                Select all
              </p>
              <button
                className="text-text-sm text-warning-500 hover:text-warning-600"
                onClick={handleReset}
              >
                Reset
              </button>
            </section>
          )}
          <section className="max-h-[200px] z-[1000] transition-all duration-75 delay-100 ease-in-out overflow-y-scroll">
            {options
              ? memoizedFilteredOptions?.map((option, i) => (
                  <React.Fragment key={i}>
                    {multiple ? (
                      <Label
                        className="has-[:checked]:bg-primary-50 has-[:checked]:border-primary-600 hover:bg-gray-50 flex flex-col py-[6px] px-[14px] break-words cursor-pointer border-l-4 border-transparent"
                        htmlFor={`checkbox-${option?.value}`}
                        key={i}
                      >
                        <section className="flex items-center justify-between gap-2 w-full">
                          <div className="flex gap-2">
                            <Checkbox
                              id={`checkbox-${option?.value}`}
                              checked={selected?.some(
                                (item) => item?.value === option?.value
                              )}
                              onChange={() => handleCheckboxChange(option)}
                            />
                            <div className="flex items-center gap-1">
                              <div className="break-words">
                                {renderItem(option)}
                              </div>
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
                        key={i}
                        className={cn(
                          "flex justify-between py-[6px] px-[14px] hover:bg-gray-50 gap-2 items-center border-l-4 border-transparent cursor-pointer",
                          {
                            "bg-primary-50 border-primary-600":
                              selected && selected[0]?.value === option?.value,
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
                  </React.Fragment>
                ))
              : children}
          </section>
          {dropdownFooter && <DropdownFooter onApply={onApply} />}
        </ul>
      </div>
    );
  }
);

export const MenuItem: React.FC<MenuItemProps> = ({ label, children }) => {
  return <p className="break-all">{label || children}</p>;
};

interface DropdownTooltipProps {
  tooltipContent?: string | undefined;
}

const DropdownTooltip: React.FC<DropdownTooltipProps> = ({
  tooltipContent,
}) => {
  return tooltipContent ? (
    <Tooltip position="right" content={tooltipContent}>
      <RiErrorWarningLine color="#98A2B3" size={14} />
    </Tooltip>
  ) : null;
};

const DropdownFooter: React.FC<DropdownFooterProps> = ({
  onApply,
  setDropdownMenu,
}) => {
  return (
    <div className="flex justify-between border-t border-gray-200 px-[14px] py-[8px] text-text-sm">
      <button
        className="text-brand-600 hover:text-brand-700"
        onClick={() => {
          if (onApply) {
            onApply();
          }
          setDropdownMenu(false);
        }}
      >
        Apply
      </button>
    </div>
  );
};

DropdownWithIcon.displayName = "DropdownWithIcon";

export default DropdownWithIcon;
