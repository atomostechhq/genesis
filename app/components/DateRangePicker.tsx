"use client";
import React, { useRef, useState, useEffect } from "react";
import { format, isValid, isAfter, parse } from "date-fns";
import CalendarLineIcon from "remixicon-react/CalendarLineIcon";
import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
} from "react-day-picker";
import Input from "./Input";

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
`;

const DateRangePicker = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [dateRangeInput, setDateRangeInput] = useState<string>("");

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateRangeInput(value);
    const [fromDateString, toDateString] = value.split(" – ");

    const fromDate = parse(fromDateString, "y-MM-dd", new Date());
    const toDate = parse(toDateString, "y-MM-dd", new Date());

    if (isValid(fromDate) && isValid(toDate) && isAfter(toDate, fromDate)) {
      setSelectedRange({ from: fromDate, to: toDate });
    } else {
      setSelectedRange(undefined);
    }
  };

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined
  ) => {
    setSelectedRange(range);
    if (range) {
      setDateRangeInput(
        `${range.from ? format(range.from, "MMM dd, y") : ""} – ${
          range.to ? format(range.to, "MMM dd, y") : ""
        }`
      );
    } else {
      setDateRangeInput("");
    }
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
          className="shadow-sm mt-1 mx-auto rounded-md absolute text-[16px] bg-white z-[1000] transition-all duration-75 delay-100 ease-in-out"
          ref={popperRef}
          role="dialog"
          aria-label="Date Range Picker"
        >
          <style>{css}</style>
          <DayPicker
            mode="range"
            numberOfMonths={2}
            className="flex items-center"
            selected={selectedRange}
            onSelect={handleRangeSelect}
            showOutsideDays
            modifiersStyles={{
              selected: {
                backgroundColor: "var(--primary-500)",
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
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
