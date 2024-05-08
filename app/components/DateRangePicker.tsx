"use client";
import React, { useRef, useState, useEffect, ReactNode } from "react";
import CalendarLineIcon from "remixicon-react/CalendarLineIcon";
import {
  DayPicker,
  SelectRangeEventHandler,
} from "react-day-picker";
import Input from "./Input";
import Button from "./Button";


// fix the types later (be specific with it)
interface DateRangePickerProps {
  selectedRange?: any;
  setSelectedRange: (value: any) => void;
  dateRangeInput?: string;
  setDateRangeInput: (value: string) => void;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRangeSelect?: SelectRangeEventHandler;
  handleApply:(value:any)=>void;
  children?:ReactNode;
}

const css = `
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { 
    background-color: #EAECF0;
    border-radius: 5px;
  }
  .rdp-nav_icon{
    height:12px;
    width:12px;
  }
  .rdp-button:focus-visible:not([disabled]){
    color:black;
    background:white;
    border-radius: 5px;
    border: 1px solid var(--primary-400);
  }
  .rdp-day_selected:focus-visible{
    outline: none;
  }
  .rdp-head_cell{
    font-size: 12px;
  }
  .rdp-cell{
    font-size: 13px;
  }
`;

const DateRangePicker = ({
  selectedRange,
  setSelectedRange,
  dateRangeInput,
  setDateRangeInput,
  handleInputChange,
  handleRangeSelect,
  handleApply,
  children,
}: DateRangePickerProps) => {
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!popperRef.current?.contains(event.target as Node)) {
        setIsPopperOpen(false);
      }
    };

    if (isPopperOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopperOpen]);

  const handleButtonClick = () => setIsPopperOpen(true);

  const handleReset = () => {
    setSelectedRange(undefined);
    setDateRangeInput("");
  };

  return (
    <div>
      <div ref={popperRef} className="relative">
        <Input
          className="w-[250px]"
          startIcon={<CalendarLineIcon size={16} />}
          placeholder="DD/MM/YYYY - DD/MM/YYYY"
          value={dateRangeInput}
          onChange={handleInputChange}
          onClick={handleButtonClick}
        />
      </div>
      {isPopperOpen && (
        <div
          tabIndex={-1}
          className="shadow-md mt-1 rounded-md h-[330px] p-3 flex gap-5 justify-center items-start absolute bg-white z-[1000] transition-all duration-75 delay-100 ease-in-out"
          ref={popperRef}
          aria-label="Date Range Picker"
        >
          <div className="flex flex-col whitespace-nowrap items-start h-full border-r border-gray-200 pr-2">
           {children}
          </div>
          <div className="flex flex-col h-full justify-between">
            <style>{css}</style>
            <DayPicker
              mode="range"
              numberOfMonths={2}
              selected={selectedRange}
              onSelect={handleRangeSelect}
              showOutsideDays
              modifiersStyles={{
                selected: {
                  backgroundColor: "var(--primary-600)",
                  borderRadius: "5px",
                },
                range_middle: {
                  borderRadius: "0px",
                  backgroundColor: "var(--primary-50)",
                  color: "black",
                },
                range_start: {
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "0px",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "0px",
                },
                range_end: {
                  borderTopLeftRadius: "0px",
                  borderTopRightRadius: "5px",
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "5px",
                },
              }}
            />
            <div className="flex justify-between pt-2 border-t border-gray-200 gap-3">
              <Button
                variant={"outlined"}
                intent="default-outlined"
                className="border-none py-1 px-2 text-sm"
                size="sm"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant={"filled"}
                intent={"primary"}
                size="sm"
                className="py-1 px-2 text-sm"
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
