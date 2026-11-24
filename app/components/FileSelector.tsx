"use client";
import React, { forwardRef, useCallback, useRef } from "react";
import type {
  InputHTMLAttributes,
  MouseEvent,
  MutableRefObject,
  ReactNode,
} from "react";

interface FileSelectorProps extends InputHTMLAttributes<HTMLInputElement> {
  component: ReactNode;
}

const FileSelector = forwardRef<HTMLInputElement, FileSelectorProps>(
  ({ component, disabled, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement | null>(null);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref]
    );

    const handleClick = () => {
      if (disabled) return;
      internalRef.current?.click();
    };

    // Stops the input's own click from bubbling back to the wrapper
    // and opening the picker twice
    const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
    };

    return (
      <div
        onClick={handleClick}
        style={{
          display: "inline-block",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <input
          {...props}
          type="file"
          ref={setRefs}
          disabled={disabled}
          onClick={handleInputClick}
          hidden
        />
        {component}
      </div>
    );
  }
);

FileSelector.displayName = "FileSelector";

export default FileSelector;