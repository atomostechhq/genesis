"use client";
import React, { forwardRef, InputHTMLAttributes, useRef } from "react";

interface FileSelectorProps extends InputHTMLAttributes<HTMLInputElement> {
  component: JSX.Element;
}

const FileSelector = forwardRef<HTMLInputElement, FileSelectorProps>(
  ({ component, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    const handleClick = () => {
      inputRef.current?.click();
    };

    return (
      <div
        onClick={handleClick}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        <input
          type="file"
          ref={inputRef}
          {...props}
          style={{ display: "none" }}
        />
        {component}
      </div>
    );
  }
);

FileSelector.displayName = "FileSelector";

export default FileSelector;
