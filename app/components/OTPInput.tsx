"use client";
import React, { useRef, useState } from "react";
import { cn } from "../utils/utils";

interface OTPInputProps {
  length: number;
  onChange: (otp: string) => void;
  type?: "text" | "password" | "number";
  className?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onChange,
  type = "text",
  className,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    let value = e.target.value;
    if (type === "number") value = value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otpValues];
    newOtp[idx] = value[0];
    setOtpValues(newOtp);
    onChange(newOtp.join(""));

    if (idx < length - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key === "Backspace") {
      if (otpValues[idx]) {
        const newOtp = [...otpValues];
        newOtp[idx] = "";
        setOtpValues(newOtp);
        onChange(newOtp.join(""));
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    let pasteData = e.clipboardData.getData("Text");
    if (type === "number") pasteData = pasteData.replace(/\D/g, "");
    const newOtp = pasteData
      .split("")
      .concat(Array(length).fill(""))
      .slice(0, length);
    setOtpValues(newOtp);
    onChange(newOtp.join(""));
    inputsRef.current[Math.min(pasteData.length, length - 1)]?.focus();
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          type={type}
          inputMode={type === "number" ? "numeric" : "text"}
          maxLength={1}
          value={otpValues[idx]}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          ref={(el) => {
            inputsRef.current[idx] = el ?? null;
          }}
          className={cn(
            "w-[40px] h-10 text-sm p-2 border border-gray-200 rounded-lg bg-white shadow-[0px_1px_2px_0px_#1018280D] hover:bg-gray-50 hover:border-gray-300 focus-within:border-primary-600 focus-within:bg-gray-25 focus-within:hover:bg-gray-50 focus-within:hover:border-primary-600 has-[:disabled]:opacity-30 has-[:disabled]:bg-gray-300 has-[:disabled]:select-none has-[:disabled]:pointer-events-none focus:outline-none focus:ring-offset-0 text-center",
            className,
          )}
        />
      ))}
    </div>
  );
};

export default OTPInput;
