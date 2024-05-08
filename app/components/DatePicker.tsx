"use client"
import React, { useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import {
  CaptionProps,
  DayPicker,
  SelectSingleEventHandler,
  useNavigation,
} from "react-day-picker";
import CalendarLineIcon from "remixicon-react/CalendarLineIcon";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
import ArrowLeftSLineIcon from "remixicon-react/ArrowLeftSLineIcon";
import Input from "./Input";

interface DatePickerProps {
  selected?: any;
  setSelected: (value: any) => void;
  inputValue?: string;
  setInputValue: (value: string) => void;
  handleInputChange?: (value: any) => void;
}
const css = `
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { 
    background-color: #EAECF0;
    border-radius: 5px;
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

const DatePicker = ({
  selected,
  setSelected,
  inputValue,
  setInputValue,
  handleInputChange,
}: DatePickerProps) => {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const popperRef = useRef<HTMLDivElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const closePopper = () => setIsPopperOpen(false);

  // Add event listener to handle clicks outside of the popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperElement &&
        !popperElement.contains(event.target as Node) &&
        !popperRef.current?.contains(event.target as Node)
      ) {
        closePopper();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popperElement]);

  // chevron icon for navigation
  function CustomCaption(props: CaptionProps) {
    const { goToMonth, nextMonth, previousMonth } = useNavigation();
    return (
      <div className="flex justify-between gap-4 items-center">
        <button
          className="hover:bg-gray-100 w-10 h-10 flex items-center justify-center p-1 rounded-md focus:bg-gray-300 active:bg-gray-300"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
        >
          <ArrowLeftSLineIcon />
        </button>
        {format(props.displayMonth, "MMM yyy")}
        <button
          className="hover:bg-gray-100 w-10 h-10 flex items-center justify-center p-1 rounded-md focus:bg-gray-300 active:bg-gray-300"
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
        >
          <ArrowRightSLineIcon />
        </button>
      </div>
    );
  }

  const handleDaySelect: SelectSingleEventHandler = (date) => {
    setSelected(date);
    date ? setInputValue(format(date, "MMM dd, y")) : setInputValue("");
    date && closePopper();
  };

  return (
    <div>
      <div ref={popperRef} className="relative">
        <Input
          type="text"
          className="w-[150px]"
          startIcon={<CalendarLineIcon size={16} />}
          placeholder={format(new Date(), "MMM dd, y")}
          value={inputValue}
          onChange={handleInputChange}
          aria-label="Pick a date"
          onClick={() => setIsPopperOpen(true)}
        />
      </div>
      {isPopperOpen && (
        <div
          tabIndex={-1}
          className="shadow-sm mt-1 mx-auto rounded-md absolute text-[16px] bg-white z-[1000] transition-all duration-75 delay-100 ease-in-out"
          ref={(element) => setPopperElement(element)}
          role="dialog"
          aria-label="Single DayPicker calendar"
        >
          <style>{css}</style>
          <DayPicker
            initialFocus={isPopperOpen}
            mode="single"
            defaultMonth={selected}
            showOutsideDays
            components={{ Caption: CustomCaption }}
            selected={selected}
            onSelect={handleDaySelect}
            modifiersStyles={{
              selected: {
                backgroundColor: "var(--primary-500)",
                borderRadius: "5px",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
